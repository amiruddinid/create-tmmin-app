import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import prompts from "prompts";
import colors from "picocolors";

const { blue, cyanBright, red, redBright, white, reset } = colors;

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist<{
  template?: string;
  help?: boolean;
}>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: "help", t: "template" },
  string: ["_"],
});
const cwd = process.cwd();

// prettier-ignore
const helpMessage = `\
Usage: create-tmmin-app [OPTION]... [DIRECTORY]

Create a new tmmin-app project.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${redBright ('backend')}
${cyanBright ('dashboard')}
${white      ('website')}
${blue      ('expo')}`

type ColorFunc = (str: string | number) => string;
type Type = {
  name: string;
  display: string;
  color: ColorFunc;
};

const TYPES: Type[] = [
  {
    name: "backend",
    display: "Backend Express",
    color: redBright,
  },
  {
    name: "dashboard",
    display: "Dashboard React",
    color: cyanBright,
  },
  {
    name: "website",
    display: "Website Astro",
    color: white,
  },
  {
    name: "expo",
    display: "Mobile RN + Expo",
    color: blue,
  },
];

const TEMPLATES = TYPES.map((T) => [T.name]).reduce((a, b) => a.concat(b), []);

const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
};

const defaultTargetDir = "tmmin-app-project";

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }

  let targetDir = argTargetDir || defaultTargetDir;
  const getProjectName = () => path.basename(path.resolve(targetDir));

  let result: prompts.Answers<
    "projectName" | "overwrite" | "packageName" | "type"
  >;

  prompts.override({
    overwrite: argv.overwrite,
  });

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : "text",
          name: "projectName",
          message: reset("Project name:"),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir;
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "select",
          name: "overwrite",
          message: () =>
            (targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: "Cancel operation",
              value: "no",
            },
            {
              title: "Remove existing files and continue",
              value: "yes",
            },
            {
              title: "Ignore files and continue",
              value: "ignore",
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === "no") {
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : "text"),
          name: "packageName",
          message: reset("Package name:"),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || "Invalid package.json name",
        },
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : "select",
          name: "type",
          message:
            typeof argTemplate === "string" && !TEMPLATES.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `
                )
              : reset("Select project type:"),
          initial: 0,
          choices: TYPES.map((type) => {
            const typeColor = type.color;
            return {
              title: typeColor(type.display || type.name),
              value: type,
            };
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const { type, overwrite, packageName } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite === "yes") {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  // determine template
  let template: string = type?.name || argTemplate;

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  console.log(`\nScaffolding project in ${root}...`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../..",
    `template-${template}`
  );

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );

  pkg.name = packageName || getProjectName();

  write("package.json", JSON.stringify(pkg, null, 2) + "\n");

  const cdProjectName = path.relative(cwd, root);
  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(
      `  cd ${
        cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
      }`
    );
  }
  switch (pkgManager) {
    case "yarn":
      console.log("  yarn");
      console.log("  yarn dev");
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
  console.log();
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  );
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

function setupReactSwc(root: string, isTs: boolean) {
  editFile(path.resolve(root, "package.json"), (content) => {
    return content.replace(
      /"@tmmin-appjs\/plugin-react": ".+?"/,
      `"@tmmin-appjs/plugin-react-swc": "^3.5.0"`
    );
  });
  editFile(
    path.resolve(root, `tmmin-app.config.${isTs ? "ts" : "js"}`),
    (content) => {
      return content.replace(
        "@tmmin-appjs/plugin-react",
        "@tmmin-appjs/plugin-react-swc"
      );
    }
  );
}

function editFile(file: string, callback: (content: string) => string) {
  const content = fs.readFileSync(file, "utf-8");
  fs.writeFileSync(file, callback(content), "utf-8");
}

init().catch((e) => {
  console.error(e);
});

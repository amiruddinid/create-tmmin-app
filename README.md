# create-tmmin-app

## Scaffolding Your First tmmin-app Project

> **Compatibility Note:**
> This creator requires [Node.js](https://nodejs.org/en/) version 18+, 20+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With NPM:

```bash
$ npm create tmmin-app@latest
```

With Yarn:

```bash
$ yarn create tmmin-app
```

With PNPM:

```bash
$ pnpm create tmmin-app
```

With Bun:

```bash
$ bun create tmmin-app
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a tmmin-app + Vue project, run:

```bash
# npm 7+, extra double-dash is needed:
npm create tmmin-app@latest my-vue-app -- --template vue

# yarn
yarn create tmmin-app my-vue-app --template vue

# pnpm
pnpm create tmmin-app my-vue-app --template vue

# Bun
bun create tmmin-app my-vue-app --template vue
```

Currently supported template presets include:

- `vanilla`
- `vanilla-ts`
- `vue`

You can use `.` for the project name to scaffold in the current directory.

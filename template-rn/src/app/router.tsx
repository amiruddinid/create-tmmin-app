import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from '@/stores';
import HomeScreen from './screens/app/home';
import ProfileScreen from './screens/app/profile';
import LoginScreen from './screens/auth/login';
import RegisterScreen from './screens/auth/register';

// const [user] = useUser();
const isLogin = store.getState().auth.isLogin

const AppStack = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});

const AuthStack = createNativeStackNavigator({
  default: 'Login',
  screenOptions: {
    headerShown: false
  },
  screens: {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
});

const RootStack = createNativeStackNavigator({
  initialRouteName: 'loggedOut',
  groups: {
    loggedIn: {
      if: () => isLogin === true,
      screens: {
        App: AppStack,
      },
    },
    loggedOut: {
      if: () => isLogin === false,
      default: 'Login',
      screenOptions: {
        headerShown: false
      },
      screens: {
        Auth: AuthStack,
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const Navigation = createStaticNavigation(RootStack);

export const AppRouter = () => {
  return (
    <Navigation />
  );
}

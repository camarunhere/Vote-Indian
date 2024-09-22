//Libraries
import { createBrowserRouter} from 'react-router-dom';

//Components with their Loaders & Actions
import RootLayout, {loader as rootLoader} from "../pages/Layout/RootLayout";
import SignupPage, { loader as signupLoader } from '../pages/auth/SignupPage';
import LoginPage, { action as authenticateUserAction, loader as loginLoader } from '../pages/auth/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import WelcomePage from '../pages/Layout/WelcomePage';

//Only Loaders & Actions 
import {action as formUserAction,} from '../components/UserForm';
import { logoutAction, loader as logoutLoader } from '../pages/auth/Logout';

//Routes
import { userRoutes } from './user_routes';

export const router= createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout/>,
      id: 'root',
      loader: rootLoader,
      errorElement: <ErrorPage/>,
      children:[
        {
          index: true,
          element: <WelcomePage/>,
        },
        { path: 'signup',
          element: <SignupPage/>,
          action: formUserAction,
          loader: signupLoader,
        },
        { path: 'login',
          element: <LoginPage/>,
          action: authenticateUserAction,
          loader: loginLoader,
          errorElement: <ErrorPage/>,
        },
      ]
    },
    //After Login routes were defined as userRoutes in user_routes.jsx page
    {...userRoutes},
    { path: 'user/logout',
      action: logoutAction,
      loader: logoutLoader
    }
  ]
)

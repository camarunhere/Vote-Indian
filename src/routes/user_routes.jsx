import ProfilePage from '../pages/user/ProfilePage';
import UserLayout, { loader as userLayoutLoader } from '../pages/Layout/UserLayout';
import UserHomePage from '../pages/Layout/UserHomePage';


import { adminRoutes } from './admin_routes';
import { articlesRoutes } from './articles_routes';

export const userRoutes = 
{
    path: '/user',
    element: 
      <UserLayout/>,
    loader: userLayoutLoader,
    children:[
      {
        index:true,
        element:<UserHomePage/>
      },
      //Article Routes are defined as articlesRoutes in articles_routes.jsx page
      ...articlesRoutes,
      { path: 'profile',
        element: <ProfilePage/>,
      },
      //Admin Routes are defined as adminRoutes in admin_routes.jsx page
      {...adminRoutes},
    ]
  }
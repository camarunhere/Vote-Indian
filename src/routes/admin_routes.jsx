import ErrorPage from '../pages/ErrorPage';
import AdminPanelPage, {loader as adminPanelLoader} from '../pages/admin/AdminPanelPage';
import ManageUsersPage, {loader as manageUsersLoader} from '../pages/admin/ManageUsersPage';
import NewUserPage from '../pages/admin/NewUserPage';
import UserDetailPage, {loader as fetchIndividualUser, action as userDeleteAction} from '../pages/admin/UserDetailPage';
import EditUserPage from '../pages/admin/EditUserPage';
import AdminHomePage from '../pages/admin/AdminHomePage';
import {action as formUserAction,} from '../components/UserForm';

export const adminRoutes = 
{
    path: 'admin',
    element: <AdminPanelPage/>,
    loader: adminPanelLoader,
    errorElement: <ErrorPage/>,
    children:[
      {
        index:true,
        element: <AdminHomePage/>
      },
      {
        path: 'users',
        element: <ManageUsersPage/>,
        loader: manageUsersLoader
      },
      { 
        path: 'users/:userId',
        id: 'user_details',
        loader: fetchIndividualUser,
        children:[
          { index:true, 
            element:<UserDetailPage/>,
            action: userDeleteAction,
          },
          {path:'edit',
          element:<EditUserPage/>,
          action: formUserAction,
          },
        ]
      },
      { path:'newuser',
        element: <NewUserPage/>,
        action: formUserAction,
      },
    ]
  }
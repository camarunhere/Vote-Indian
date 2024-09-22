import AllArticlesPage, {loader as allArticlesLoader} from '../pages/articles/AllArticlesPage';
import NewArticlePage from '../pages/articles/NewArticlePage';
import MyArticlesPage, {loader as myArticlesLoader} from '../pages/articles/MyArticlesPage';
import ArticlePreview from '../components/articles/ArticlePreview';
import EditArticlePage, {loader as editArticleLoader} from '../pages/articles/EditArticlePage';

export const articlesRoutes = 
[
    { 
        path: 'articles',
        element: <AllArticlesPage/>,
        // errorElement: <ErrorPage/>,
        id:'all_articles',
        loader: allArticlesLoader
      },
      { 
        path: 'myarticles',
        element: <MyArticlesPage  />,
        id:'my_articles',
        loader: myArticlesLoader
      },
      { 
        path: 'newarticle',
        element: <NewArticlePage/>,
        // id:'user_dashboard',
        // loader: fetchUsers.
      },
      { 
        path: 'newarticle/preview',
        element: <ArticlePreview />,
        // id:'user_dashboard',
        // loader: fetchUsers.
      },
      {
        path: 'articles/:articleId/edit',
        element: <EditArticlePage/>,
        loader: editArticleLoader
      },
      {
        path: 'myarticles/:articleId/edit',
        element: <EditArticlePage/>,
        loader: editArticleLoader
      },
]
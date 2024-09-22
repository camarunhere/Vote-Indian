import { fetchData } from "../../util/http_requests";
import NewArticlePage from "./NewArticlePage";
import {useLoaderData, useParams} from 'react-router-dom'

export default function EditArticlePage(){
    const params = useParams();
    const articleId = params.articleId;
    const article = useLoaderData();

    const editArticle = {
        article: article,
        articleId : articleId
    }
     
    // console.log(editArticle, 'article to edit in EditArticlePage')
    return(
        <div style={{paddingBottom:'2%'}}>
            <NewArticlePage editArticle={editArticle} />
        </div>
    )
}

export async function loader({params}){
    const id = params.articleId;
    const article = await fetchData({url: `https://reactudemydb-default-rtdb.firebaseio.com/articles/${id}.json`});
    return article;
}
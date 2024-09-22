import ImageNavLink from "../UI/ImageNavLink";
import ArticleView from "./ArticleView";

import addArtImg from '../../assets/images/articles/ready_write.jpg';

export default function ArticlesShow({articles, heading}){
        
    if (!articles || articles.length === 0) {
        return(
            <div style={{height:'90vh'}}>
                <h3>No Articles is there, Create One</h3>
                <ImageNavLink 
                    to='/user/newarticle' 
                    src={addArtImg} 
                    alt="all users logo"
                    imageLabel={'New Article'}
                    // imgStyle={classes.image_style}
                />
            </div>
        )
    }

    return(
        <div>
            <h1>{heading}</h1>
            {articles && 
                articles.map(([key, article]) => (
                    <div style={{marginBottom:'2%'}} key={key}>
                        <ArticleView article={article} articleId={key}/>
                    </div>
                ))
            }
        </div>
    )
}
import { forwardRef, useRef, useImperativeHandle } from "react";
import ArticleView from "./ArticleView";
import classes from './ArticlePreview.module.css';
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const ArticlePreview = forwardRef(function ArticlePreview({onPublish, article, existingArticle, artStateImg, isImageURLEmpty}, ref){
    const dispatch = useDispatch();
    const dialog = useRef();

    useImperativeHandle(ref, ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        };
    });

    async function publish(){
        dialog.current.close();
        dispatch(uiActions.startLoading());
        await onPublish(article);
        dispatch(uiActions.startLoading());
    }

    return createPortal(
        <dialog ref={dialog} className={classes.preview_modal}>
            <h2>Article Preview</h2>
            <div className={classes.article_view_block}>
                <ArticleView 
                    article={article} 
                    artStateImg={artStateImg}
                    isArtPreview={true}
                    existingArtImg={existingArticle && existingArticle.imageURL}
                    isImageURLEmpty={isImageURLEmpty}
                />
            </div>
            <div className={classes.action_butns}>
                <button onClick={()=>dialog.current.close()}>Cancel</button>
                <button onClick={publish}>Ok! Publish</button>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ArticlePreview;
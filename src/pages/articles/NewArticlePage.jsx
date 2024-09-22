import ArticleForm from "../../components/articles/ArticleForm";
import addArtHeaderImg from '../../assets/images/articles/add_article_header.png';
import { useRef, useState } from "react";
import ArticlePreview from "../../components/articles/ArticlePreview";
import {useDispatch, useSelector} from 'react-redux'
import { uploadData, uploadFile } from "../../util/http_requests";
import { useNavigate } from "react-router-dom";
import { ReactUdemyDBstorage } from "../../firebase/firebaseConfig";
import { deleteFileByDownloadURL } from "../../firebase/firebaseUtil";
import FlashMessage from "../../components/UI/FlashMessage";
import { uiActions } from "../../store/ui";

export default function NewArticlePage({editArticle}){
    //Redux
    const dispatch = useDispatch();
    const currentUser = useSelector(state=> state.user.currentUser);

    //Router
    const navigate = useNavigate();

    //Self & Descendants
    const articlePreviewRef = useRef();
    const [currentArticle, setCurrentArticle] = useState({});
    const [artStateImg, setArtStateImg] = useState(null);
    const [isImageURLEmpty, setIsImageURLEmpty] = useState(false);
    const imgFileSizeLimitBytes = 5 * 1024 * 1024; //5MB
    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > imgFileSizeLimitBytes) {
            alert("File size exceeds the maximum limit of 5MB.");
            event.target.value = ''; // Clear the file input field
            setArtStateImg(null);  // Clear the file preview
        } else if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setArtStateImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        //Get Data from form
        const fd = new FormData(event.target);
        const articleData = Object.fromEntries(fd.entries());
        articleData.author = currentUser.first_name;
        // console.log(articleData, 'article info in handlesubmit before uploading ');
        //Opening Preview
        articlePreviewRef.current.open();

        //set user Article Data
        setCurrentArticle(articleData);

        // navigate('preview') //Need to specify route for it
    }

    async function uploadArticleData(articleData){
        const file = articleData.imageFile.size;
         
        //Upload Image to firebase Storage
        if (file) {
            const fileDownloadURL = await uploadFile({
                file: articleData.imageFile,
                storage: ReactUdemyDBstorage,
                location: `articles/${articleData.title.trim()}`
            })

            articleData.imageURL = fileDownloadURL;
        }

        //Upload data to firebase RealTime DB
        await uploadData({
            data: articleData,
            url: 'https://reactudemydb-default-rtdb.firebaseio.com/articles.json',
            method: 'post'
        })
        
        navigate('/user/articles')
        // alert('article Created successfully')
        dispatch(uiActions.writeFlash({type: 'success', message:'Article Created Successfully.'}))

    }

    async function editnUpdateArticleData(articleData){
        const existingImgURL = editArticle.article.imageURL;
        const newFile = articleData.imageFile.size;
        // debugger
        //Upload Image to firebase Storage
        if (newFile) {
            if (existingImgURL) {
                await deleteFileByDownloadURL({storage: ReactUdemyDBstorage, downloadURL: existingImgURL});
            }

            const fileDownloadURL = await uploadFile({
                file: articleData.imageFile,
                storage: ReactUdemyDBstorage,
                location: `articles/${articleData.title.trim()}`
            })

            articleData.imageURL = fileDownloadURL;
        }else if(isImageURLEmpty){
            articleData.imageURL = ''
        }
        else{
            articleData.imageURL = existingImgURL;
        }

        //Upload data to firebase RealTime DB
        await uploadData({
            data: articleData,
            url: `https://reactudemydb-default-rtdb.firebaseio.com/articles/${editArticle.articleId}.json`,
            method: 'PATCH'
        })
        
        navigate('/user/articles')
        dispatch(uiActions.writeFlash({type: 'success', message:'Article Edited Successfully.'}))
    }

    return(
        <div style={{paddingBottom:'2%'}}>
            {/* Article Preview Modal */}
            <ArticlePreview 
                ref={articlePreviewRef}
                onPublish={editArticle ? editnUpdateArticleData : uploadArticleData}
                article={currentArticle}
                artStateImg={artStateImg}
                existingArticle={editArticle && editArticle.article} //For existing articleImg view purpose
                isImageURLEmpty={isImageURLEmpty} //For No image Preview on editing
            />

            {/* Form */}
            <div>
                <div style={{textAlign:'center', marginBottom: "-3%", position:'relative', zIndex:'51'}}>
                    <img src={addArtHeaderImg} width={150} height={150} />
                </div>
                <ArticleForm 
                    handleSubmit={handleSubmit} 
                    artStateImg={artStateImg} 
                    handleImageChange={handleImageChange}
                    setArtStateImg={setArtStateImg}
                    existingArticle={editArticle && editArticle.article}
                    setIsImageURLEmpty={setIsImageURLEmpty}
                />
            </div>
        </div>
    )
}
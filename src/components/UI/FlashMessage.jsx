import { createPortal } from "react-dom";
import classes from './FlashMessage.module.css';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";

export default function FlashMessage({message, ...props}){
    //Redux
    const dispatch = useDispatch();
    const flashType = useSelector(state => state.ui.flash.type);

    const dialogRef = useRef();
    // console.log('flashmessage')

    function onCloseFlash(){
        dispatch(uiActions.removeFlash())
        dialogRef.current?.close()
    }

    let dialog_bcolor = 'white'
    let color = 'black'

    if (flashType === 'success') {
        dialog_bcolor = 'rgb(210 225 133)' 
    } else if (flashType === 'warning'){
        dialog_bcolor = 'red' //red
        color = 'white'
    } else if (flashType === 'info'){
        dialog_bcolor = 'orange'
    }

    useEffect(()=>{
        setTimeout(()=>{
            onCloseFlash();
        }, 5*1000)
    },[onCloseFlash])

    return createPortal(
        <dialog 
            ref={dialogRef}
            className={classes.flash_modal}
            style={{backgroundColor:dialog_bcolor, color:color, ...props}}
            open
        >   
            <div className={classes.content_block}>
                <p style={{marginRight:'2rem'}}>
                    {message}
                </p>
                <p style={{cursor:'pointer'}} 
                   onClick={onCloseFlash}
                >
                    x
                </p>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}
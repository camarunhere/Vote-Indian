import { createPortal } from "react-dom"
import loadingGif from '../../assets/gifs/Loaders/round_loader.gif'
export default function Loader(){
    return createPortal(
        <dialog 
            style={{border:'none',backgroundColor:'transparent', marginTop:'20%', zIndex:'1001'}}
            open
        >   
            <div>
                <img src={loadingGif} alt="loading Gif" width={100} height={100}/>
                {/* <p>{'Loading...'}</p> */}
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}
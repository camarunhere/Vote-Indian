import {RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import FlashMessage from './components/UI/FlashMessage';
import { useSelector } from 'react-redux';
import Loader from './components/UI/Loader';

export default function App(){
  //Redux
  const flash = useSelector(state=> state.ui.flash);
  const loader = useSelector(state=> state.ui.loader)

  return(
    <>
      {flash.isVisible && <FlashMessage message={flash.message}/> }
      {loader.isLoading && <Loader/> }
      <RouterProvider router={router}/>
    </>
  )
}
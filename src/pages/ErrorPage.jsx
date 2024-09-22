import { useRouteError, useNavigate } from 'react-router-dom';
import ErrorElement from '../components/UI/ErrorElement';
import { createPortal } from 'react-dom';
import classes from './ErrorPage.module.css';
import { useEffect, useRef } from 'react';

export default function ErrorPage() {
  const dialog = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
    dialog.current.showModal();
    // return()=>{
    //   dialog.current.close();
    // };
  },[])
  const error = useRouteError();

  let title = 'An error occurred!';
  // let message = 'Something went wrong!'
  let message = error.data.message || 'Something went wrong!'

  if (error.status === 500) {
    message = error.data.message;
  }

  
  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  if (error.status === 401) {
    message = 'Unauthorized error';
  }

  return createPortal(
    <dialog ref={dialog} className={classes.error_modal}>
      <ErrorElement title={title} message={message}/>
      <div className={classes.action_butns}>
       <button onClick={()=>navigate(-1)}>Go Back</button>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
}



import { Link, useSubmit } from "react-router-dom";
import Profile from "./Profile";
import classes from './UserItem.module.css';
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";

export function  UserItem({user}){
  //Redux
  const dispatch = useDispatch()
  const submit = useSubmit();

  function startDeleteHandler() {
    const isProceed = window.confirm("Are you sure?");
    if (isProceed) {
      submit(null, {method:'DELETE'});
      // debugger
      dispatch(uiActions.writeFlash({type:'success', message:'User Deleted!'}))
    }
  }

    return(
        <div className={classes.user_item}>
            <div className={classes.profile_block}>
              <Profile user={user}/>
            </div>
            <div className={classes.actions}>
              <button className={classes.edit_but}><Link to="edit">Edit</Link></button>
              <button className={classes.delete_but} onClick={startDeleteHandler}>Delete User</button>
            </div>
        </div>
    )
}
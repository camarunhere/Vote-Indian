import { redirect } from "react-router-dom";
import UserForm from "../../components/UserForm";
import PageLayout from "../../components/UI/PageLayout";
import { getLocalStorageToken } from "../../util/local_storage";
import classes from './SignupPage.module.css';

export default function SignupPage(){
    return(
            <div className={classes.body} >
              <h2 className={classes.heading}>Sign Up here</h2>
              <UserForm method='post'/>
            </div>
    )
}


export function loader(){
    const token = getLocalStorageToken();
    if (token) {
        return redirect('/user')
    }
    return null
}
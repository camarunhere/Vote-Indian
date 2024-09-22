import { redirect } from "react-router-dom";
import { getLocalStorageToken, setLocalToken } from "../../util/local_storage";
import { authenticateUser } from "../../util/auth";
import LoginForm from "../../components/LoginForm";
import dataStore from "../../store";
import { userActions } from "../../store/user";
import classes from './LoginPage.module.css';
import electionWallImg from '../../assets/images/elections/election_wallpaper.jpg'
import { uiActions } from "../../store/ui";

export default function LoginPage(){
    return(
            <div className={classes.body}>
              <div className={classes.heading}>
                <h2>Login Here</h2>
              </div>
              <div className={classes.login_block}>
                <LoginForm/>
                {/* <img src={electionWallImg}/> */}
              </div>
            </div>
    )
}

export async function action({request}){
    const data = await request.formData();
    const requestedUser = {
        email : data.get('email'),
        password : data.get('password'),
    }

    // console.log('userData on Login form', requestedUser);

    const user = await authenticateUser({auth_user: requestedUser});

    if (user) {
      // set currentUser
      dataStore.dispatch(userActions.setCurrentUser({user}));
      localStorage.setItem('currentUser', JSON.stringify(user));

      // set Token
      setLocalToken(user.token);
      
      //For flash message Purpose
      setTimeout(()=>{
        dataStore.dispatch(uiActions.writeFlash({type:'success', message:'Tada! You have LoggedIn Successfully!, Play Around'}));
      }, 1* 1000)
      

      return redirect('/user');
      
    } else{
      return redirect('/login')
    }
    
    
}

export function loader(){
    const token = getLocalStorageToken();
    if (token) {
        return redirect('/user')
    }
    return null
}
import { redirect } from "react-router-dom";
import { getLocalStorageToken } from "../../util/local_storage";
import dataStore from "../../store";
import { authActions } from "../../store/auth";
import { uiActions } from "../../store/ui";

export function logoutAction(){
    dataStore.dispatch(authActions.onLogout());
    localStorage.removeItem('token');
    // localStorage.removeItem('currentUser');

    //For Flash Message!
    dataStore.dispatch(uiActions.writeFlash({type:'warning', message:'User Logged Out!'}))

    return redirect('/');
}

export function loader(){
    const token = getLocalStorageToken('token');
    if (token) {
        dataStore.dispatch(authActions.onLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');

    } 
    return redirect('/login')
}
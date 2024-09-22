import { json, redirect } from "react-router-dom";
import { fetchData } from "./http_requests";
import { getLocalStorageToken } from "./local_storage";
import dataStore from "../store";
import { userActions } from "../store/user";

export async function authenticateUser({auth_user}){
    const rawUsers = await fetchData({url:'https://reactudemydb-default-rtdb.firebaseio.com/users.json'});
    const allUsers = Object.values(rawUsers);
    const user = allUsers.find(user => user.email === auth_user.email);
    let passwordMatch = true;

    //Resetting this For Validation Purpose
    dataStore.dispatch(userActions.setUserFound())
    dataStore.dispatch(userActions.setPasswordCorrect())

    if (user) {
        passwordMatch = user.password === auth_user.password
    }
    if (!user) {
        dataStore.dispatch(userActions.setNoUserFound())
        // throw json({
        //             message: 'Could not find any users! Try Login Again'
        //         },{status: 422}
        //         )
    }
    else if (!passwordMatch) {
        dataStore.dispatch(userActions.setWrongPassword())

        // throw json({
        //             message: 'Wrong Password!!, Try Login Again'
        //         },{status: 422}
        //         )
    }else{
        return user;
    }
}


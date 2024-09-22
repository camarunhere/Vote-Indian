import { Form, redirect } from "react-router-dom";
import { cheapTokenCreator } from "../util/local_storage";
import { fetchData, uploadData } from "../util/http_requests";
import dataStore from "../store";
import Input from "./UI/Input";
import classes from './UserForm.module.css';
import { useEffect } from "react";
import { userActions } from "../store/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";

export default function UserForm({inputData, method}){
    const dispatch = useDispatch();
    const passwordsEquality = useSelector(state => state.user.signupValidations.passwordsEquality);
    const isDuplicateEmail = useSelector(state => state.user.signupValidations.emailDuplicate);

    useEffect(() => {
        // Cleanup function to execute when the component unmounts
        return () => {
          // Perform cleanup tasks here, such as canceling subscriptions or clearing intervals
        //   console.log('UserForm Component unmounted. Performing cleanup.');
          handleReset()
        };
      }, []); 

    function handleReset(){
        //Resetting For validation purpose
        dispatch(userActions.setPasswordsAreEqual())
        dispatch(userActions.setEmailIsNotDuplicate())
    }

    return(
        <Form method={method} className={classes.form} onReset={handleReset}>
          <h3>Create User</h3>
            <Input 
                type="text" 
                name="first_name" 
                label="First Name:" 
                defaultValue={inputData && inputData.first_name}
                required
            />
            <Input 
                type="text" 
                name="last_name" 
                label="Last Name:" 
                defaultValue={inputData && inputData.last_name}
                required
            />
            <Input 
                type="email" 
                name="email" 
                label="Email:" 
                defaultValue={inputData && inputData.email}
                required
            />
            {method !== 'patch' && isDuplicateEmail && <small>Email Exists Already..</small>}

            <Input 
                type="password" 
                name="password" 
                label="Password:" 
                defaultValue={inputData && inputData.password}
                required
                minLength={8}
            />

            <Input 
                type="password" 
                name="confirm_password" 
                label="Confirm Password:" 
                defaultValue={inputData && inputData.confirm_password}
                required
                minLength={8}
            />
            {!passwordsEquality && <small>Password & Confirm Passoword must be equal..</small>}

            <div className={classes.actions}>
                <button type="reset">Reset</button>
                <button type="submit">
                        {(method === 'post') ? 
                            'Save And Continue'
                            :
                            'Update And Continue'}
                </button>
            </div>
        </Form>
    )
}

export async function action({request, params}){
    const state = dataStore.getState();
    const isLoggedIn = state.auth.isAuthenticated;

    //Resetting For validation purpose
    dataStore.dispatch(userActions.setPasswordsAreEqual())
    dataStore.dispatch(userActions.setEmailIsNotDuplicate())

    const method = request.method;
    const data = await request.formData();

    const userData = {
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        email : data.get('email'),
        password : data.get('password'),
        confirm_password : data.get('confirm_password'),
        token: cheapTokenCreator(data.get('email')),
        role: 'user'
    }

    const rawUsers = await fetchData({url:'https://reactudemydb-default-rtdb.firebaseio.com/users.json'});
    if(rawUsers){
        const users = Object.values(rawUsers)

        users.map(user=>{
            if (userData.email === user.email) {
                dataStore.dispatch(userActions.setEmailIsDuplicate())
                return null
            }
        })
    }

    // debugger
    if (userData.password !== userData.confirm_password) {
        dataStore.dispatch(userActions.setPasswordsAreNotEqual())
        return null
    }

    if (userData.email === 'mega5admin@gmail.com') {
        userData.role = 'superAdmin'
    }
    
    // console.log('userData on submit signup form', userData);

    if (method === 'PATCH') {
        const userId = params.userId;
        await uploadData({data: userData, url:`https://reactudemydb-default-rtdb.firebaseio.com/users/${userId}.json`, method: method});
        
        //For flash message Purpose
        dataStore.dispatch(uiActions.writeFlash({type:'success', message:'User Edited Successfully!'}));
    }else{
        await uploadData({data: userData, url: 'https://reactudemydb-default-rtdb.firebaseio.com/users.json', method: method});
        
        //For flash message Purpose
        dataStore.dispatch(
            uiActions.writeFlash({
                type:'success', 
                message: isLoggedIn ? 'User Created Successfully!' : 'You Have Signed Up Successfully, You can Login now'
            })
        );

    }

    if (isLoggedIn) {
        return redirect('/user/admin/users');
    }
 
    return redirect('/login');
}

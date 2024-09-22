import { Form, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Input from "./UI/Input";
import classes from './LoginForm.module.css';
import userFormClasses from './UserForm.module.css';
import { useSelector } from "react-redux";
import { userActions } from "../store/user";
import { useEffect } from "react";

export default function LoginForm(){
    const dispatch = useDispatch();

    const isUserFound = useSelector(state=>state.user.loginValidations.isUserFound);
    const isPwdCorrect = useSelector(state => state.user.loginValidations.isPwdCorrect)

    useEffect(() => {
        // Cleanup function to execute when the component unmounts
        return () => {
            // Perform cleanup tasks here, such as canceling subscriptions or clearing intervals
            // console.log('UserForm Component unmounted. Performing cleanup.');
            handleReset()
        };
    }, []); 

    function handleSubmit(){
        dispatch(authActions.onLogin());    
    }

    function handleReset(){
        dispatch(userActions.setUserFound())
        dispatch(userActions.setPasswordCorrect())
    }

    return(
        <Form method="post" onSubmit={handleSubmit} onReset={handleReset} className={classes.form}>
          <h3>Type Credentials Carefully.</h3>
            <Input 
                type="email" 
                name="email" 
                label="Email:"
                required
            />
            {!isUserFound && 
                <small>No User Found!!, <Link to='/signup'>Signup</Link> if New User</small>
            }
            <Input 
                type="password" 
                name="password" 
                label="Password:"
                required
                minLength={8}
            />
            {!isPwdCorrect && <small>Incorrect password entered , Try again! </small>}
            <div className={userFormClasses.actions}>
                <button type="reset">Cancel</button>
                <button type="submit">Login</button>
            </div>
        </Form>
    )
}
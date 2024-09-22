import classes from './Profile.module.css';
import profileIcon from '../assets/images/profile_male_logo.png';

export default function Profile({user, isCurrentUser}){
    return(
        <div className={isCurrentUser ? classes.profile_block : classes.for_user_details}>
            <h2>{isCurrentUser ? 'My Profile' : 'User Details'}</h2>
            <img src={profileIcon} alt="Profile Image" className={classes.image}/>
            <h3 className={classes.image_name}>{user.first_name}</h3>
            <div className={classes.user_details}>
                <p>Name: {`${user.first_name} ${user.last_name}`}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                {(user.mobile) && 
                <p>Mobile: {user.mobile}</p>}
            </div>
        </div>
    )
}
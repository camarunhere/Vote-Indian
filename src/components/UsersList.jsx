import { Link } from "react-router-dom"
import classes from './UsersList.module.css';
import profileLogo from '../assets/images/profile_male_logo.png';

export default function UsersList({users}){
    return(
        <div className={classes.users}>
             <h2>All Users</h2>
             <ul className={classes.list}>
                {Object.entries(users).map(([key, user]) => (
                <li key={key} className={classes.item}>
                    {/* <Link to={`/events/${event.id}`} > */}
                    <Link to={key} >
                        <img src={profileLogo} alt='profile image' />
                        <div className={classes.content}>
                            <h2>{`${user.first_name} ${user.last_name}`}</h2>
                            <p>{user.email}</p>
                        </div>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    )
}
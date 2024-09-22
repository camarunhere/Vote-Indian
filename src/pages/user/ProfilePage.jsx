import { useDispatch, useSelector } from "react-redux"
import classes from './ProfilePage.module.css'
import profileIcon from '../../assets/images/profile_male_logo.png';
import Profile from "../../components/Profile";

export default function ProfilePage(){
    const currentUser = useSelector(state=> state.user.currentUser);

    // const dispatch = useDispatch();
    // const user = { email: 'dhaks@gmail.com', full_name: 'Murufdf SL', password: '123', role: 'user'}
    // useEffect(()=>{
    //     dispatch(userActions.setCurrentUser({user}))
    // },[])

    // console.log(currentUser, 'current user in users profile')
    return (
        <div className={classes.body}>
            <Profile user={currentUser} isCurrentUser={true}/>
        </div>
    )
}
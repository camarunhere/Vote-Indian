import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../util/http_requests"
import { useSelector } from "react-redux";
import ImageNavLink from "../../components/UI/ImageNavLink";

export default function DashBoardPage(){
    // const currentUser = useSelector(state=> state.user.currentUser);
    // const directFetchUsers = useLoaderData();
    // const users = Object.values(directFetchUsers);
    // const keys = Object.keys(directFetchUsers);
    // console.log(keys, 'keys from dashboard page');
    // console.log(directFetchUsers, 'object from firebase in dashboard')

    return(
        <>
        <h2 style={{textAlign: 'center'}}>Dashboard</h2>
        <ImageNavLink 
            to='/articles'
            imageLabel='Articles'
        />
        </>
        //Need to Set Events or Any Articles//

        // <> 
        // <h1>Welcome {currentUser.full_name}</h1>
        //     <h4>CurrentUser: {currentUser.email}</h4>
        //     <ul>
        //         {/* {users.map((user)=>( */}
        //         {Object.entries(directFetchUsers).map(([keys, user])=>(
        //             <li>{user.email}</li>
        //         ))}
        //     </ul>
        // </>
    )
}

export async function loader(){

    const rawUsers = await fetchData({url:'https://reactudemydb-default-rtdb.firebaseio.com/users.json'});
    // const users = Object.values(rawUsers)

    // const users = entries.map(([key, value]) => value);
    // console.log('users data in dashboard', users)
    // console.log('users data in dashboard', users)

    return rawUsers
}
import { redirect, useRouteLoaderData } from "react-router-dom";
import { UserItem } from "../../components/UserItem";
import ErrorElement from "../../components/UI/ErrorElement";

export default function UserDetailPage(){
    const userData = useRouteLoaderData('user_details');
    // console.log(userData, 'userData in userDetail page')
    return(
        <>
            {(userData ?
                <UserItem user={userData}/> 
                :
                <ErrorElement title='No user found'/>
            
            )}
        </>
    )
}

export async function loader({params}){
    const id = params.userId;
    const response = await fetch(`https://reactudemydb-default-rtdb.firebaseio.com/users/${id}.json`);

    if (!response.ok) {
        throw json(
            {
            message: 'Could not Fetch User data!'
        },
        {
            status:500
        }
        )
    } else if(response === null){
        throw json(
            {
            message: 'No user found!'
        },
        {
            status:404
        }
        )
    }
    else{

        return response;

    }
}

export async function action({params, request}){
    const id = params.userId
    const response = await fetch(`https://reactudemydb-default-rtdb.firebaseio.com/users/${id}.json` , {
        method: request.method,
    })
    if (!response.ok) {
        throw json(
            {
            message: 'Could not delete the User!'
        },
        {
            status:500
        }
        )
    }else{
       return redirect('/user/admin/users');
    }

}
import { useRouteLoaderData } from "react-router-dom";
import UserForm from "../../components/UserForm";

export default function EditUserPage(){
    const userData = useRouteLoaderData('user_details');
    return(
        <div style={{width:'80rem'}}>
            <UserForm inputData={userData} method='patch'/>
        </div>

    )
}
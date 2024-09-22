import UserForm from "../../components/UserForm";

export default function NewUserPage(){
    return(
        <div style={{width:'80rem', height:'85vh'}} >
            <UserForm method='post'/>
        </div>
    )
}
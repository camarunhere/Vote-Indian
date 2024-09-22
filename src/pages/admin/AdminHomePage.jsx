import adminWomenImg from '../../assets/images/background_images/admin_women.png'
export default function AdminHomePage(){
    return(
        <div style={{textAlign:'center', margin:'5% auto', height:'78vh'}}>
            
            <h1>Admin Space</h1>
            <p>Users can be managed here, like adding a new user, editing and deleting!</p>
            <img src={adminWomenImg} alt="admin home" width={600} height={400}/>
            
        </div>
    )
}
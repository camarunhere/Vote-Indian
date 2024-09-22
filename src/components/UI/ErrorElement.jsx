import PageLayout from "./PageLayout";

export default function ErrorElement({title, message}){
    return(
        <>
            {/* <PageLayout> */}
            <h2>{title}</h2>
            <p>{message}</p>
            {/* </PageLayout> */}
        </>
    )
}
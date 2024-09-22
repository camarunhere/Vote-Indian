import { json } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import dataStore from "../store";
import { uiActions } from "../store/ui";

export async function uploadData({data, url, method}){
    
    // debugger
    //For Loader Purpose
    dataStore.dispatch(uiActions.startLoading());
    
    const response = await fetch(url, {
        // method: (method === 'post') ? 'POST' : 'PATCH',
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        //For Loader Purpose
        dataStore.dispatch(uiActions.stopLoading());

        throw json({
            message: 'An Error Occurred, Not able to upload Data!'
        },
        {
            status: 500
        })
        
    }
    const resData = await response.json();

    //For Loader Purpose
    dataStore.dispatch(uiActions.stopLoading());

    return resData;
}

export async function fetchData({url}){
    //For Loader Purpose
    dataStore.dispatch(uiActions.startLoading());

    const response = await fetch(url);

    if (!response.ok) {
        //For Loader Purpose
        dataStore.dispatch(uiActions.stopLoading());
        throw json(
            {
                message: 'Unable to fetch data, Try Again'
            },
            {
                status: 500
            }
        )
    }else if(response === null){
        //For Loader Purpose
        dataStore.dispatch(uiActions.stopLoading());
        throw json(
            {
            message: 'No data found!'
            },
            {
                status:404
            }
        )
    }

    const resData = await response.json();
    // console.log('Data from firebase', resData)

    //For Loader Purpose
    dataStore.dispatch(uiActions.stopLoading());
    return resData;
}

export async function uploadFile({file, storage, location}){
     
    //Upload file to firebase Storage
        //Reference to the desired location in Firebase Storage
        const storageRef = ref(storage, location)
        try {
            const uploadTask = uploadBytesResumable(storageRef, file);
            await uploadTask;
            
            //Getting firebase storage image url
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            throw json(
                {
                    message: error.message || 'Error in uploading file!!'
                },
                {
                    status: error.status || 500
                }
            )
         }
}

export async function deleteData({url}){
    //For Loader Purpose
    dataStore.dispatch(uiActions.startLoading());

    const response = await fetch(url , {
        method: 'DELETE',
    })

    if (!response.ok) {
        //For Loader Purpose
        dataStore.dispatch(uiActions.stopLoading());
        throw json(
            {
            message: 'Could not delete!'
        },
        {
            status:500
        }
        )
    }
    //For Loader Purpose
    dataStore.dispatch(uiActions.stopLoading());
}       
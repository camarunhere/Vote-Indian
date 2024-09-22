import { deleteObject, ref } from 'firebase/storage';
import {json} from 'react-router-dom';

export async function deleteFileByDownloadURL({storage, downloadURL}){
    // Deleting actual file in FireBase
    try {
        const fileRef = ref(storage, downloadURL);

        await deleteObject(fileRef)
        // console.log(`article's image deleted successfully..`)
        
    } catch (error) {
        // console.log(`article's image NOT able to delete.`)
        throw json(
            {
                message: error.message || `article's image NOT able to delete`
            },
            {
                status:500
            }
        )
    }
    
}
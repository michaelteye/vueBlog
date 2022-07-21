import {ref} from 'vue'
import { ProjectFirestore } from '@/firebase/config'

// collection as an argument

const useCollection = (collection)=>{
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null,
        isPending.value = true

        try{
            const res =  await ProjectFirestore.collection(collection).add(doc)
            isPending.value = false
            return res
        }

        catch(err){
            console.log(err.message)
            error.value = 'Could not send the message'
            isPending.value = false


        }
    }
    return {error, addDoc, isPending}
}
export default useCollection


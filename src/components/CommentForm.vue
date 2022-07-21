<template>
<h4>Comment Section</h4>
    <textarea
    placeholder="Add comment here.."
    v-model="message"
    @keypress.enter.prevent = "handleSubmit">

    </textarea>
    <div class="error">{{ error }}</div>
  
</template>

<script>
import useCollection from '@/composables/useCollection' 
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
export default {
    setup(){
        const { user } = getUser()
        // passing in the object in the useCollection as an object
        const {addDoc,error } = useCollection('dlogs')
        const message = ref('')

        const handleSubmit = async () =>{
            const chat = {
                name:user.value.displayName,
                message:message.value,
                createdAt:timestamp()
            }
            await addDoc(chat)
            if(!error.value){
               message.value = ''
            }
        }
        return { message, handleSubmit }
    }

}

</script>

<style scoped>
form {
    margin:10px;
}
textarea {
    width:100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
}
</style>

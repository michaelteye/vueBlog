<template>
<form @submit.prevent="handleSubmit">
  <p>create new Blog</p>
  <input type="text" required placeholder="blog title" v-model="title">
  <textarea required placeholder="blog description..." v-model="description"></textarea>
  <label>Upload blog cover image</label>
  <input type="file" @change="handleChange">
  <div class="error">{{fileError}}</div>
  <button v-if="!isPending">create</button>
  <button v-else disabled>saving....</button>
</form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '@/composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '../../firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup(){

    const {filePath, url, uploadImage} = useStorage()
    const {error,addDoc} = useCollection('blogs')
    const { user } = getUser()
    const title = ref('')
    const description = ref('')
    const fileError = ref(null)
    const file = ref(null)
    const isPending = ref(false)
    const router = useRouter()


    const handleSubmit = async()=>{
      if(file.value){
            isPending.value = true
           await uploadImage(file.value);
           const res = await addDoc({
            title:title.value,
            description:description.value,
            userId: user.value.uid,
            userName:user.value.displayName,
            coverUrl:url.value,
            filePath:filePath.value,
            blogs:[],
            createdAt:timestamp()
           })
           isPending.value = false
           if(!error.value){
            router.push({name: 'BlogDetails', params:{id: res.id }})
           }
      }
    }

    const types = ['image/png','image/jpeg','image/jpg']



    const handleChange = (e)=>{
        const selected = e.target.files[0]
        console.log(selected)
        
      if(selected && types.includes(selected.type)){
        file.value = selected
        fileError.value = null
      }else {
        file.value = null
        fileError.value = 'please select an image file (png,jpeg or jpeg)'
      }
    }
    return { title, description, handleSubmit, handleChange,fileError,file, isPending}

 }
}
</script>
<style>
input[type="file"]{
   border:0;
   padding: 0;
}
label{
    font-size: block;
    display: block;
    margin-top: 30px;
}
button{
    margin-top: 20px;
}
</style>
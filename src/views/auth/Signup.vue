<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" placeholder="name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>

  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'
export default {
    setup(){

        const {error, signup, isPending} = useSignup()
        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        const router = useRouter()
 
        const handleSubmit = async()=>{
           const res = await signup(email.value,password.value,displayName.value)
            if(!error.value){
                router.push({name:'home'})
            }
        }

        return {email, password, displayName,error,handleSubmit,isPending}
    }

}
</script>

<style>

</style>
<template>
  <div class="navbar">
    <nav>
        <img src="@/assets/img.png" alt="">
        <h1><router-link :to="{name:'home'}">Dev Blog</router-link></h1>
        <div class="links">
            <div v-if="user">
                <router-link :to="{name:'CreateBlog'}">Create Blog</router-link>
                <router-link :to="{name:'UserBlog'}">My Blog</router-link>
                <!-- <span>Hi here, {{user.UserName }}</span> -->
                <button @click="handleClick">Logout</button>
            </div>
            <div v-else>
                    <router-link class="btn" :to="{name:'signup'}">Signup</router-link>
                    <router-link class="btn" :to="{name:'login'}">Log in</router-link>
            </div>
            
        </div>
    </nav>

  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '@/composables/getUser'
export default {
    setup(){
        const router = useRouter()
        const { logout } = useLogout()
        const {user} = getUser()
        

        const handleClick = async ()=>{
            await logout()
            
            console.log('logout is successful')
            
            router.push({name:'home'})

        }


        return { useLogout, handleClick, getUser,user}

    }

}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: #eee;
}
nav{
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav h1 {
    margin-left: 20px;
    /* color: white; */
}
nav .links{
    margin-left: auto;
}

nav .links a, button{
    margin-left: 16px;
    font-size: 14px;
}
nav img {
    max-height:60px;
}

span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
}

</style>
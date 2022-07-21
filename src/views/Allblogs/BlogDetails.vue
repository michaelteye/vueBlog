<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="blog" class="playlist-details">
  <!-- playlist information -->
  <div class="playlist-info">
    <div class="cover">
        <img :src="blog.coverUrl">
    </div>
    <h2>{{ blog.title }}</h2>
    <p class="username">Created by {{ blog.userName }}</p>
    <p class="description">{{ blog.description }}</p>
    <div>
        <Displaycomment/>
    </div>
    <div>
        <CommentForm/>
    </div>
    <button v-if="ownership" @click="handleDelete">Delete Blog</button>
 
  </div>


  <!-- Song List -->
  <div class="song-list">
    <div v-if="!blog.blogs.length">No post have been added to this blog yet.</div>
    <div v-for="blog in blog.blogs" :key="blog.id" class="single-song">
        <div class="details">
            <h3>{{ blog.title}}</h3>
            <p>{{ blog.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(blog.id)">delete</button>

    </div>
    <AddBlog v-if="ownership" :blog="blog" />
  </div>
  </div>
</template>

<script>
import Displaycomment from '@/components/Displaycomment.vue';
import CommentForm from '@/components/CommentForm.vue'
import AddBlog from '@/components/AddBlog.vue'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import getDocument from '@/composables/getDocument'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'



export default {
    props:['id'],
    components:{ AddBlog, CommentForm, Displaycomment},
    // components:{AddBlog},
    setup(props){

        // UseRouter
        const router = useRouter()

        // use storage
        const { deleteImage } = useStorage()
        //  get a single playlist
        const {error, document:blog }= getDocument('blogs',props.id)

        // getting the user
        const { user } = getUser()

        // deleting a specific user

        const { deleteDoc, updateDoc } = useDocument('blog', props.id)


        const ownership = computed(()=>{
            return blog.value && user.value && user.value.uid == blog.value.userId
        })

        // function for deleting document
        const handleDelete = async () => {
            await deleteImage(blog.value.filePath)
            await deleteDoc()
            router.push({name:'home'})
        }

        const handleClick = async(id)=>{
            const blogs = blog.value.blogs.filter((blog)=>blog.id != id)
            await updateDoc({ blogs})

        }

        return {error, blog, ownership, handleDelete, handleClick }
    }

}
</script>

<style>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap:80px;
}
.cover {
    overflow:hidden;
    border-radius:20px;
    position: relative;
    padding: 160px;
}
.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>
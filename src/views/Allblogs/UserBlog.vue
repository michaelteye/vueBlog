<template>
  <div class="user-playlists">
    <h2>My Playlist</h2>
    <div v-if="blogs">
        <ListView :blogs="blogs"/>
    </div>
    <router-link :to="{name: 'CreateBlog'}" class="btn">Create a new Blog</router-link>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
export default {
    components: { ListView },

    setup() {
        const { user } = getUser();
        const { documents: blogs } = getCollection("blogs", ["userId", "==", user.value.uid]);
        console.log(blogs);
        return { blogs };
    }
}
</script>

<style>

</style>
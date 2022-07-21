<template>
<div class="home">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents">
        <ListView :blogs="documents"/>
    </div>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue'
import getCollection from '@/composables/getCollection'
import { computed } from '@vue/runtime-core'
export default {
  components:{ListView},
  name: 'HomeView',
  setup(){
    const {documents, error} = getCollection('blogs')
    
    return {error, documents}

  }
}
</script>
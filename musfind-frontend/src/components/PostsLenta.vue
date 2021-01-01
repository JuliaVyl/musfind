<template>
    <div>
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
    <Posts v-bind:posts="allPosts"/>
    </div>
</template>

<script>
import Posts from './Posts.vue'
import MusfindServiceReal from '../services/musfindServiceReal'
import firebase from "firebase"
import Spinner from './Spinner.vue'

export default {
  name: 'PostsLenta',
  components: {
    Posts,
    Spinner
  },
  mounted() {
      let service = new MusfindServiceReal()
      this.loading = true
      firebase.getCurrentUser().then((data) => this.currentUser = data.displayName)
        .then(() => {
          service.GetLentaOfPosts(this.currentUser).then((data) => {this.allPosts = data; this.loading = false}).catch((err) => this.error = err)
        })
      
  },
  data() {
    return {
        currentUser: '',
        allPosts: [],
        error: null,
        loading: true
    }
  }
}
</script>

<style></style>
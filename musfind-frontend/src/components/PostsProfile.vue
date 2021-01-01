<template>
    <div>
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
        <Posts v-bind:posts="userPosts"/>
    </div>
</template>

<script>
import Posts from './Posts.vue'
import MusfindServiceReal from '../services/musfindServiceReal'
import Spinner from './Spinner.vue'

export default {
  name: 'PostsProfile',
  components: {
    Posts,
    Spinner
  },
  mounted() {
      let realService = new MusfindServiceReal()
      this.loading = true
      realService.GetUserPosts(this.$route.params.username).then((data) => {this.userPosts = data; this.loading = false}).catch((err) => this.error = err)
  },
  data() {
    return {
        user: null,
        userPosts: null,
        error: null,
        loading: true,
        numOfLikes: null,
        numOfComments: null
    }
  },
}
</script>

<style></style>
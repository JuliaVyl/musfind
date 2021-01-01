<template>
    <div class="container-fluid">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 lenta">
                <div v-for="post in posts" :key="post.Id" class="card mb-3">
                    <Post v-bind:post="post"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Post from './Post'

export default {
    name: 'Posts',
    components: {
        Post
    },
    props: {
        posts: Array
    },
    mounted() {
    }
}
</script>

<style>
    @import '../assets/css/main.css'; 
</style>
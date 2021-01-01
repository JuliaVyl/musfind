<template>
    <div>
        <p class="com-text">
            <router-link class="link link-com" href="#" :to="{path: `/users/${comment.From}`}">@{{comment.From}}</router-link>
        {{comment.Text}}
        </p>
    </div>
</template>
<script>

export default {
    name: 'Comment',
    components: {
    },
    props: {
        comment: Object
    },
    mounted() {
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style>
    @import '../assets/css/main.css'; 
</style>
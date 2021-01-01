<template>
    <div>
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
        <div class="container-fluid">
            <div class="form">
                <div class="all" v-for="user in users" :key="user.Name">
                    <User v-bind:user="user" v-bind:users="users"/>
                    <hr class="hr"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from './User'
import MusfindServiceReal from '../services/musfindServiceReal'
import firebase from "firebase"
import Spinner from './Spinner.vue'

export default {
    name: 'Follows',
    components: {
        User,
        Spinner
    },
    data() {
        return {
            users: [],
            currentUser: '',
            error: null,
            loading: false,
        }
    },
    mounted() {
        let realService = new MusfindServiceReal()
        this.loading = true
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName)
        realService.GetAllUserFollows(this.$route.params.username).then((data) => {this.users = data; this.loading = false}).catch((err) => this.error = err)
    }
}
</script>

<style>
    @import '../assets/css/users.css'; 

</style>
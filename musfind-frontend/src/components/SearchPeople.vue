<template>
    <div>
        
        <div v-if="loading">
            <Spinner />
        </div>
        <div v-else class="container-fluid">
            <h1 class="no-posts" v-if="users.length === 0">По заданным критериям пользователей не найдено</h1>
            <div class="form" v-else>
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
import Spinner from './Spinner.vue'
import MusfindServiceReal from '../services/musfindServiceReal'
import firebase from "firebase"

export default {
    name: 'SearchPeople',
    components: {
        User,
        Spinner
    },
    props: {
        tags: String,
        statuses: String,
        countries: String,
        cities: String,
        name: String
    },
    data() {
        return {
            users: [],
            loading: false,
            currentUser: ''
        }
    },
    mounted() {
        this.loading = true
        const usernameForForm = this.name === undefined ? "" : this.name
        const tagsForForm = this.tags === undefined ? "" : this.tags.split(' ').join(',')
        const statusesForForm = this.statuses === undefined ? "" : this.statuses.split(' ').join(',')
        const countriesForForm = this.countries === undefined ? "" : this.countries.split(' ').join(',')
        const citiesForForm = this.cities === undefined ? "" : this.cities.split(' ').join(',')
        let realService = new MusfindServiceReal()  
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
            realService.Search(this.currentUser, usernameForForm, tagsForForm, statusesForForm, countriesForForm, citiesForForm).then((data) => { this.users = data; this.loading = false }).catch((err) => this.error = err)
        })
    }
}
</script>

<style>
    @import '../assets/css/users.css'; 

</style>
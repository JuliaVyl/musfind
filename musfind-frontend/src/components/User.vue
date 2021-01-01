<template>
    <div>        
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
        <div class="row">
            <!-- <i class="fa fa-circle-o-notch fa-spin"></i> -->
            <img v-if="user.Img" class="profile-img-user" v-bind:src="`https://localhost:44380/images/${user.Img}`"/>
            <img v-else src="https://localhost:44380/images/DefaultPhoto.png" class="profile-img-user"/>
            <h5 class="card-title"><router-link class="nav-link" :to="{path: `/users/${user.Name}`}">@{{user.Name}}</router-link></h5>
            <b-dropdown class="user-more">
                <template v-slot:button-content>Еще</template>
                <b-dropdown-item>Заблокировать</b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="row">
            <a><strong  v-if="userStatuses">Вид деятельности: </strong></a>
            <a class="jenre" v-if="userStatuses.length === 0">Не указано</a>
            <router-link class="nav-link inf st" href="#" v-for="status in userStatuses" :key="status.name" :to="{path: '/search/results?statuses=' + status.name}"><strong>{{status.name}}</strong></router-link>
        </div>
        <div class="row">
            <a><strong v-if="userTags">Жанры: </strong></a> 
            <a class="jenre" v-if="userTags.length === 0">Не указано</a>
            <router-link v-else class="nav-link inf" href="#" v-for="tag in userTags" :key="tag.name" :to="{path: '/search/results?tags=' + tag.name}">#{{tag.name}}</router-link>
        </div>
        <div class="row">
            <a><strong>Страна: </strong></a>
            <a class="jenre" v-if="userCountry === null">Не указано</a>
            <router-link class="nav-link inf geo" href="#" v-else :to="{path: '/search/results?countries=' + userCountry.name}">{{userCountry.name}}</router-link>
            <a><strong>Город: </strong></a>
            <a class="jenre" v-if="userCity === null">Не указано</a>
            <router-link class="nav-link inf geo" href="#" v-else :to="{path: '/search/results?cities=' + userCity.name}">{{userCity.name}}</router-link>
        </div>
        <div class="row">
            <a class="about-user">{{user.Info}}</a>
            <router-link :to="{path: '/message'}" class="btn btn-outline-secondary send">Отправить сообщение</router-link>
        </div>
    </div> 
</template>

<script>
import firebase from "firebase"   
import Spinner from './Spinner.vue'
import MusfindServiceReal from '../services/musfindServiceReal'

export default {
    name: 'User',
    components: {
        Spinner
    },
    props: {
        user: Object
    },
    mounted() {
        this.loading = true
        let realService = new MusfindServiceReal()
        realService.GetUsersTags(this.user.Name).then((tag) => {this.userTags = tag; this.loading = false}).catch((err) => this.error = err)        
        realService.GetUsersStatuses(this.user.Name).then((status) => {this.userStatuses = status; this.loading = false}).catch((err) => this.error = err)        
        realService.GetUserCountry(this.user.Name).then((country) => {this.userCountry = country; this.loading = false}).catch((err) => this.error = err)        
        realService.GetUsersCity(this.user.Name).then((city) => {this.userCity = city; this.loading = false}).catch((err) => this.error = err)
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName)
    },
    data() {
        return {
            userTags: [],
            userStatuses: [],
            userCountry: null,
            userCity: null,
            currentUser: '',            
            error: null,
            loading: false
            
        }
    },
    methods: {
        followUser() {
            const service = new MusfindServiceReal()
            service.Follow(this.currentUser, this.user.Name).then(() => {this.isFollow = 1}).catch((err) => this.error = err)
        },
        unfollowUser() {
            const service = new MusfindServiceReal()
            service.Unfollow(this.currentUser, this.user.Name).then(() => {this.isFollow = 0}).catch((err) => this.error = err)
        }
    }
}
</script>

<style>
    @import '../assets/css/users.css'; 
    .user-more {
        height: 28px;
        margin-left: 20px;
    }
    .inf {
        margin-left: -10px;
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .geo {
        margin-right: -10px;
    }
    .jenre {
        margin-left: 8px;
    }
    .st {
        margin-top: 2px;
        margin-left: -29px;
    }
</style>
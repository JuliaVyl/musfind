<template>
    <div>
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
        <div v-else>
            <div class="container-fluid">
                <div  class="row justify-content-sm-center profile-header">
                    <div class="col-lg-2 col-sm-6">
                        <img v-if="userData.User.Img" v-bind:src="`https://localhost:44380/images/${userData.User.Img}`" alt="..." class="round img-profile">
                        <img v-else src="https://localhost:44380/images/DefaultPhoto.png" alt="..." class="round img-profile">
                    </div>
                    <div class="col-lg-5 col-sm-6">
                        <!-- desktop -->
                        <div class="description-body desktop-description">
                            <div class="row">
                                <img v-if="userData.User.Img" v-bind:src="`https://localhost:44380/images/${userData.User.Img}`" alt="..." class="photo-mini">
                                <img v-else src="https://localhost:44380/images/DefaultPhoto.png" alt="..." class="photo-mini">
                                <h4 class="nickname">{{userData.User.Name}}</h4>
                                <router-link class="nav-link" :to="{path: '/editprofile'}" v-if="$route.params.username === currentUser" id="edit-prof">Редактировать профиль</router-link>
                                <button v-else-if="isFollow === 0" class="btn btn-outline-secondary send" id="subb" @click.prevent="followUser()">Подписаться</button>
                                <button v-else-if="isFollow === 1" class="btn btn-outline-secondary send" id="subb"  @click.prevent="unfollowUser()">Отписаться</button>
                                <b-dropdown class="post-more">
                                    <template v-slot:button-content>Еще</template>
                                    <b-dropdown-item v-if="$route.params.username === currentUser">Статистика</b-dropdown-item>
                                    <b-dropdown-item v-if="$route.params.username === currentUser" @click.prevent="signOut()">Выйти</b-dropdown-item>
                                    <b-dropdown-item v-if="$route.params.username !== currentUser">Заблокировать</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <div class="row">
                                <div class="col" id="stat">
                                    <span class="stat-num">{{numOfPosts}} </span>
                                    <span class="stat">Публикации</span>
                                </div>
                                <div class="col" id="stat">
                                    <span class="stat-num">{{numOfSubscribers}} </span>
                                    <router-link class="nav-link subs" :to="{path: '/users/' + $route.params.username + '/followers'}">Подписчиков</router-link> 

                                </div>

                                <div class="col" id="stat">
                                    <span class="stat-num">{{numOfFollows}} </span>
                                    <router-link class="nav-link subs" :to="{path: '/users/' + $route.params.username + '/follows'}">Подписок</router-link> 
                                </div>
                            </div>
                            <table class="table-sm table-borderless">
                                <tbody>
                                    <tr v-if="userData.Status">
                                    <th scope="row">Статус</th>
                                    <td><router-link class="nav-link inf" :to="{path: '/search/results?statuses=' + status.name}" v-for="status in userData.Status" :key="status.name">{{status.name}}</router-link></td>
                                    </tr>
                                    <tr v-if="userData.Tag">
                                    <th scope="row">Музыкальные жанры</th>
                                    <td><router-link class="nav-link inf" :to="{path: '/search/results?tags=' + tag.name}" v-for="tag in userData.Tag" :key="tag.name">#{{tag.name}}</router-link></td>
                                    </tr>
                                    <tr v-if="userData.Country">
                                    <th scope="row">Страна</th>
                                    <td><router-link class="nav-link inf" :to="{path: '/search/results?countries=' + userData.Country.name}">{{userData.Country.name}}</router-link></td>
                                    </tr>
                                    <tr v-if="userData.City">
                                    <th scope="row">Город</th>
                                    <td><router-link class="nav-link inf" :to="{path: '/search/results?cities=' + userData.City.name}">{{userData.City.name}}</router-link></td>
                                    </tr>
                                    <tr v-if="userData.User.Age">
                                    <th scope="row">Возраст</th>
                                    <td><a class="nav-link inf" >{{userData.User.Age}}</a></td>
                                    </tr>
                                    <tr v-if="userData.User.Info">
                                    <th scope="row">Музыкальный опыт</th>
                                    <td><a class="nav-link inf">{{userData.User.Experience}}</a></td>
                                    </tr>
                                    <tr v-if="userData.User.Info">
                                    <th scope="row">О себе</th>
                                    <td><a class="nav-link inf">{{userData.User.Info}}</a></td>
                                    </tr>
                                    <div class="about"></div>
                                </tbody>
                            </table>
                            <button v-if="$route.params.username !== currentUser" class="btn btn-outline-secondary send" @click.prevent="getDialog()">Отправить сообщение</button>
                            <router-link :to="{path: '/addpost'}" class="btn btn-outline-secondary send" v-if="$route.params.username === currentUser">Загрузить трек</router-link>
                        </div>
                    </div>
                    <!-- phone -->
                    <div class="description-body phone-description">
                        <div class="row">
                            <img v-if="userData.User.Img" v-bind:src="`https://localhost:44380/images/${userData.User.Img}`" alt="..." class="photo-mini">
                            <img v-else src="https://localhost:44380/images/DefaultPhoto.png" alt="..." class="photo-mini">
                            <h4 class="nickname">{{userData.User.Name}}</h4>
                            <router-link class="nav-link" :to="{path: '/editprofile'}" v-if="$route.params.username === currentUser" id="edit-prof">Редактировать профиль</router-link>
                            <button v-else-if="isFollow === 0" class="btn btn-outline-secondary send" id="subb" @click.prevent="followUser()">Подписаться</button>
                            <button v-else-if="isFollow === 1" class="btn btn-outline-secondary send" id="subb"  @click.prevent="unfollowUser()">Отписаться</button>
                        </div>
                        <div class="row">
                            <div class="col" id="stat">
                                <span class="stat-num">{{numOfPosts}} </span>
                                <span class="stat-phone">Публикации</span>
                            </div>
                            <div class="col" id="stat">
                                <span class="stat-num">{{numOfSubscribers}} </span>
                                <router-link class="nav-link subs phone-subs" :to="{path: '/users/' + $route.params.username + '/followers'}">Подписчиков</router-link> 
                            </div>
                            <div class="col" id="stat">
                                <span class="stat-num">{{numOfFollows}} </span>
                                <router-link class="nav-link subs phone-subs" :to="{path: '/users/' + $route.params.username + '/follows'}">Подписок</router-link> 
                            </div>
                        </div>
                        <table class="table-sm table-borderless">
                            <tbody>
                                <tr v-if="userData.Status">
                                <th scope="row">Статус</th>
                                <td><router-link class="nav-link inf" :to="{path: '/search/results?statuses=' + status.name}" v-for="status in userData.Status" :key="status.name">{{status.name}}</router-link></td>
                                </tr>
                                <tr v-if="userData.Tag">
                                <th scope="row">Музыкальные жанры</th>
                                <td><router-link class="nav-link inf" :to="{path: '/search/results?tags=' + tag.name}" v-for="tag in userData.Tag" :key="tag.name">#{{tag.name}}</router-link></td>
                                </tr>
                                <tr v-if="userData.Country">
                                <th scope="row">Страна</th>
                                <td><router-link class="nav-link inf" :to="{path: '/search/results?countries=' + userData.Country.name}">{{userData.Country.name}}</router-link></td>
                                </tr>
                                <tr v-if="userData.City">
                                <th scope="row">Город</th>
                                <td><router-link class="nav-link inf" :to="{path: '/search/results?cities=' + userData.City.name}">{{userData.City.name}}</router-link></td>
                                </tr>
                                <tr v-if="userData.User.Age">
                                <th scope="row">Возраст</th>
                                <td><a class="nav-link inf" >{{userData.User.Age}}</a></td>
                                </tr>
                                <tr v-if="userData.User.Info">
                                <th scope="row">Музыкальный опыт</th>
                                <td><a class="nav-link inf">{{userData.User.Experience}}</a></td>
                                </tr>
                                <tr v-if="userData.User.Info">
                                <th scope="row">О себе</th>
                                <td><a class="nav-link inf">{{userData.User.Info}}</a></td>
                                </tr>
                                <div class="about"></div>
                            </tbody>
                        </table>
                        <button v-if="$route.params.username !== currentUser" class="btn btn-outline-secondary" id="send-phone" @click.prevent="getDialog()">Отправить сообщение</button>
                        <router-link :to="{path: '/addpost'}" class="btn btn-outline-secondary send" id="send-phone" v-if="$route.params.username === currentUser">Загрузить трек</router-link>
                        <b-dropdown class="post-more more-description" id="dropdown-dropleft">
                            <template id="dropdown-dropleft" v-slot:button-content >Еще</template>
                            <b-dropdown-item v-if="$route.params.username === currentUser">Статистика</b-dropdown-item>
                            <b-dropdown-item v-if="$route.params.username === currentUser" @click.prevent="signOut()">Выйти</b-dropdown-item>
                            <b-dropdown-item v-if="$route.params.username !== currentUser">Заблокировать</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </div> 
            <hr/>
            <PostsProfile v-if="numOfPosts !== 0" v-bind:userImg="userData.User.Img"/>
            <div v-else>
                <h1 class="no-posts">Постов еще нет</h1>
            </div>
        </div>
    </div>
</template>

<script>
import PostsProfile from './PostsProfile.vue'
import Spinner from './Spinner.vue'
import firebase from "firebase"
import MusfindServiceReal from '../services/musfindServiceReal'

export default {
    name: 'Profile',
    components: {
            PostsProfile,
            Spinner
    },
    mounted() {
            let realService = new MusfindServiceReal()
            this.loading = true
            realService.GetNumOfPosts(this.$route.params.username).then((num) => this.numOfPosts = num).catch((err) => this.error = err)
            realService.GetNumOfFollows(this.$route.params.username).then((num) => this.numOfFollows = num).catch((err) => this.error = err)
            realService.GetNumOfSubscribers(this.$route.params.username).then((num) => this.numOfSubscribers = num).catch((err) => this.error = err)
            realService.GetUser(this.$route.params.username).then((data) => { 
                this.userData = data
                realService.GetIfFollowUser(this.currentUser, this.userData.User.Name).then((data) => { this.isFollow = data}).catch((err) => this.error = err)
                this.loading = false
            }).catch((err) => this.error = err)
            firebase.getCurrentUser().then((data) => this.currentUser = data.displayName)
            
    },
    data() {
        return {
            currentUser: '',
            userData: null,
            numOfPosts: null,
            numOfFollows: null,
            numOfSubscribers: null,
            error: null,
            loading: false,
            isFollow: '',
            dialog: null
        }
    },
    methods: {
        signOut() {
        firebase
            .auth()
            .signOut()
            .then(() => {
            this.$router.replace({
                name: "Login"
            });
            });
        },
        followUser() {
            const service = new MusfindServiceReal()
            service.Follow(this.currentUser, this.userData.User.Name).then(() => {this.isFollow = 1}).catch((err) => this.error = err)
        },
        unfollowUser() {
            const service = new MusfindServiceReal()
            service.Unfollow(this.currentUser, this.userData.User.Name).then(() => {this.isFollow = 0}).catch((err) => this.error = err)
        },
        getDialog() {
            const service = new MusfindServiceReal()
            service.GetDialog(this.currentUser, this.userData.User.Name).then((data) => {
                this.dialog = data
                this.$router.push({path: '/dialog/' + this.dialog.Id + '/messages'})
            }).catch((err) => this.error = err)
        }
    }
}
</script>

<style>
    @import '../assets/css/profile.css'; 
    .about{
        margin-left: 0px;
    }
    .img-profile{
        position: relative !important;
    }
    .inf {
        padding: 0;
        margin-bottom: -10px;
        margin-top: -10px;
    }
    .subs {
        margin-top: -32px;;
    }
    #subb {
        width: auto;
        margin-left: 17px; 
        height: 38px;
    }
    .about {
        margin-bottom: 20px;
    }
    .fol {
        margin-top: -32px;
    }
    .phone-description {
        width: auto;
    }
    .more-description {
        position: absolute;
        right: 0%;
    }

</style>
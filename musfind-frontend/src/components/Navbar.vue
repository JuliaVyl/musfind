<template>
    <div>
        <!-- desktop-nav  -->
        <nav class="nav fixed-top desktop-nav">
            <div class="container-fluid">
                <div class="row justify-content-center align-items-center navbar">
                    <div class="col-lg-4 col-sm-3 brand"><h3><a class="logo">MUSFIND</a></h3></div>
                    <router-link class="nav-link" :to="{path: '/'}">Лента</router-link>
                    <router-link class="nav-link" :to="{path: '/people'}">Рекомендации</router-link>
                    <router-link class="nav-link" :to="{path: '/messages'}">Сообщения</router-link>
                    <router-link class="nav-link" :to="{path: '/search'}">Поиск</router-link>
                    <div v-if="username" class="col-lg-4 col-sm-3 profile">
                        <router-link :to="{ path: `/users/${username}` }">
                            <img v-if="userImg" class="profile-img" alt="pic" v-bind:src="`https://localhost:44380/images/${userImg}`"/>
                            <img v-else class="profile-img" alt="pic" src="https://localhost:44380/images/DefaultPhoto.png"/>
                        </router-link>
                        <router-link :to="{ path: `/users/${username}` }" class="link profile-text">
                            @{{username}}
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
        <!-- phone-nav  -->
        <nav class="nav fixed-bottom mobile-nav mobile-nav">
            <div class="container-fluid">
                <div class="row mobile-nav-row">
                    <router-link class="icon-nav" :to="{path: '/'}"><div class="posts"><i class="fa fa-home active" aria-hidden="true"></i></div></router-link>
                    <router-link class="icon-nav" :to="{path: '/people'}"><div class="friends"><i class="fa fa-users" aria-hidden="true"></i></div></router-link>
                    <router-link class="icon-nav" :to="{path: '/messages'}"><div class="dialogs"><i class="fa fa-envelope" aria-hidden="true"></i></div></router-link>
                    <router-link class="icon-nav" :to="{path: '/search'}"><div class="search"><i class="fa fa-search" aria-hidden="true"></i></div></router-link>
                    <router-link class="icon-nav" :to="{ path: `/users/${username}` }"><div class="profile-icon"><i class="fa fa-user-circle-o" aria-hidden="true"></i></div></router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from "firebase"
import MusfindServiceReal from '../services/musfindServiceReal'

export default {
  name: 'Navbar',
  mounted() {
      
    let service = new MusfindServiceReal()
    firebase.getCurrentUser().then((data) => {
        this.username = data.displayName
    })
    .then(() => {
        service.GetUser(this.username).then((data) => this.userImg = data.User.Img).catch((err) => this.error = err)
    })
  },
  data() {
      return {
          username: "",
          userImg: ""
      }
  },
}
</script>

<style>
    @import '../assets/css/main.css';
</style>
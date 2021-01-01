<template>
    <div>
        <div v-if="loading">
            <Spinner />
        </div>
        <div class="card-head" >
            <div class="row card-title">
                <div class="col">
                    <a href="#">
                        <img v-if="user.User.Img" class="profile-img" v-bind:src="`https://localhost:44380/images/${user.User.Img}`"/>
                        <img v-else src="https://localhost:44380/images/DefaultPhoto.png" class="profile-img"/>
                    </a>
                    <router-link class="link publisher" :to="{path: `/users/${user.User.Name}`}">@{{user.User.Name}}</router-link>
                </div>
                <div class="col">
                    <div class="spinner-border text-secondary delete-loading" role="status" v-if="deleteLoading===true">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <b-alert show variant="success" class="delete-post-alert" v-else-if="success===true">Пост удален</b-alert>
                    <b-dropdown class="post-more" v-else>
                        <template v-slot:button-content>Еще</template>
                        <!-- <b-dropdown-item :to="{path: '/editpost'}" v-if="$route.params.username === currentUser">Редактировать</b-dropdown-item> -->
                        <b-dropdown-item v-if="$route.params.username === currentUser" @click.prevent="deletePost()">Удалить</b-dropdown-item>
                        <!-- <b-dropdown-item @click="$bvModal.show('modal-complaint')" v-if="$route.params.username !== currentUser">Пожаловаться</b-dropdown-item> -->
                    </b-dropdown>
                </div>
            </div>
        </div>
        <div class="row no-gutters">
            <div class="col-md-4">
            <img v-if="post.Picture" v-bind:src="`https://localhost:44380/images/${post.Picture}`" class="card-img" id="post-img" alt="...">
            <img v-else src="https://localhost:44380/images/DefaultPicOfAudio.png" class="card-img" id="post-img" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{{post.Title}}</h5>
                <p class="card-text">{{post.Description}}</p>
                <router-link class="nav-link tagPost" :to="{path: '/search/results?tags=' + tag.name}" v-for="tag in PostTags" :key="tag.name"> #{{tag.name}}</router-link>
                <p class="card-text"><audio controls="controls" preload="none">
                    <source v-bind:src="`https://localhost:44380/audios/${post.Audio}`" />    
                </audio></p>
                <p class="card-text"><small class="text-muted">{{post.TimeForDisplay}}</small></p>
            </div>
            </div>
            <div class="card-foot">
                <div class="row">
                    <span class="cart-icon"><i v-if="isLike==0" class="fa fa-heart-o" aria-hidden="true"  @click.prevent="like()"></i>
                    <i v-if="isLike==1" class="fa fa-heart" aria-hidden="true" @click.prevent="unlike()"></i> {{post.likes}}</span>
                    <p class="num">{{numOfLikes}}</p>
                    <span class="cart-icon"><i class="fa fa-comment-o" aria-hidden="true"></i> {{post.comments}}</span>
                    <p class="num">{{numOfComments}}</p>
                    <span class="cart-icon favorite"><i class="fa fa-star-o" aria-hidden="true"></i></span>
                </div>   
                <div class="comments">
                    <div v-for="comment in firstcomments" :key="comment">
                        <Comment v-bind:comment="comment"/>
                    </div>
                    <div v-for="comment in comments" :key="comment">
                        <Comment v-bind:comment="comment"/>
                    </div>
                    <a v-if="open == false && numOfComments != 0" class="link comments-more" v-on:click="openMoreComments()"><small class="text-muted card-com-more">Посмотреть еще комментарии ({{numOfComments}})</small></a>
                </div>
                <div class="input-group mt-2 send-inpt-group">
                    <input v-model="inComment" type="text" class="form-control" placeholder="Комментарий" aria-label="Комментарий" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary send" type="button" id="button-addon2" v-on:click="sendComment()">Отправить</button>
                    </div>
                </div>        
            </div>
        </div>
    </div>
</template>

<script>

import MusfindServiceReal from '../services/musfindServiceReal'
import firebase from "firebase"
import Spinner from './Spinner.vue'
import Comment from './Comment.vue'

export default {
    name: 'Post',
    components: {
        Spinner,
        Comment
    },
    props: {
        post: Object
    },
    mounted() {
        let realService = new MusfindServiceReal()
        this.loading = true
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
            realService.GetIfLikePost(this.currentUser, this.post.Id).then((like) => this.isLike = like).catch((err) => this.error = err)
        })
        realService.GetNumOfLikes(this.post.Id).then((num) => {this.numOfLikes = num; this.loading = false}).catch((err) => this.error = err)
        realService.GetNumOfComments(this.post.Id).then((num) => this.numOfComments = num).catch((err) => this.error = err)
        realService.GetUser(this.post.Username).then((data) => {this.user = data; this.loading = false}).catch((err) => this.error = err)
        realService.GetPostTags(this.post.Id).then((tags) => {this.PostTags = tags; this.loading = false}).catch((err) => this.error = err)
        realService.GetPostCommentsView(this.post.Id).then((data) => this.firstcomments = data).catch((err) => this.error = err)
    },
    data() {
        return {
            numOfLikes: null,
            numOfComments: null,
            currentUser: '',
            user: null,
            success: false,
            deleteLoading: false,
            PostTags: [],
            isLike: '',
            error: null,
            loading: false,
            usersWhoLike: [],
            firstcomments: [],
            comments: [],
            inComment: '',
            open: false
        }
    },
    methods: {
        deletePost() {
            let realService = new MusfindServiceReal()
            this.deleteLoading = true
            realService.DeletePost(this.post.Id).then(() => {this.success = true; this.deleteLoading = false }).catch((err) => this.error = err)
        },
        like() {
            const service = new MusfindServiceReal()
            service.Like(this.currentUser, this.post.Id)
                .then(() => service.GetNumOfLikes(this.post.Id).then((num) => this.numOfLikes = num).then(() => this.isLike = 1).catch((err) => this.error = err))
        },
        unlike() {
            const service = new MusfindServiceReal()
            service.UnLike(this.currentUser, this.post.Id)
                .then(() => service.GetNumOfLikes(this.post.Id).then((num) => this.numOfLikes = num).then(() => this.isLike = 0).catch((err) => this.error = err))
        },
        sendComment() {
            const service = new MusfindServiceReal()
            service.CreateComment(this.currentUser, this.post.Id, this.inComment).then((data) => this.comments = data).then(() => { this.inComment = ''}).catch((err) => this.error = err)
        },
        openMoreComments() {
            const service = new MusfindServiceReal()
            service.GetPostCommentsMore(this.post.Id, 2).then((data) => this.comments = data).then(() => this.open = true).catch((err) => this.error = err)
        }
    }
}
</script>

<style>
    @import '../assets/css/main.css'; 

    .delete-post-alert {
        margin-bottom: 0 !important;
    }
    .delete-loading {
        position: absolute;
        right: 10%;
    }
    .tagPost{
        margin-left: -13px;
        display: inline-block !important;
    }
</style>
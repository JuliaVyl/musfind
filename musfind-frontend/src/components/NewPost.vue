<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="login-form">
                    <h6 class="login-title">Загрузка трека</h6>    
                    <form @submit.prevent="submit">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="image-file" accept="image/x-png,image/jpeg"/>
                            <label class="custom-file-label" for="inputGroupFile01">Фото трека (.png/.jpg)</label>
                        </div>
                        <div class="custom-file">
                            <input type="file" required class="custom-file-input" id="audio-file" accept=".mp3"/>
                            <label class="custom-file-label" for="inputGroupFile01">Аудио (.mp3)</label>
                        </div>
                        <div class="form-group">
                            <input v-model="postData.Post.Title" required name="title" class="form-control" placeholder="Название" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <input v-model="postData.Post.Description" required class="form-control" name="description" placeholder="Описание" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label>Выберите жанры своей музыки:</label>
                           <p><select id="inputState" class="form-control" v-model="postData.Tag" multiple name="tags">
                                <option v-for="tag in Tags" :key="tag.name">{{tag.name}}</option>
                               </select>
                           </p>
                            <div v-if="typeof postData.Tag[0] === 'object'" class="mt-3">Выбрано: <span v-for="tag in postData.Tag" :key="tag.name"><strong>{{ tag.name }} </strong></span></div>
                            <div v-if="typeof postData.Tag[0] === 'string'" class="mt-3">Выбрано: <span v-for="tag in postData.Tag" :key="tag"><strong>{{ tag }} </strong></span></div>
                            <div v-else></div>
                        </div>
                        <div v-if="changesLoading===true">
                            <i class="fa fa-circle-o-notch fa-spin"></i>
                        </div>
                        <b-alert show variant="success" class="alert-changes" v-if="changes===true">Трек загружен</b-alert>
                        <button class="btn btn-outline-secondary send" type="submit" id="button-addon2">Загрузить трек</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10 reg-text">
                <p class="ch-psw"><router-link :to="{path: `/users/${this.currentUser}`}" class="link after">Назад</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import MusfindServiceReal from '../services/musfindServiceReal'
import firebase from "firebase"

export default {
    name: 'NewPost',
    mounted() {
        const service = new MusfindServiceReal()
        service.GetTags().then(data => this.Tags = data)
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
            service.GetUser(this.currentUser).then((data) => this.userData = data).then(() => this.loading = false)
        })
    },
    data() {
        return {
            postData:{
                Post:{
                    Id: null,
                    Picture: null,
                    Audio: null,
                    Title: null,
                    Description: null,
                    Date: null
                },
                Tag: [],
            },
            currentUser: '',
            Tags: [],
            changes: false,
            changesLoading: false
        }
    },
    methods: {
        submit(e) {
            e.preventDefault();
            const data = new FormData(e.target);
            
            let photo = document.getElementById("image-file").files[0];
            let audio = document.getElementById("audio-file").files[0];
            
            this.changes = false
            this.changesLoading = true

            data.set('photo', photo);
            data.set('audio', audio);
            data.set('title', this.postData.Post.Title);
            data.set('description', this.postData.Post.Description);
            data.set('tags', this.postData.Tag);

            fetch(`https://localhost:44380/users/${this.currentUser}/posts`, {
                    method: 'POST',
                    body: data
                })
            .then(() => {this.changes = true; this.changesLoading = false})
        }
    }
} 
</script>

<style>
    @import '../assets/css/otherprofile.css'; 
    .changes-loading {
        margin-top: 20px;
        margin-left: 45%;
    }
    /* .edit-profile-form {
        padding-bottom: 10px;
    } */
    .alert-changes {
        margin-top: 15px;
        text-align: center;
    }
    .fa-circle-o-notch {
        font-size: 28px;
        position: relative;
        left: 45%;
        margin-bottom: 18px;
        color:#C9ACF2;
    }
</style>
<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="login-form">
                    <h6 class="login-title">Редактирование трека</h6>    
                    <form @submit.prevent="submit">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="image-file" accept="image/x-png,image/jpeg"/>
                                <label class="custom-file-label" for="inputGroupFile01">Изменить фото трека</label>
                            </div>
                        <div class="form-group">
                            <input v-model="postData.Post.Title" type="title" name="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Название">
                        </div>
                        <div class="form-group">
                            <input v-model="postData.Post.Description" class="form-control" name="description" id="exampleInputPassword1" placeholder="Описание">
                        </div>
                        <div class="form-group">
                            <label>Выберите жанры своего трека:</label>
                            <p><select v-model="postData.Tag" multiple name="tags">
                                <option v-for="tag in Tags" :key="tag.name">{{tag.name}}</option>
                                </select>
                            </p>
                            <div v-if="typeof postData.Tag[0] === 'object'" class="mt-3">Выбрано: <span v-for="tag in postData.Tag" :key="tag.name"><strong>{{ tag.name }} </strong></span></div>
                            <div v-if="typeof postData.Tag[0] === 'string'" class="mt-3">Выбрано: <span v-for="tag in postData.Tag" :key="tag"><strong>{{ tag }} </strong></span></div>
                            <div v-else></div>
                        </div>
                        <button class="btn btn-outline-secondary send" type="submit" id="changedata" v-on:click="editPost()">Изменить данные</button>
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
    name: 'EditPost',
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
            Tags: []
        }
    },
    methods: {
        submit(e) {
            e.preventDefault();
            const data = new FormData(e.target);

            data.set('title', this.postData.Post.Title);
            data.set('description', this.postData.Post.Description);
            data.set('tags', this.postData.Tag);

            fetch(`https://localhost:44380/posts/${this.currentUser}`, {
                    method: 'PUT',
                    body: data
                })
            .then(response => response.json())
        }
    }
} 
</script>

<style>
    @import '../assets/css/otherprofile.css'; 
</style>
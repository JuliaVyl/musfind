<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="login-form">
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                    <h1 class="login-title">Регистрация</h1>    
                    <form action="#" @submit.prevent="submit">
                        <div class="form-group">
                            <input type="nickname" v-model="form.name" class="form-control" id="exampleInputPassword" placeholder="Никнейм" required>
                        </div>
						<div class="form-group">
                            <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите email" required>
                        </div>
						<div class="form-group">
                            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword" placeholder="Пароль" >
						</div>
                        <div v-if="changesLoading===true">
                            <i class="fa fa-circle-o-notch fa-spin"></i>
                        </div>
                        <b-alert show variant="success" class="alert-changes" v-else-if="changes===true">Вы успешно зарегестрировались, теперь вы можете Войти</b-alert>
						<button class="btn btn-outline-secondary send" type="submit" id="button-reg">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10 reg-text">
                <p>Уже зарегистрированы? <router-link :to="{ path: `/login` }" class="link after">Войти</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import MusfindServiceReal from '../services/musfindServiceReal'

export default {
    name: 'Registration',
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: ""
            },
            error: null,
            changes: false,
            changesLoading: false
        }
    },
    methods: {
        submit() {
            this.changesLoading = true
            this.changes = false
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
                data.user
                    .updateProfile({
                        displayName: this.form.name
                    })
                    .then(() => {
                        const service = new MusfindServiceReal()
                        service.CreateUser(this.form.name)
                        this.changesLoading = false
                        this.changes = true
                    });
                })
                .catch(err => {
                this.error = err.message;
                });
            },
    } 
} 
</script>
<style>
    @import '../assets/css/login.css'; 
    .fa-circle-o-notch {
        font-size: 28px;
        position: relative;
        left: 45%;
        margin-bottom: 18px;
        color:#C9ACF2;
    }
</style>
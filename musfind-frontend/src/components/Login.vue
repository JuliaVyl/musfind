<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="login-form">
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                    <h6 class="login-title">Авторизация</h6>    
                    <form action="#" @submit.prevent="submit">
						<div class="form-group">
                            <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите ваш email">
                        </div>
						<div class="form-group">
                            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
                        </div>
                        <button class="btn btn-outline-secondary send" type="submit" id="button-addon2">Войти</button>
                        <h1></h1>
                        <div class="form-group">
                            <a href="changepassword.html" class="link after">Забыли пароль?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10 reg-text">
                <p>У вас ещё нет аккаунта? <router-link :to="{ path: `/registration` }" class="link after">Зарегистрироваться</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'Registration',
    data() {
        return {
            form: {
            email: "",
            password: "",
            currentUser: ''
        },
            error: null
        }
    },
    methods: {
        submit() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
                        this.$router.push({path: '/users/' + this.currentUser})
                    })
                })
                .catch(err => {
                    this.error = err.message;
                });
        }
    } 
} 
</script>
<style>
@import '../assets/css/login.css'; 

</style>
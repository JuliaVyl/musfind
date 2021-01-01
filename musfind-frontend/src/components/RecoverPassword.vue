<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="login-form">
                    <h1 class="login-title">Смена пароля</h1>    
                    <form>
						<div class="form-group">
						    <label for="exampleInputEmail1">Адрес электронной почты</label>
						    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите ваш email">
                            <p v-if="this.invalidEmail">Вы должны ввести в поле email</p>
						</div>
						<div class="form-group">
						    <label for="exampleInputPassword1">Новый пароль</label>
						    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
						</div>
						<div class="form-group">
						    <label for="exampleInputPassword1">Введите пароль еще раз</label>
						    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Повторный пароль">
                            <p v-if="this.wrongPassword">Пароли не совпадают</p>
						</div>
                        <button class="btn btn-outline-secondary send" type="button" id="button-addon2" v-on:click="changePassword()">Сменить пароль</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10 reg-text">
                <p><a href="login.html" class="link after">Назад</a></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecoverPaswword',
    data() {
        return {
            wrongPassword: false,
            invalidEmail: false,
            password2: null,
            user: { email: null, password: null }
        }
    },
    methods: {
        changePassword: function() {
            if (this.checkEmail() & this.checkPassword()) {
                this.user = { email: this.$refs.email.value, password: this.$refs.password.value }
            }
        },
        checkEmail() {
            if (this.$refs.email.value){
                this.invalidEmail = false
                return true
            }
            else {
                this.invalidEmail = true
                return false
            }
        },
        checkPassword() {
            if (this.$refs.password.value == this.$refs.assword2.value){
                this.wrongPassword = false
                return true
            }
            else {
                this.wrongPassword = true
                return false
            }
        }
    }
}
</script>

<style>
    @import '../assets/css/login.css'; 
</style>
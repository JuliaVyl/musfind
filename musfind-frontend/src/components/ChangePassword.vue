<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="login-form">
                    <h1 class="login-title">Смена пароля</h1>    
                    <form>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Старый пароль</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Старый пароль">
                        </div>
						<div class="form-group">
                            <label for="exampleInputPassword1">Новый пароль</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Новый пароль">
                        </div>
						<div class="form-group">
                            <label for="exampleInputPassword1">Введите пароль еще раз</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Повторите новый пароль">
                        </div>
                        <button class="btn btn-outline-secondary send" type="button" id="button-change">Сменить пароль</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10 reg-text">
                <p class="back-to-edit"><router-link class="nav-link" :to="{path: '/editprofile'}" id="edit-prof">Назад</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
        
    }
  },
  invalidName: false,
  methods: {
    checkName() {
        if (this.$refs.name.value){
            this.invalidName = false
            return true
        }
        else {
            this.invalidName = true
            return false
        }
    }
  }
}
</script>

<style>
    @import '../assets/css/search.css'; 
</style>
<template>
    <div>
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
        <div v-else class="container">
            <div class="row justify-content-md-center">
                <div class="col-lg-6 col-sm-10">
                    <div class="login-form">
                        <h6 class="login-title">Редактирование профиля</h6>    
                        <form>
                            <label>Фото профиля:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupFileAddon01">Загрузить</span>
                                </div>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="image-file" accept="image/x-png,image/jpeg"/>
                                    <label class="custom-file-label" for="inputGroupFile01">Выберете фото профиля</label>
                                </div>
                            </div>
                            <i v-if="changesLoadingImg===true" class="fa fa-circle-o-notch fa-spin"></i>
                            <b-alert show variant="success" class="alert-changes" v-if="changesImg===true">Изменения сохранены</b-alert>
                            <button class="btn btn-outline-secondary send" type="button" id="changedata" v-on:click="sendPhoto()">Cохранить изменения</button>
                            <hr/>
                        </form>
                        <form>
                            <div class="form-group">
                                <label>Выберите вид деятельности:</label>
                            <p><select id="inputState" class="form-control" v-model="userData.Status" multiple>
                                    <option v-for="status in Statuses" :key="status.name">{{status.name}}</option>
                                </select>
                            </p>
                            <div v-if="typeof userData.Status[0] === 'object'" class="mt-3">Выбрано: <span v-for="status in userData.Status" :key="status.name"><strong>{{ status.name }} </strong></span></div>
                            <div v-else-if="typeof userData.Status[0] === 'string'" class="mt-3">Выбрано: <span v-for="status in userData.Status" :key="status"><strong>{{ status }} </strong></span></div>
                            <div v-else></div>
                            </div>
                            <div class="form-group">
                                <label>Выберите жанры своей музыки:</label>
                            <p><select id="inputState" class="form-control" v-model="userData.Tag" multiple>
                                    <option v-for="tag in Tags" :key="tag.name">{{tag.name}}</option>
                                </select>
                            </p>
                            <div v-if="typeof userData.Tag[0] === 'object'" class="mt-3">Выбрано: <span v-for="tag in userData.Tag" :key="tag.name"><strong>{{ tag.name }} </strong></span></div>
                            <div v-if="typeof userData.Tag[0] === 'string'" class="mt-3">Выбрано: <span v-for="tag in userData.Tag" :key="tag"><strong>{{ tag }} </strong></span></div>
                            <div v-else></div>
                            </div>
                            <div class="form-group">
                                <label>Выберите страну:</label>
                            <p><select id="inputState" class="form-control" v-model="userData.Country.name">
                                    <option v-for="country in Countries" :key="country.name">{{country.name}}</option>
                                </select>
                            </p>
                            </div>
                            <div class="form-group">
                                <label>Выберите город:</label>
                            <p><select id="inputState" class="form-control" v-model="userData.City.name">
                                    <option v-for="city in Cities" :key="city.name">{{city.name}}</option>
                                </select>
                            </p>
                            </div>
                            <div class="form-group">
                                <label>Возраст:</label>
                                <input v-model="userData.User.Age" class="form-control" placeholder="Возраст" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label>Музыкальный опыт (лет):</label>
                                <input v-model="userData.User.Experience" class="form-control" placeholder="Опыт (лет)" autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label>О себе:</label>
                                <textarea v-model="userData.User.Info" class="form-control" id="exampleFormControlTextarea1" placeholder="О себе" rows="3" autocomplete="off"></textarea>
                            </div>
                            <div v-if="changesLoading===true">
                                <i class="fa fa-circle-o-notch fa-spin"></i>
                            </div>
                            <b-alert show variant="success" class="alert-changes" v-else-if="changes===true">Изменения сохранены</b-alert>
                            <button class="btn btn-outline-secondary send" type="button" id="changedata" v-on:click="editUser()">Cохранить изменения</button>
                            <p class="ch-psw"><router-link class="nav-link" :to="{path: '/changepassword'}" id="change-password">Сменить пароль</router-link></p>
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
    </div>
</template>

<script>
import MusfindServiceReal from '../services/musfindServiceReal'
import firebase from "firebase"
import Spinner from './Spinner.vue'

export default {
    name: 'EditProfile',
    components: {
            Spinner
    },
    mounted() {
        const service = new MusfindServiceReal()
        this.loading = true 
        service.GetStatuses().then(data => this.Statuses = data)
        service.GetTags().then(data => this.Tags = data)
        service.GetCountries().then(data => this.Countries = data)
        service.GetCities().then(data => this.Cities = data)
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
            service.GetUser(this.currentUser).then((data) => { 
                this.userData = data
                if (!this.userData.Country) this.userData.Country = { name: '' }
                if (!this.userData.City) this.userData.City = { name: '' }
            }).then(() => this.loading = false)
        })
    },
    data() {
        return {
            currentUser: '',
            userData: {
                User: {
                   Name: '',
                   Img: '',
                   Age: '',
                   Experience: '',
                   Info: '' 
                },
                Status: [],
                Tag: [],
                Country: {name: ''},
                City: {name: ''}
            },
            Statuses: [],
            Tags: [],
            Countries: [],
            Cities: [],
            error: null,
            loading: true,
            changesImg: false,
            changesLoadingImg: false,
            changes: false,
            changesLoading: false
            
            
        }
    },
    methods: {
        editUser: function() {
            const service = new MusfindServiceReal()
            this.changes = false
            this.changesLoading = true
            service.EditUser(this.currentUser, this.userData.Status, this.userData.Tag, this.userData.Country.name, this.userData.City.name, this.userData.User.Age, this.userData.User.Experience, this.userData.User.Info)
                .then(() => service.GetUser(this.currentUser).then((data) => this.userData = data)).then(() => {this.changes = true; this.changesLoading = false})
        },
        sendPhoto: function() {
            const service = new MusfindServiceReal()
            let photo = document.getElementById("image-file").files[0];
            let formData = new FormData();
            this.changesImg = false
            this.changesLoadingImg = true
            formData.append("photo", photo);
            fetch(`https://localhost:44380/users/${this.currentUser}/profileImage`, {method: "POST", body: formData})
                .then(() => service.GetUser(this.currentUser).then((data) => this.userData = data)).then(() => {this.changesImg = true; this.changesLoadingImg = false})
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
    .edit-profile-form {
        padding-bottom: 10px;
    }
    .alert-changes {
        margin-top: 15px;
        text-align: center;
        margin-bottom: 0;
    }
    .input-group {
        margin-bottom: 18px;
    }
    .fa-circle-o-notch {
        font-size: 28px;
        position: relative;
        left: 45%;
        margin-bottom: 18px;
        color:#C9ACF2;
    }
</style>
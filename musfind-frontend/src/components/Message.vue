<template>
    <div class="container-fluid message-container">
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
        <div class="row justify-content-sm-center">
            <div class="history">
                    <div class="message-header">
                        <div class="row">
                            <div class="row">
                                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                                <router-link class="nav-link back" :to="{path: '/messages'}">Назад</router-link>
                            </div>
                            <div class="row who-is-message">
                                <img v-if="anotherUserData.Img" class="profile-img" v-bind:src="`https://localhost:44380/images/${anotherUserData.Img}`"/>
                                <img v-else src="https://localhost:44380/images/DefaultPhoto.png" class="profile-img"/>
                                <router-link class="nav-link" id="dialog-user" :to="{path: `/users/${anotherUserData.Name}`}">@{{anotherUserData.Name}}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="messages-area">
                        <div v-if="messages != []">
                            <div v-for="each in messages" :key="each.id">
                                <div v-if="each.From == currentUser">
                                    <div class="my-message-area">
                                        <div class="row" id="my-message">
                                            <div class="from-me">
                                                <div class="row" id="mymessage">
                                                    <div class="my-date">
                                                        <p class="date-text"><small class="text-muted">{{each.Time}}</small></p>
                                                    </div>
                                                    <img v-if="userData.User.Img" class="profile-img" v-bind:src="`https://localhost:44380/images/${userData.User.Img}`"/>
                                                    <img v-else src="https://localhost:44380/images/DefaultPhoto.png" class="profile-img"/>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="my-text">
                                            <p>{{each.Text}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="other-message">
                                        <div class="row" id="in-message">
                                            <img v-if="anotherUserData.Img" class="profile-img" v-bind:src="`https://localhost:44380/images/${anotherUserData.Img}`"/>
                                            <img v-else src="https://localhost:44380/images/DefaultPhoto.png" class="profile-img"/>
                                            <div class="date">
                                                <p class="date-text"><small class="text-muted">{{each.Time}}</small></p>
                                            </div>
                                        </div>
                                        <div class="other-text">
                                            <p>{{each.Text}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else><p>Переписка пуста</p></div>                    
                    </div>
            </div>
            
            <div class="send-box">
                <div class="input-group mb-3">
                    <input type="text" v-model="inMessage" ref="messageField" required class="form-control" aria-describedby="basic-addon2" name="text" autocomplete="off">
                    <div class="input-group-append">
                        <!-- <button class="btn btn-outline-secondary send" type="button" id="button-addon2" v-on:click="sendMessage()">Отправить</button> -->
                        <button class="btn btn-outline-secondary send" type="button" v-on:click="sendMessage()" id="button-addon2">Отправить</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import firebase from "firebase"
import MusfindServiceReal from '../services/musfindServiceReal'
import Spinner from './Spinner.vue'

export default {
    name: 'Message',
    components: {
        Spinner
    },
    mounted() {
        console.log(this.$route.params.id)
        let realService = new MusfindServiceReal()
        this.loading = true
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
            realService.GetUser(this.currentUser).then((data) => { this.userData = data }).catch((err) => this.error = err)
            realService.GetDialogUser(this.$route.params.id, this.currentUser).then((data) => this.anotherUserData = data).catch((err) => this.error = err)
        })
        realService.GetAllMessages(this.$route.params.id).then((data) => {this.messages = data; this.loading = false}).catch((err) => this.error = err)
  },
  data() {
    return {
        userData: {},
        anotherUserData: {},
        currentUser: '',
        messages: [],
        inMessage: '',
        error: null,
        loading: false,

    }
  },
    methods: {
        // sendMessage: function(id) {
        //     this.message = [...this.message, {id: id, userId: this.myId, text: this.$refs.messageField.value, date: Date.now(), time: Date.time}]
        //     this.$refs.messageField.value = ""
        // },
        sendMessage() {
            const service = new MusfindServiceReal()
            service.CreateMessage(this.$route.params.id, this.currentUser, this.inMessage).then((data) => { this.messages = data; this.inMessage = '' }).catch((err) => this.error = err)
        },
        // submit(e) {
        //     e.preventDefault();
        //     const data = new FormData(e.target);

        //     data.set('text', data.get('text'));
        //     fetch(`https://localhost:44380/dialogs/${this.$route.params.id}/messages/${this.currentUser}`, {
        //             method: 'POST',
        //             body: data
        //         })
        //     .then(response => response.json()).then((data) => this.messages = data).catch((err) => this.error = err)
        // }
    }
}
</script>

<style>
    @import '../assets/css/message.css'; 
</style>
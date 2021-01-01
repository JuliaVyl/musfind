<template>
<!-- messages-form -->
    <div class="messages">
        <div class="row" id="message">
            <div class="col">
                <div class="row">
                    <img v-if="userData.Img" class="profile-img" v-bind:src="`https://localhost:44380/images/${userData.Img}`"/>
                    <img v-else src="https://localhost:44380/images/DefaultPhoto.png" class="profile-img"/>
                    <a class="nav-link" id="dialog-user" href="#">@{{userData.Name}}</a>
                </div>
            </div>
            <div class="col" v-if="message !== '0'">
                <p class="date-text-dialog"><small class="text-muted">{{message.Time}}</small></p>
            </div>
        </div>
        <div class="text">
            <p v-if="message != '0'">{{message.Text}}</p>
            <p class="no-messages" v-else><small>В этом диалоге пока нет сообщений</small></p>
        </div>
    </div>
</template>

<script>
import firebase from "firebase"
import MusfindServiceReal from '../services/musfindServiceReal'

export default {
    name: 'Dialog',       
    props: {
        dialog: Object
    },
    mounted() {
        let realService = new MusfindServiceReal()
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
            realService.GetDialogUser(this.dialog.Id, this.currentUser).then((data) => this.userData = data).catch((err) => this.error = err)
        })
        realService.GetLastMessageFromDialog(this.dialog.Id).then((data) => this.message = data).catch((err) => this.error = err)
  },
  data() {
    return {
        userData: [],
        message: null,
        currentUser: '',
    }
  }
}
</script>

<style>
    @import '../assets/css/messages.css'; 
    .date-text-dialog {
        text-align: right;
    }
    .no-messages {
        text-align: center;
    }
</style>
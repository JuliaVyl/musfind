<template>
<!-- messages-form -->
    <div class="container-fluid message-container">
        <div v-if="error">
            <div>Error</div>
        </div>
        <div v-if="loading">
            <Spinner />
        </div>
        <div class="row justify-content-sm-center">
            <div class="history">
                <div class="messages-header">
                    <p class="title-header">Сообщения</p>
                </div>
                <div class="messages">
                    <div v-for="dialog in dialogs" :key="dialog" class="message" v-on:click="toDialog(dialog.Id)">
                        <Dialog v-bind:dialog="dialog" v-bind:dialogs="dialogs"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase"
import MusfindServiceReal from '../services/musfindServiceReal'
import Dialog from './Dialog'
import Spinner from './Spinner.vue'

export default {
    name: 'Messages',       
    components: {
        Dialog,
        Spinner
    },
    mounted() {
        let realService = new MusfindServiceReal()
        this.loading = true
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName).then(() => {
            realService.GetAllDialogs(this.currentUser).then((data) => {this.dialogs = data; this.loading = false}).catch((err) => this.error = err)
        })
  },
  methods: {
      toDialog(id) {
          this.$router.push({path: '/dialog/' + id + '/messages'})
      }
  },
  data() {
    return {
        dialogs: [],
        currentUser: '',
        error: null,
        loading: false,
    }
  }
}
</script>

<style>
    @import '../assets/css/messages.css'; 
</style>
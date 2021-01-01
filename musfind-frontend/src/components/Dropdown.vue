<template>
    <div>
        <b-dropdown class="post-more">
            <template v-slot:button-content>Еще</template>
            <b-dropdown-item :to="{path: '/editpost'}" v-if="$route.params.username === currentUser">Редактировать</b-dropdown-item>
            <b-dropdown-item @click="$bvModal.show('modal-delete')" v-if="$route.params.username === currentUser">Удалить</b-dropdown-item>
            <b-dropdown-item @click="$bvModal.show('modal-complaint')" v-if="$route.params.username !== currentUser">Пожаловаться</b-dropdown-item>
        </b-dropdown>
        
    </div>
</template>

<script>
import firebase from "firebase"
import MusfindServiceReal from '../services/musfindServiceReal'

export default {
    name: 'EditPost',
    components: {
    },
    mounted() {
            let realService = new MusfindServiceReal()
            realService.GetUser(this.$route.params.username).then((data) => this.userData = data).catch((err) => this.error = err)
            firebase.getCurrentUser().then((data) => this.currentUser = data.displayName)
    },
    data() {
        return {
            currentUser: '',
            userData: null,
        }
    }
}
</script>

<style>
    .dropdown.b-dropdown.post-more.btn-group {
        position: absolute;
        right: 5%;
    }
    .btn.dropdown-toggle.btn-secondary {
        background-color:white;
        border-color: #C9ACF2;
        color: grey;
        margin-bottom: -10px;
    }
    .btn.dropdown-toggle.btn-secondary:active {
        background-color: #C9ACF2;
        color: white;
    }
</style>
<template>
    <div class="container-fluid">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="search-form">
                    <h6 class="login-title">Поиск музыкантов</h6>
                    <form>
                        <div class="form-group">
                            <label>Никнейм:</label>
                            <input v-model="userData.User.Name" type="text" class="form-control" placeholder="Никнейм" aria-label=Никнейм >
                        </div>
                        <div class="form-group">
                            <label>Вид деятельности:</label>
                        <p><select id="inputState" class="form-control" v-model="userData.Status" multiple name="status">
                                <option v-for="status in Statuses" :key="status.name">{{status.name}}</option>
                            </select>
                        </p>
                        <div v-if="typeof userData.Status[0] === 'object'" class="mt-3">Выбрано: <span v-for="status in userData.Status" :key="status.name"><strong>{{ status.name }} </strong></span></div>
                        <div v-else-if="typeof userData.Status[0] === 'string'" class="mt-3">Выбрано: <span v-for="status in userData.Status" :key="status"><strong>{{ status }} </strong></span></div>
                        <div v-else></div>
                        </div>
                        <div class="form-group">
                            <label>Музыкальные жанры:</label>
                        <p><select id="inputState" class="form-control" v-model="userData.Tag" name="tag" multiple>
                                <option v-for="tag in Tags" :key="tag.name">{{tag.name}}</option>
                            </select>
                        </p>
                        <div v-if="typeof userData.Tag[0] === 'object'" class="mt-3">Выбрано: <span v-for="tag in userData.Tag" :key="tag.name"><strong>{{ tag.name }} </strong></span></div>
                        <div v-if="typeof userData.Tag[0] === 'string'" class="mt-3">Выбрано: <span v-for="tag in userData.Tag" :key="tag"><strong>{{ tag }} </strong></span></div>
                        <div v-else></div>
                        </div>
                        <div class="form-group">
                            <label>Страна:</label>
                        <p><select id="inputState" class="form-control" v-model="userData.Country.name">
                                <option v-for="country in Countries" :key="country.name">{{country.name}}</option>
                            </select>
                        </p>
                        </div>
                        <div class="form-group">
                            <label>Город:</label>
                        <p><select id="inputState" class="form-control" v-model="userData.City.name">
                                <option v-for="city in Cities" :key="city.name">{{city.name}}</option>
                            </select>
                        </p>
                        </div>
                        <!-- <div class="form-group">
                            <label>Возраст:</label>
                            <select v-model="userData.User.Age" id="inputState" class="form-control">
                                <option selected>12-15</option>
                                <option>16-22</option>
                                <option>23-30</option>
                                <option>31-40</option>
                                <option>41-50</option>
                                <option>50 и выше</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Музыкальный опыт:</label>
                            <select v-model="userData.User.Experience" id="inputState" class="form-control">
                                <option selected>0-2</option>
                                <option>3-6</option>
                                <option>7-10</option>
                                <option>11 и выше</option>
                            </select>
                        </div> -->
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary send" type="button" id="button-search" v-on:click="searchUsers()">Поиск</button>
                            <!-- <router-link :to="{path: '/search/results?statuses=' + userData.Status.name + '+tags=' + userData.Tag.name + '+countries=' + userData.Country.name + '+cities=' + userData.City.name}" 
                                            class="btn btn-outline-secondary send" type="button" id="button-search">Поиск</router-link> -->
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    </div>        
</template>

<script>
import MusfindServiceReal from '../services/musfindServiceReal'
import firebase from "firebase"

export default {
  name: 'Search',
  data() {
    return {
        currentUser: '',
        invalidName: false,
        name: null,
        Statuses: [],
        Tags: [],
        Countries: [],
        Cities: [],
        userData: {
            User: {
                Name: ''
            },
            Status: [],
            Tag: [],
            Country: {name: ''},
            City: {name: ''}
        }
    }
  },
  mounted() {
        const service = new MusfindServiceReal()
        firebase.getCurrentUser().then((data) => this.currentUser = data.displayName)
        service.GetStatuses().then(data => this.Statuses = data)
        service.GetTags().then(data => this.Tags = data)
        service.GetCountries().then(data => this.Countries = data)
        service.GetCities().then(data => this.Cities = data)
  },
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
    },
    searchUsers: function() {
            this.changes = false
            this.changesLoading = true
            console.log(this.userData.User.Name)
            const usernameForForm = !this.userData.User.Name ? "" : this.userData.User.Name
            const tagsForForm = !this.userData.Tag ? "" : this.userData.Tag.join('+')
            const statusesForForm = !this.userData.Status ? "" : this.userData.Status.join('+')
            const countriesForForm = !this.userData.Country.name ? "" : this.userData.Country.name
            const citiesForForm = !this.userData.City.name ? "" : this.userData.City.name
            this.$router.push({path: '/search/results?name=' + usernameForForm + '&statuses=' + statusesForForm + '&tags=' + tagsForForm + '&countries=' 
                                + countriesForForm + '&cities=' + citiesForForm})

    }
  }
}
</script>

<style>
    @import '../assets/css/search.css'; 
</style>
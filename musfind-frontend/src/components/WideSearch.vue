<template>
    <div class="container-fluid">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-sm-10">
                <div class="search-form">
                    <h6 class="login-title">Расширенный поиск</h6>
                    <form>
                        <div class="form-group">
                            <input type="text" v-model="country" class="form-control" placeholder="Страна" aria-label=Страна aria-describedby="button-addon2">
                            <input type="text" v-model="city" class="form-control" placeholder="Город" aria-label=Город aria-describedby="button-addon2">
                            <input type="text" v-model="status" class="form-control" placeholder="Статус" aria-label=Статус aria-describedby="button-addon2">
                            <p><select size="3" multiple class="form-control">
                                <option disabled>Выберите жанр</option>
                                <option value="Чебурашка">Поп</option>
                                <option selected value="Крокодил Гена">Рок</option>
                                <option value="Шапокляк">Джаз</option>
                                <option value="Крыса Лариса">Альтернативная</option>
                               </select>
                           </p>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary send" type="button" id="button-search1" >Поиск</button>
                            </div>
                        </div>
                        <div class="row justify-content-md-center">
                            <div class="col-lg-6 col-sm-10 reg-text">
                                <p class="wide-search">Обратно к <router-link class="nav-link" :to="{path: '/search'}">простому поиску</router-link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'WideSearch',
  data() {
    return {
        country: null,
        city: null,
        status: null
    }
  },
  invalidName: false
}
</script>

<style>
    @import '../assets/css/search.css'; 
</style>
<template>
    <div class="container-fluid">
        <div class="row">
            <div v-for="list in users" :key="list.id" class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row" id="name-title">
                            <img class="profile-img friend" v-bind:src="require(`../assets/images/${list.img}`)" id="foundimg"/>
                            <h5 class="card-title">@{{list.name}}</h5>
                        </div>
                        <div class="">
                            <a class="nav-link" id="status" href="#">{{list.status}}</a>
                            <div class="row">
                                <a class="nav-link" id="tag" href="#">#{{list.tag}}</a>
                            </div>
                            <p class="card-text">{{list.info}}</p>
                            <button class="btn btn-outline-secondary send" type="button" id="button-addon2">Отправить сообщение</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FoundUsers',
  data() {
    return {
      users: [
        { id: 12, name:'nickole', img: 'profilePic3.jpg', status:'Гитарист', tag: 'рок', info: 'Ищу солиста-вокалиста' },
        { id: 23, name:'james', img: 'profilePic2.jpg', status:'Битмейкер', tag: 'хаус', info: 'Ищу того, кто сведет мою музыку'},
        { id: 67, name:'rockie', img: 'profilePic4.jpg', status:'Певец', tag: 'поп', info: 'Ищу бэк-вокалистов'},
        { id: 46, name:'lola', img: 'profilePic.jpg', status:'Пианист', tag: 'поп', info: 'Умею придумывать песни, ищу любого, кто готов к сотрудничеству'},
        { id: 78, name:'fasdh', img: 'profilePic2.jpg', status:'Гитарист', tag: 'альтернативная', info: 'Ищу соло-вокал женский'},
        { id: 26, name:'john', img: 'profilePic3.jpg', status:'Виолончелист', tag: 'классическая', info: 'Собираю группу на ютуб-канал'},
        { id: 20, name:'osanaa', img: 'profilePic4.jpg', status:'Певец', tag: 'поп', info: 'Хочу найти автора песен и музыки'}
      ]
    }
  }
}
</script>

<style>
    @import '../assets/css/users.css'; 
</style>
export default class MusfindServiceReal {
    
    sendForm(details, url, method_type) {

        var formBody = [];
        for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        return fetch(url, {
            method: method_type,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
    }

// USERS
    // создать нового пользователя
    CreateUser(username) {
        var details = {
            'name': username
        };
        return this.sendForm(details, 'https://localhost:44380/users', 'POST')
    }
    // получить данные пользователя
    GetUser(username) {
        return fetch(`https://localhost:44380/users/${username}`).then(response => response.json())
    }
    // вывести всех пользователей
    GetAllUsers() {
        return fetch(`https://localhost:44380/users`).then(response => response.json())
    }
    // вывести всех пользователей по тегу
    GetAllUsersByTag(name) {
        return fetch(`https://localhost:44380/users/tag/${name}`).then(response => response.json())
    }
    // вывести всех пользователей по статусу
    GetAllUsersByStatus(name) {
        return fetch(`https://localhost:44380/users/status/${name}`).then(response => response.json())
    }
    // вывести всех пользователей по стране
    GetAllUsersByCountry(name) {
        return fetch(`https://localhost:44380/users/country/${name}`).then(response => response.json())
    }
    // вывести всех пользователей по городу
    GetAllUsersByCity(name) {
        return fetch(`https://localhost:44380/users/city/${name}`).then(response => response.json())
    }
    // получить теги пользователя
    GetUsersTags(username) {
        return fetch(`https://localhost:44380/users/${username}/alltags`).then(response => response.json())
    }
    // получить статус пользователя
    GetUsersStatuses(username) {
        return fetch(`https://localhost:44380/users/${username}/allstatuses`).then(response => response.json())
    }
    // получить страну пользователя
    GetUserCountry(username) {
        return fetch(`https://localhost:44380/users/${username}/country`).then(response => response.json())
    }
    // получить город пользователя
    GetUsersCity(username) {
        return fetch(`https://localhost:44380/users/${username}/city`).then(response => response.json())
    }
    // редактировать свой профиль 
    EditUser(username, status = [], tag = [], country = "", city = "", age = "", exp = "", inf = "") {
        var details = {
            'status': status,
            'tag': tag,
            'country': country,
            'city': city,
            'age': age,
            'experience': exp,
            'info': inf
        };

        return this.sendForm(details, `https://localhost:44380/users/${username}`, 'PUT')
    }
    // вывести все статусы
    GetStatuses() {
        return fetch(`https://localhost:44380/statuses`).then(response => response.json())
    }
    // вывести все теги
    GetTags() {
        return fetch(`https://localhost:44380/tags`).then(response => response.json())
    }
    // вывести все страны
    GetCountries() {
        return fetch(`https://localhost:44380/countries`).then(response => response.json())
    }
    // вывести все города
    GetCities() {
        return fetch(`https://localhost:44380/cities`).then(response => response.json())
    }
    // подписаться на пользователя
    Follow(username, username2) {
        var details = {}
        return this.sendForm(details, `https://localhost:44380/users/${username}/follow/${username2}`, 'POST')
    }
    // отписаться от пользователя
    Unfollow(username, username2) {
        var details = {}
        return this.sendForm(details, `https://localhost:44380/users/${username}/unfollow/${username2}`, 'POST')
    }
    // вывести всех подписчиков
    GetAllFollowers(username) {
        return fetch(`https://localhost:44380/users/${username}/followers`).then(response => response.json())
    }
    // вывести все подписки
    GetAllUserFollows(username) {
        return fetch(`https://localhost:44380/users/${username}/follows`).then(response => response.json())
    }
    // получить количество подписчиков пользователя
    GetNumOfSubscribers(username) {
        return fetch(`https://localhost:44380/users/${username}/followers/count`).then(response => response.json())
    }
    // получить количество своих подписок 
    GetNumOfFollows(username) {
        return fetch(`https://localhost:44380/users/${username}/follows/count`).then(response => response.json())
    }
    // проверить, подписан ли ты на человека
    GetIfFollowUser(username, username2) {
        return fetch(`https://localhost:44380/users/${username}/isFollow/${username2}`).then(response => response.json())
    }
    // искать пользователей
    Search(currentU, name, tags, statuses, countries, cities) {
        var details = {
            'currentU': currentU,
            'name': name,
            'tags': tags,
            'statuses': statuses,
            'countries': countries,
            'cities': cities
        };
        return this.sendForm(details, `https://localhost:44380/users/search`, 'POST').then(response => response.json())
    }

// POSTS
    // получить количество постов пользователя
    GetNumOfPosts(username) {
        return fetch(`https://localhost:44380/users/${username}/posts/count`).then(response => response.json())
    }
    // выставить пост
    CreatePost(username) {
        var details = {
            'name': username
        };
        return this.sendForm(details, `https://localhost:44380/users/${username}/posts`, 'POST')
    }
    // получить пост по id
    GetPost(id) {
        return fetch(`https://localhost:44380/posts/${id}`).then(response => response.json())
    }
    // получить теги поста по id
    GetPostTags(id) {
        return fetch(`https://localhost:44380/posts/${id}/tags`).then(response => response.json())
    }
    // получить все посты пользователя
    GetUserPosts(username) {
        return fetch(`https://localhost:44380/users/${username}/posts`).then(response => response.json())
    }
    // получить количество лайков на посте
    GetNumOfLikes(id) {
        return fetch(`https://localhost:44380/posts/${id}/likes/count`).then(response => response.json())
    }
    // получить количество комментариев на посте
    GetNumOfComments(id) {
        return fetch(`https://localhost:44380/posts/${id}/comments/count`).then(response => response.json())
    }
    // редактировать свой пост 
    EditPost(id, tag = [], title = "", description = "", picture = "", audio = "") {
        var details = {
            'id': id,
            'tag': tag,
            'title': title,
            'description': description,
            'picture': picture,
            'audio': audio
        };

        return this.sendForm(details, `https://localhost:44380/posts/${id}`, 'PUT')
    }
    // удалить пост
    DeletePost(id) {
        return this.sendForm({}, `https://localhost:44380/posts/${id}`, 'DELETE')
    }
    // вывести ленту постов своих подписок
    GetLentaOfPosts(username) {
        return fetch(`https://localhost:44380/home/${username}`).then(response => response.json())
    }
    // проверить, лайкнут ли пост
    GetIfLikePost(username, id) {
        return fetch(`https://localhost:44380/users/${username}/posts/${id}/iflike`).then(response => response.json())
    }
    // лайкнуть пост
    Like(username, id) {
        var details = {}
        return this.sendForm(details, `https://localhost:44380/users/${username}/posts/${id}/like`, 'POST')
    }
    // убрать лайк
    UnLike(username, id) {
        var details = {}
        return this.sendForm(details, `https://localhost:44380/users/${username}/posts/${id}/unlike`, 'POST')
    }
    // вывести всех пользователей, кто лайкнул пост
    GetUsersWhoLikes(id) {
        return fetch(`https://localhost:44380/posts/${id}/likes/users`).then(response => response.json())
    }

// MESSAGES
    // создать новый диалог
    GetDialog(username, username2) {
        return this.sendForm({}, `https://localhost:44380/dialogs/${username}/${username2}`, 'POST').then(response => response.json())
    }
    // вывести все сообщения в диалоге
    GetAllMessages(id) {
        return fetch(`https://localhost:44380/dialogs/${id}/messages`).then(response => response.json())
    }
    // получить объект собеседника в диалоге
    GetDialogUser(id, name1) {
        return fetch(`https://localhost:44380/dialogs/${id}/${name1}`).then(response => response.json())
    }
    // отправить сообщение
    CreateMessage(id, username, text) {
        var details = {
            'text': text
        };
        return this.sendForm(details, `https://localhost:44380/dialogs/${id}/messages/${username}`, 'POST').then(response => response.json())
    }
    // вывести все диалоги
    GetAllDialogs(name) {
        return fetch(`https://localhost:44380/dialogs/${name}`).then(response => response.json())
    }   
    // вывести только последнее сообщение в диалоге
    GetLastMessageFromDialog(id) {
        return fetch(`https://localhost:44380/dialogs/${id}/messages/last`).then(response => response.json())
    }

// COMMESNTS
    // отправить комментарий
    CreateComment(username, id, text) {
        var details = {
            'text': text
        };
        return this.sendForm(details, `https://localhost:44380/users/${username}/posts/${id}/newcomment`, 'POST').then(response => response.json())
    }
    // вывести все комментарии поста
    GetAllComments(id) {
        return fetch(`https://localhost:44380/posts/${id}/comments`).then(response => response.json())
    }  
    // вывести первые 2 комментария поста
    GetPostCommentsView(id) {
        return fetch(`https://localhost:44380/posts/${id}/comments/view`).then(response => response.json())
    }
    // вывести еще 10 комментариев поста
    GetPostCommentsMore(id, num) {
        return fetch(`https://localhost:44380/posts/${id}/comments/more/${num}`).then(response => response.json())
    } 


}  

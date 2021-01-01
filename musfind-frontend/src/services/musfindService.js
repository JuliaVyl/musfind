import serviceData from './serviceData'

export default class MusfindService {

    data = serviceData

    getUser(username) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.data.users.ids[username] === undefined) return reject(new Error("Пользователь не найден"))
                return resolve(this.data.users.ids[username])
            }, 500)
        })
    }
    getPosts(usernameIn) {
        let posts = []
        this.data.posts.filter(({username}) => username === usernameIn).map((post) => {
            posts = posts.concat(Object.assign(
                post,
                { imgUser: this.data.users.ids[usernameIn].img }
            ))
        })
        return new Promise((resolve) => {
            setTimeout(() => {
                return resolve(posts)
            }, 500)
        })
    }
    getPostsInLenta(username) {
        let posts = []
        this.data.users.ids[username].friends.map((friendName) => {
            posts = posts.concat(Object.assign(
                    ...this.data.posts.filter(({username}) => username === friendName), 
                    { imgUser: this.data.users.ids[friendName].img }
                ) 
            )
        })
        console.log(posts[0])
        return new Promise((resolve) => {
            setTimeout(() => {
                return resolve(posts)
            }, 500)
        })
    }
    // getMessages() {

    // }

}
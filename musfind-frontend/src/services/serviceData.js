const serviceData = {
    users: {
        ids: 
        {
            "juliavyl": 
            {
                username: "juliavyl",
                numOfPosts: 5,
                numOfFriends: 20,
                numOfSubscribers: 10,
                img: 'profilePic.jpg', 
                status:'Гитарист', 
                tag: 'рок',
                country: 'Россия',
                city: 'Киров', 
                info: 'Ищу солиста-вокалиста',
                friends: ['juliavyl2', 'juliavyl3'] 
            },
            "juliavyl2":
            {
                username: "juliavyl2",
                numOfPosts: 5,
                numOfFriends: 20,
                numOfSubscribers: 10,
                img: 'profilePic2.jpg', 
                status:'Гитарист', 
                tag: 'рок', 
                country: 'Россия', 
                city: 'Киров', 
                info: 'Ищу солиста-вокалиста',
                friends: ['juliavyl', 'juliavyl3'] 
            },
            "juliavyl3":
            {
                username: "juliavyl3",
                numOfPosts: 5,
                numOfFriends: 20,
                numOfSubscribers: 100,
                img: 'profilePic3.jpg', 
                status:'Гитарист', 
                tag: 'рок', 
                country: 'Россия', 
                city: 'Киров', 
                info: 'Ищу солиста-вокалиста',
                friends: ['juliavyl2', 'juliavyl'] 
            }
        }
    },
    posts: [
        {
            id: 100,
            username: 'juliavyl',
            title: 'Название',
            description: 'ЛАЛАЛА',
            img: 'examplePic.jpg',
            audio: 'exampleAudio.mp3',
            likes: 20,
            commnets: 4
        },
        {
            id: 101,
            username: 'juliavyl',
            title: 'Ура',
            description: 'УРА',
            img: 'examplePic2.jpg',
            audio: 'exampleAudio2.mp3',
            likes: 20,
            commnets: 4
        },
        {
            id: 102,
            username: 'juliavyl',
            title: 'Хорошая песня',
            description: 'Привет',
            img: 'examplePic3.jpg',
            audio: 'exampleAudio3.mp3',
            likes: 20,
            commnets: 4
        },
        {
            id: 103,
            username: 'juliavyl3',
            title: 'Название',
            description: 'ЛАЛАЛА',
            img: 'examplePic2.jpg',
            audio: 'exampleAudio.mp3',
            likes: 20,
            commnets: 4
        },
        {
            id: 104,
            username: 'juliavyl2',
            title: 'Хорошая песня',
            description: 'ЛАЛАЛА',
            img: 'examplePic3.jpg',
            audio: 'exampleAudio2.mp3',
            likes: 20,
            commnets: 4
        }
    ],
    messages: [
        {
            idMessage: 12,
            text: 'bla bla bla bla bla',
            idDialog: 11,
            date: '12.03.2020',
            time: '20.16'
        },
        {
            idMessage: 11,
            text: 'bla bla bla bla bla bla bla bla',
            idDialog: 11,
            date: '12.03.2020',
            time: '20.17'
        },
        {
            idMessage: 13,
            text: 'bla bla bla bla bla',
            idDialog: 11,
            date: '12.03.2020',
            time: '20.18'
        },
        {
            idMessage: 10,
            text: 'bla bla bla bla bla',
            idDialog: 12,
            date: '21.03.2020',
            time: '16.52'
        },
        {
            idMessage: 9,
            text: 'bla bla bla bla bla bla',
            idDialog: 12,
            date: '21.03.2020',
            time: '17.14'
        },
        {
            idMessage: 8,
            text: 'bla bla bla bla bla bla',
            idDialog: 12,
            date: '21.03.2020',
            time: '17.16'
        }
    ],
    usersPersonalData: [
        {
            username: "juliavyl",
            email: 'julia.vyl@gmail.com',
            password: 'juliavyl123'
        },
        {
            username: "juliavyl2",
            email: 'julia2.vyl@gmail.com',
            password: 'juliavyl234'
        },
        {
            username: "juliavyl3",
            email: 'c@d.e',
            password: '345'
        }
    ],
    dialogs: [
        {
            idDialog: 11,
            username: "juliavyl",
            usernameDialogWith: "juliavyl2"
        },
        {
            idDialog: 12,
            username: "juliavyl",
            usernameDialogWith: "juliavyl3"
        }
    ]
}

export default serviceData
import Vue from 'vue'
import Router from 'vue-router'
import postsLenta from '../components/PostsLenta.vue'
import messages from '../components/Messages.vue'
import message from '../components/Message.vue'
import people from '../components/People.vue'
import profile from '../components/Profile.vue'
import registration from '../components/Registration.vue'
import foundusers from '../components/FoundUsers.vue'
import login from '../components/Login.vue'
import search from '../components/Search.vue'
import widesearch from '../components/WideSearch.vue'
import changepassword from '../components/ChangePassword.vue'
import begin from '../components/Begin.vue'
import edit from '../components/EditProfile.vue'
import post from '../components/NewPost.vue'
import editpost from '../components/EditPost.vue'
import followers from '../components/Followers.vue'
import follows from '../components/Follows.vue'
import searchpeople from '../components/SearchPeople.vue'
import userslikes from '../components/UsersWhoLike.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'PostsLenta',
            component: postsLenta,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/messages',
            name: 'Messages',
            component: messages,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/dialog/:id/messages',
            name: 'Message',
            component: message,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/people',
            name: 'People',
            component: people,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users/:username',
            name: 'Profile',
            component: profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/registration',
            name: 'Registration',
            component: registration
        },
        {
            path: '/results',
            name: 'FoundUsers',
            component: foundusers,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: login
        },
        {
            path: '/search',
            name: 'Search',
            component: search,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/search/results',
            name: 'SearchPeople',
            component: searchpeople,
            meta: {
                requiresAuth: true
            }, 
            props: (route) => ({ name: route.query.name, tags: route.query.tags, statuses: route.query.statuses, countries: route.query.countries, cities: route.query.cities})
        },
        {
            path: '/widesearch',
            name: 'WideSearch',
            component: widesearch,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/changepassword',
            name: 'ChangePassword',
            component: changepassword,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/musfind',
            name: 'Begin',
            component: begin
        },
        {
            path: '/editprofile',
            name: 'EditProfile',
            component: edit,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/addpost',
            name: 'NewPost',
            component: post,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/editpost',
            name: 'EditPost',
            component: editpost,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users/:username/followers',
            name: 'followers',
            component: followers,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users/:username/follows',
            name: 'follows',
            component: follows,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/posts/:id/likes/users',
            name: 'userslikes',
            component: userslikes,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

import firebase from "firebase";

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !await firebase.getCurrentUser()){
        next('login');
      }else{
        next();
    return next()}}
)


export default router
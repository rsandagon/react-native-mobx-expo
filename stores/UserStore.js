import {action, observable} from 'mobx'

export default class UserStore{
    @observable 
    name = null

    @observable 
    id = null

    @observable
    isLogin = false

    @action('logs in user')
    logInUser(profile){
        this.name = profile.name
        this.id = profile.id
        this.isLogin = true
    }

    @action('logs out user')
    logOutUser(){
        this.name = null
        this.id = null
        this.isLogin = false
    }
}
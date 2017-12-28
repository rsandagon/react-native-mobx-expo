import {action, observable} from 'mobx'

export default class AppStore{
    static LOG_IN = 'LOG_IN'
    static SEARCH_MAP = 'SEARCH_MAP'

    @observable 
    appState = AppStore.LOG_IN

    @action('sets app state')
    setAppState(newValue){
        this.appState = newValue
    }

}
import Vue  from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stories:"",
        loginID: 0,
        check:0,
        checkid:0,
        show:true
    },
    mutations: {
        changeState (state,json) {
            console.log(json)
            for(var name in json){
                state[name] = json[name];
            }
        }
    }
})

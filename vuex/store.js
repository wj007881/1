import Vue  from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stories:"",
        loginID: "",
        check:0,
        checkid:0,
        funs:"",
        newes:"",
        video:"",
        user1:"",
        saveid:"",
        boxs:""
    },
    mutations: {
        changeState (state,json) {
            console.log(json);
            for(var name in json){
                state[name] = json[name];
            }
        }
    }
})

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        totalList:[],
        categorylist:[],
        intentlist:[],
        sentencelist:[],
    },
    getters: {
        getIntentlist(state) {
            var intentlist = new Array();
            for(var i = 0; i <state.totalList.length; i++){
                intentlist.push(state.totalList[i].intent);
            }
            state.listIntent = Array.from(new Set(intentlist));
            return state.listIntent;
        },
        getCategorylist(state){
            var categorylist = new Array();
            for(var i = 0; i <state.totalList.length; i++){
                categorylist.push(state.totalList[i].카테고리);
            }
            state.listCategory = Array.from(new Set(categorylist));
            return state.listCategory;
        },
        getSentencelist(state){
            var sentencelist = new Array();
            for(var i = 0; i < state.totalList.length; i++){
                sentencelist.push(state.totalList[i].문장.split(' '));
            }
            state.listWord = [].concat.apply([], sentencelist);
            state.listWord = Array.from(new Set(this.listWord));
            return state.listWord;
        }
      },
    mutations: { 
        chngTotalList (state, chngVal) {  
            state.totalList = chngVal;
        },
        chngListIntent (state, intent) {
            state.listIntent = intent;
        },
        chngListCategory (state, category) {
            state.listCategory = category;
        },
        chngListSentence (state, word){
            state.listWord = word;
        }
    }
});
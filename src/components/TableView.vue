<!-- ManagerTableVIew.vue
테이블 리스트
1. 날짜
- YYYY-MM-DD 형태의 날짜 데이터
2. QA번호
- 대화 ID
- 대화는 여러개의 질문과 답변으로 구성되어 있고, 하나의 대화에 속하는 문장에는 동일한 대화 ID를 부여한다.
3. 대화순번
- 하나의 대화에서 문장이 등장하는 순서를 표기
4. 화자
- 각 문장의 발화자 (C: 고객, S: 발화자)
날짜,QA번호,대화순번,화자,QA여부,문장,카테고리,상담번호,상담내순번,intent,entity_1,entity_2,emotion_tagging
//date, QA_num, d_seq, speaker, qa, sentence, category, c_num, c_seq, intent, entity_1, entity_2, emotion_tagging
-->

<template>
    <div>
        <div style="marginRight:10px; marginLeft:10px; marginTop:10px">
            <!--Section: Table-->
            <section class="mb-5">
                <!--Top Table UI-->
                <div class="card p-2 mb-5">
                    <!--Grid row-->
                    <div class="row" style="vertical-align:middle;">
                        <div class="parent ml-2 p-1">
                            <div class="first"><input type="checkbox" v-model="toggleSpeaker1" true-value="c" false-value=""> 고객</div>
                            <div class="second"><input type="checkbox" v-model="toggleSpeaker2" true-value="s" false-value=""> 점원</div>
                        </div>

                        <div class="parent ml-2 p-1">
                            <div class="first"><input type="checkbox" v-model="toggleQ" true-value="Q" false-value=""> Q</div>
                            <div class="second"><input type="checkbox" v-model="toggleA" true-value="A" false-value=""> A</div>
                        </div>

                        <span style="display:inline-block; width:  40px;"></span>
                        
                        
                        <multiselect style="max-width:250px;" v-model="pickCategory" placeholder="Category" :options="listCategory" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                        <span style="display:inline-block; width: 20px;"></span>
                        <multiselect style="max-width:250px;" v-model="pickIntent" placeholder="Intent" :options="listIntent" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                    
                        <span style="display:inline-block; width: 20px;"></span>

                        <div class="parent ml-2 p-1">
                            <div class="first"><input type="checkbox" v-model="toggleSen" true-value="sen" false-value=""> 문장내 검색</div>
                            <div class="second"><input type="checkbox" v-model="toggleEnt" true-value="ent" false-value=""> Entity 검색</div>
                        </div>

                        <span style="display:inline-block; width: 80px;"></span>
                        <div class="mt-2 ml-2">
                            <input type="checkbox" v-model="toggleSimilar" true-value="similar_yes" false-value="">
                                유사 키워드 검색
                        </div>
                        
                        <div style="float:right;">
                            <div class="form-inline ml-2">
                                <input class="form-control" type="text" v-model = "wordValue" placeholder="Search" v-on:keyup.enter = "search()" style="max-width: 300px;">
                                <button class="btn btn-outline-primary" style="margin-left : 4px;" @click="search()"><img src="../assets/search.png"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div style="float:right; margin-bottom:10px; margin-right:10px;">
            <button v-if = "buttonEdit == true" id="contentEdit" class="btn btn-outline-primary" type="button" @click="editCell()">Edit</button>
            <button v-else id="contentEdit" class="btn btn-outline-primary" type="button"  @click="finishEdit()">finishEdit</button>
        </div>

        
        <div style="marginRight:10px; marginLeft:10px"> 
            <table class="table table-striped table-bordered table-sm">
                <colgroup>
                    <col width="6%"/>
                    <col width="3%"/>
                    <col width="3%"/>
                    <col width="3%"/>
                    <col width="3%"/>
                    <col width="21%"/>
                    <col width="11%"/>
                    <col width="3%"/>
                    <col width="4%"/>
                    <col width="7%"/>
                    <col width="10%"/>
                    <col width="12%"/>
                    <col width="5%"/>
                </colgroup>
                <thead class="thead-dark">
                    <tr>
                        <th>날짜</th>
                        <th>QA번호</th>
                        <th>대화순번</th>
                        <th>화자</th>
                        <th>QA여부</th>
                        <th>문장</th>
                        <th>카테고리</th>
                        <th>상담번호</th>
                        <th>상담내순번</th>
                        <th>intent</th>
                        <th>entity_1</th>
                        <th>entity_2</th>
                        <th>emotion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(datalist, idx) in paginatedData" :key="idx">
                        <td>{{datalist.날짜}}</td>
                        <td>{{datalist.QA번호}}</td>
                        <td>{{datalist.대화순번}}</td>
                        <td>{{datalist.화자}}</td>
                        <td>{{datalist.QA여부}}</td>
                        <td>
                            <div class="td" v-if="buttonEdit">{{datalist.문장}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.문장">
                            </div>
                        </td>
                        <td>
                            <div v-if="buttonEdit">{{datalist.카테고리}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.카테고리">
                            </div>
                        </td>
                        <td>{{datalist.상담번호}}</td>
                        <td>{{datalist.상담내순번}}</td>
                        <td>
                            <div v-if="buttonEdit">{{datalist.intent}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.intent">
                            </div>
                        </td>
                        <td>
                            <div v-if="buttonEdit">{{datalist.entity_1}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.entity_1">
                            </div>
                        </td>
                        <td>
                            <div v-if="buttonEdit">{{datalist.entity_2}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.entity_2">
                            </div>
                        </td>
                        <td>{{datalist.emotion_tagging}}</td>
                    </tr>
                </tbody>
            </table>

            <div class='tableBtn'>
                <b-button :disabled="pageNum == 0" @click="prevPage" pill variant="outline-secondary">이전</b-button>
                <b-button variant="light" @click="goPage(pageNum)">{{ pageNum + 1 }}</b-button>
                <b-button :disabled="pageNum >= pageCount -1" @click="nextPage" pill variant="outline-secondary">다음</b-button>
                <span style="display:inline-block; width: 100px;"></span>
                <span class="page-count">{{pageNum + 1}} / {{pageCount}} 페이지 </span>
            </div>
        </div>

        <modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">경고</h3>
            <span slot="body">{{ showMessage }}</span>
            <button slot="footer" @click="showModal = false">닫기</button>
        </modal>
    </div>
</template>


<script>
import Vue from 'vue';

import Multiselect from 'vue-multiselect';
Vue.component('multiselect', Multiselect);

import Loading from 'vue-loading-overlay';
Vue.component('loading', Loading);

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import { store } from "@/util/store";
import Modal from './Modal';


export default {
    store: store,
    components:{
        Modal : Modal
    },
    props: {
        totalList: {
            type: Array,
            default: () => {
                return [];
            }
        },
    },
    data(){
        return {
            pageNum:0,
            pageSize:20,
            currentPage:1,

            isLoading:false,
            
            datatable: [],
            buttonEdit:true,
            categoryValue: '',
            intentValue: '',
            wordValue:'',
            toggleSimilar: '',
            toggleSpeaker1:'',
            toggleSpeaker2:'',
            toggleQ:'',
            toggleA:'',
            toggleSen:'',
            toggleEnt:'',

            listIntent:[],
            listCategory:[],
            listWord:[],
            listEntity:[],
            
            similarword:'',

            pickCategory: [],
            pickIntent:[],

            showModal: false,
            showMessage: '',

        };
    },
    created(){
        console.log('데이터 받아왔어요');
        this.totalList = this.$store.state.totalList;
        console.log(this.totalList);
        this.datatable = this.totalList;
    },
    watch: {
        totalList: function (val) {
            this.datatable = val;
            this.getIntentlist();
            this.getCategorylist();
            this.getWordlist();
            this.setStore();
        },
    },
    computed: {
        pageCount: function(){
            let length = this.datatable.length,
                listSize = this.pageSize,
                page = Math.floor(length / listSize);
            if(length % listSize > 0)
                page += 1;
            return page;
        },
        paginatedData: function(){
            const start =  this.pageNum * this.pageSize,
            end = start + this.pageSize;
            return this.datatable.slice(start, end);
        }
    },
    methods: {
        finishLoading(){
            this.isLoading = false
        },
        getIntentlist(){
            this.listIntent = this.$store.getters.getIntentlist;
        },
        getCategorylist(){
            this.listCategory = this.$store.getters.getCategorylist;
        },
        getWordlist(){
            this.listWord = this.$store.getters.getSentencelist;
            // console.log("문장 전체 리스트에서 단어");
            // var wordlist = new Array();
            // for(var i = 0; i < this.datatable.length; i++){
            //     var sentence = this.datatable[i].문장.split(' ');
            //     wordlist.push(sentence);
            // }
            // this.listWord = [].concat.apply([], wordlist);
            // this.listWord = Array.from(new Set(this.listWord));

            // return this.listWord;
        },
        getEntitylist(){
            var entitylist = new Array();
            for(var i = 0; i < this.datatable.length; i++){
                var entity1 = this.datatable[i].entity_1.split(': ');
                // var regExp = /[~!@:#$%<>^&*()\-=+_’]/gi;
                // if(regExp.test(entity1)){
                //     entity1 = entity1.replace(regExp, ""); // 찾은 특수 문자를 제거
                // }
                entitylist.push(entity1);
            }
            this.listEntity = [].concat.apply([], entitylist);
            this.listEntity = Array.from(new Set(this.listEntity));

            console.log(this.listEntity);
            return this.listEntity;
        },
        search() {
            if(this.toggleSimilar != ''){
                this.showMessage = '유사도 검색은 아직 지원하지 않는 기능입니다';
                this.showModal = !this.showModal;
            }
            
            this.datatable = this.totalList;
            //1. 고객, 점원에 맞는 데이터 필터링
            this.datatable = this.datatable.filter((value) =>{
                if(this.toggleSpeaker1 !== '' && this.toggleSpeaker2 === ''){
                    if(value.화자 == this.toggleSpeaker1){
                        return value;
                    }
                }else if(this.toggleSpeaker1 == '' && this.toggleSpeaker2 !== ''){
                    if(value.화자 == this.toggleSpeaker2){
                        return value;
                    }
                }else{
                    return value;
                }
            }, this);
            //2. 카테고리 intent 에 맞는 데이터 필터링
            this.datatable = this.datatable.filter((value) => {

                var pickC = this.pickCategory.length;
                var pickI = this.pickIntent.length;
                
                // 카테고리, intent 모두 되어있을 시
                if(pickC !== 0 && pickI !== 0){
                    for(var a = 0; a < pickC ; a++){
                        for (var b= 0; b < pickI; b++){
                            if (value.intent == this.pickIntent[b] && value.카테고리 == this.pickCategory[a]) {
                                return value;
                            }
                        }
                    }
                }else if(pickC !== 0 && pickI == 0){
                    for (var i = 0; i < pickC; i++){
                        if(value.카테고리 == this.pickCategory[i]){
                            return value;
                        }
                    }
                }else if(pickC == 0 && pickI !== 0){
                    for(var j = 0; j < pickI ; j++){
                        if(value.intent == this.pickIntent[j]){
                            return value;
                        }
                    }
                }else{
                    return value;
                }
            }, this);
            //3. QA 별 문장 검출
            this.datatable = this.datatable.filter((value) =>{
                if(this.toggleQ !== '' && this.toggleA === ''){
                    if(value.QA여부 == this.toggleQ){
                        return value;
                    }
                }else if(this.toggleQ == '' && this.toggleA !== ''){
                    if(value.QA여부 == this.toggleA){
                        return value;
                    }
                }else{
                    return value;
                }
            }, this);

            // 4. 검색어 속한 문장 검출
            if(this.wordValue !== ''){
                console.log(this.datatable);
                this.datatable = this.datatable.filter((value) => {
                    //문장 내 검색
                    if(this.toggleSen !== ''){
                        console.log(this.listWord);

                        // // 유사어 찾기가 체크되어있을시!
                        // if(this.toggleSimilar !== ''){
                        //     this.isLoading = true;
                        //     if(value.문장.includes(this.getSimiliarWord()) || value.문장.includes(this.wordValue)){
                        //         return value;
                        //     }
                        // }else{
                        //     if(value.문장.includes(this.wordValue)){
                        //         return value;
                        //     }
                        // }

                        if(value.문장.includes(this.wordValue)){
                                return value;
                        }
                    }
                    
                    //entity 내 검색
                    if(this.toggleEnt !== ''){
                        // if(this.toggleSimilar !== ''){
                        //     if(value.entity_1.includes(this.getSimiliarEntity()) || value.entity_1.includes(this.wordValue)){
                        //         return value;
                        //     }
                        // }else{
                        //     if(value.entity_1.includes(this.wordValue)){
                        //         return value;
                        //     }
                        // }

                        if(value.문장.includes(this.wordValue)){
                                return value;
                        }
                    }
                    
                }, this);
            }
            this.pageNum = 0;

            this.finishLoading();
        },
        //유의어 검색 - 문장
        getSimiliarWord(){
            console.log("유의어 찾기!")
            let similarAlgorithm = function(a, b) {
                let count = 0
                for(let i = 0 ; i < a.length - 1 ; i++) {
                    count = b.includes(a.substr(i, 2)) ? ++count : count
                }
                return count
            }
            this.listWord = this.getWordlist();
            var distance = 0;
            for (var w = 0; w < this.listWord.length -1; w++){
                if(distance < similarAlgorithm(this.wordValue, this.listWord[w])){
                    distance = similarAlgorithm(this.wordValue, this.listWord[w]);
                    this.similarword = this.listWord[w];
                }
            }
            return this.similarword;
        },

        //유의어 검색 - entity
        getSimiliarEntity(){
            console.log("유의어 찾기!")
            let similarAlgorithm = function(a, b) {
                let count = 0
                for(let i = 0 ; i < a.length - 1 ; i++) {
                    count = b.includes(a.substr(i, 2)) ? ++count : count
                }
                return count
            }
            this.listEntity = this.getEntitylist();
            console.log(this.listEntity);
            var distance = 0;
            for (var w = 0; w < this.listEntity.length -1; w++){
                if(distance < similarAlgorithm(this.wordValue, this.listEntity[w])){
                    distance = similarAlgorithm(this.wordValue, this.listEntity[w]);
                    this.similarword = this.listEntity[w];
                }
            }
            return this.similarword;
        },
        
        //수정하기
        editCell(){
            console.log("수정할래요");
            this.buttonEdit = false;
        },
        //수정 끝내기
        finishEdit(){
            console.log("수정 완료");
            this.totalList = this.datatable;
            this.$emit('update:datatable', this.totalList);
            this.buttonEdit = true;
        },
        nextPage(){
            this.pageNum += 1;
        },
        prevPage(){
            this.pageNum -= 1;
        },
        goPage(num){
            this.pageNum = num;
        },
        //저장소에 데이터 넘기기
        setStore(){
            this.$store.commit('chngTotalList', this.totalList);
            this.$store.state.categorylist = this.listCategory;
            this.$store.state.intentlist = this.listIntent;
        },


        addTag (newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="vue-loading-overlay/dist/vue-loading.css"></style>

<style scoped>
table {
    table-layout: fixed
}
th{
    font-size:10px;
    text-align: center;
    font-weight: bold;
}
td {
  font-size: 12px;
  word-wrap: normal;
}

.tableBtn{
    text-align: center
}

.tableBtn .active{
    background-color: rgb(170, 170, 170);
    color: white;
    font-weight: bold;

}


a.first::after {
  content:'...'
}

a.last::before {
  content:'...'
}


</style>
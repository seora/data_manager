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
        <div style="marginRight:10px; marginLeft:10px">
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

                        <!--Grid column-->
                        <div class="col-md-2">
                            <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" v-model="categoryValue">
                                <option value="">카테고리별</option>
                                <option v-for="idx in listCategory.length" :key="idx" :value="listCategory[idx-1]">{{ listCategory[idx-1] }}</option>
                            </select>
                        </div>

                        <div class="col-md-2">
                            <!--Blue select-->
                            <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" v-model="intentValue">
                                <option value="" >Intent별</option>
                                <option v-for="idx in listIntent.length" :key="idx" :value="listIntent[idx-1]">{{ listIntent[idx-1] }}</option>
                            </select>
                            <!--/Blue select-->
                        </div>

                        <div class="parent ml-2 p-1">
                            <div class="first"><input type="checkbox" v-model="toggleQ" true-value="Q" false-value=""> Q</div>
                            <div class="second"><input type="checkbox" v-model="toggleA" true-value="A" false-value=""> A</div>
                        </div>
                        
                        <div class="mt-2 ml-2">
                            <input type="checkbox" v-model="toggleSimilar" true-value="similar_yes" false-value="">
                                유사 키워드 검색
                        </div>
                        
                        <div style="float:right;">
                            <div class="form-inline ml-2">
                                <input class="form-control" type="text" v-model = "wordValue" placeholder="Search" v-on:keyup.enter = "search()" style="max-width: 200px;">
                                <button class="btn btn-outline-primary" style="margin-left : 4px;" @click="search()"><img src="../assets/search.png"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div class="form-inline ml-2" style="float:right;">
            <button v-if = "buttonEdit == true" id="contentEdit" class="btn btn-outline-primary" style="margin-bottom:10px; margin-right:10px;" type="button" @click="editCell()">Edit</button>
            <button v-else id="contentEdit" class="btn btn-outline-primary" style="margin-bottom:10px; margin-right:10px;" type="button" @click="finishEdit()">finishEdit</button>
            <button class="btn btn-outline-danger" style="margin-bottom:10px; margin-right:10px;" type="button">Delete</button>
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
                    <col width="3%"/>
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
                    <tr v-for="(datalist, idx) in datatable" :key="idx">
                        <td>{{datalist.날짜}}</td>
                        <td>{{datalist.QA번호}}</td>
                        <td>{{datalist.대화순번}}</td>
                        <td>{{datalist.화자}}</td>
                        <td>{{datalist.QA여부}}</td>
                        <td>
                            <div v-if="buttonEdit">{{datalist.문장}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.문장">
                            </div>
                        </td>
                        <td>
                            <div v-if="buttonEdit">{{datalist.카테고리}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.카테고리">

                                <!-- <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" v-model="datalist.카테고리">
                                    <option v-for="idx in listCategory.length" :key="idx" :value="listCategory[idx-1]">{{ listCategory[idx-1] }}</option>
                                </select> -->
                            </div>
                        </td>
                        <td>{{datalist.상담번호}}</td>
                        <td>{{datalist.상담내순번}}</td>
                        <td>
                            <div v-if="buttonEdit">{{datalist.intent}}</div>
                            <div v-else>
                                <input style="width:100%;" v-model="datalist.intent">

                                <!-- <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" v-model="datalist.intent">
                                    <option v-for="idx in listIntent.length" :key="idx" :value="listIntent[idx-1]">{{ listIntent[idx-1] }}</option>
                                </select> -->
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
                        <td>{{datalist.emotion}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script src="js/jquery-3.1.1.js"></script>

<script>
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import Vue, { Component } from 'vue';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import { mdbDatatable } from 'mdbvue';
Vue.use(VueGoodTable);

var Hangul = require('hangul-js');

export default {
    components:{
        VueGoodTable,
        mdbDatatable,
    },
    props: {
        totalList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data(){
        return {
            
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

            listIntent:[],
            listCategory:[],

            listWord:[],
            similarword:'',

            perPage: 10,
            currentPage: 1,

        };
    },
    created(){
        this.datatable = this.totalList;
    },
    watch: {
        totalList: function (val) {
            this.datatable = val;
            this.getIntentlist();
            this.getCategorylist();
            this.getWordlist();
        },
    },
    computed: {
        rows() {
            return this.totalList.length
        }
    },
    methods: {
        getIntentlist(){
            console.log("여기 intentlist 가져올래!");
            var intentlist = new Array();
            for(var i = 0; i <this.datatable.length; i++){
                intentlist.push(this.datatable[i].intent);
            }
            this.listIntent = Array.from(new Set(intentlist));
            console.log(this.listIntent);
            return this.listIntent;
        },
        getCategorylist(){
            console.log("여기 category 가져올래!");
            var categorylist = new Array();
            for(var i = 0; i <this.datatable.length; i++){
                categorylist.push(this.datatable[i].카테고리);
            }
            this.listCategory = Array.from(new Set(categorylist));
            console.log(this.listCategory);
            return this.listCategory;
        },
        getWordlist(){
            console.log("문장 전체 리스트에서 단어");
            var wordlist = new Array();
            for(var i = 0; i < this.datatable.length; i++){
                var sentence = this.datatable[i].문장.split(' ');
                wordlist.push(sentence);
            }
            this.listWord = [].concat.apply([], wordlist);
            this.listWord = Array.from(new Set(this.listWord));

            console.log(this.listWord);
            return this.listWord;
        },
        search() {
            this.datatable = this.totalList;

            //1. 고객, 점원에 맞는 데이터 필터링
            this.datatable = this.datatable.filter((value, idx) =>{
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
            this.datatable = this.datatable.filter((value, idx) => {

                if (this.categoryValue === '' && this.intentValue === '') {
                    return value;
                } else if (this.categoryValue === '' && this.intentValue !== '') {
                    if (value.intent == this.intentValue) {
                        return value;
                    }
                } else if (this.categoryValue !== '' && this.intentValue === '') {
                    if (value.카테고리 == this.categoryValue) {
                        return value;
                    }
                } else {
                    if (value.intent == this.intentValue && value.카테고리 == this.categoryValue) {
                        return value;
                    }
                }
            }, this);


            // 3. 검색어 속한 문장 검출
            console.log(this.datatable);
            this.datatable = this.datatable.filter((value, idx) => {

                // 유사어 찾기가 체크되어있을시!
                if(this.toggleSimilar !== ''){
                    if(value.문장.includes(this.getSimiliarWord()) || value.문장.includes(this.wordValue)){
                        return value;
                    }
                }else{
                    if(value.문장.includes(this.wordValue)){
                        return value;
                    }
                }
                
            }, this);

        },
        getSimiliarWord(){
            console.log("유의어 찾기!")
            let similarAlgorithm = function(a, b) {
                var searcher = new Hangul.Searcher(a);
                searcher.search(b);
                return searcher
            }

            var distance = 0;
            for (var w = 0; w < this.listWord.length -1; w++){
                if(distance < similarAlgorithm(this.wordValue, this.listWord[w])){
                    distance = similarAlgorithm(this.wordValue, this.listWord[w]);
                    this.similarword = this.listWord[w];
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
        }

    }

}
</script>

<style scoped>
table {
    table-layout: fixed

}
th{
    font-size:10px;
}
td {
  font-size: 12px;
  text-overflow:ellipsis; overflow:hidden; white-space:nowrap;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>
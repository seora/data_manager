<template>
    <div class="tagging_layout">
        <b-card bg-variant="Light" title="Tagging">
            <b-input-group prepend="태그할 단어와 태그명을 입력하세요" class="mb-2">
                <input class="form-control" type="text" v-model = "word" placeholder="단어">
                <input class="form-control" type="text" v-model = "tag1" placeholder="Entity_1 Tag">
                <input class="form-control" type="text" v-model = "tag2" placeholder="Entity_2 Tag" v-on:keyup.enter = "setTag()">
                                
                <span style="display:inline-block; width:  40px;"></span>
                <b-button variant="primary" @click="setTag()">Matching</b-button>
            </b-input-group>
        </b-card>
        <br><br>
        <div class="card p-2 mb-5">
                    <!--Grid row-->
            <div class="row" style="vertical-align:middle;">
                <multiselect style="max-width:300px; margin-left : 10px;" v-model="pickCategory" placeholder="Category" :options="listCategory" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                <span style="display:inline-block; width: 20px;"></span>
                <multiselect style="max-width:300px;" v-model="pickIntent" placeholder="Intent" :options="listIntent" :multiple="true" :taggable="true" @tag="addTag"></multiselect>

                <div style="float:right;">
                    <button class="btn btn-outline-primary" style="margin-left : 4px;" @click="search()"><img src="../assets/search.png"></button>
                </div>
            </div>
        </div>

        <div>
            <table class="table table-striped table-bordered table-sm">
                <thead class="thead-primary">
                    <tr>
                        <th>카테고리</th>
                        <th>intent</th>
                        <th>문장</th>
                        <th>entity_1</th>
                        <th>entity_2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(datalist, idx) in paginatedData" :key="idx">
                        <td>{{datalist.카테고리}}</td>
                        <td>{{datalist.intent}}</td>
                        <td>{{datalist.문장}}</td>
                        <td>{{datalist.entity_1}}</td>
                        <td>{{datalist.entity_2}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_cover" style="text-align: center">
                <b-button :disabled="pageNum == 0" @click="prevPage" pill variant="outline-secondary">이전</b-button>
                <span class="page-count">{{pageNum + 1}} / {{pageCount}} 페이지 </span>
                <b-button :disabled="pageNum >= pageCount -1" @click="nextPage" pill variant="outline-secondary">다음</b-button>
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
import { store } from "@/util/store";
import Modal from './Modal';

import Multiselect from 'vue-multiselect';
Vue.component('multiselect', Multiselect);

export default {
    store: store,
    components:{
        Modal : Modal
    },
    data(){
        return{
            total:[],
            data:[],
            
            word:'',
            tag1:'',
            tag2:'',

            pageNum:0,
            pageSize:10,

            showModal: false,
            showMessage: '',

            listIntent:[],
            listCategory:[],
            pickCategory: [],
            pickIntent:[],
        }
    },
    created(){
        this.total = this.$store.state.totalList;
        this.data = this.total;
        this.listIntent = this.$store.getters.getIntentlist;
        this.listCategory = this.$store.getters.getCategorylist;
    },
    watched:{
        total: function (val) {
            this.data = val;
        },
    },    
    computed: {
        pageCount(){
            let length = this.data.length,
                listSize = this.pageSize,
                page = Math.floor(length / listSize);
            if(length % listSize > 0)
                page += 1;
            return page;
        },
        paginatedData(){
            const start =  this.pageNum * this.pageSize,
            end = start + this.pageSize;
            return this.data.slice(start, end);
        }
    },
    methods:{
        setTag(){
            var entity1 = this.tag1 + ": " + this.word;
            var entity2 = "<" + this.word+":" + this.tag2 + ">";

            var count = 0;

            if (this.word !== '' && this.tag !== ''){
                for(var i = 0; i < this.data.length; i++){
                    if(this.data[i].문장.includes(this.word)){
                        if(this.data[i].entity_1.includes(this.word)){
                            
                            //이미 태깅되어 있는 것은 수정할 것!

                            var tag1toedit = this.editTag1(this.data[i].entity_1, this.tag1, this.word);
                            console.log(tag1toedit);
                            this.data[i].entity_1 = tag1toedit;

                            var tag2toedit = this.editTag2(this.data[i].entity_2, this.tag2, this.word);
                            console.log(tag2toedit);
                            this.data[i].entity_2 = tag2toedit;

                        }else{
                            //태깅 추가

                            //다른 상품인데 같은 태그일 때, 태그 안에 단어 포함
                            if(this.data[i].entity_1.includes(this.tag1)){
                                this.data[i].entity_1 = this.data[i].entity_1.replace(this.tag1+':', entity1 + ', ');

                                if(this.data[i].entity_2 != ''){
                                    this.data[i].entity_2 = this.data[i].entity_2.replace(this.word, entity2);
                                }else{
                                    this.data[i].entity_2 = this.data[i].문장.replace(this.word, entity2);
                                }
                                
                            }else{
                                //태그가 없을 때, entity_1 뒤에 추가
                                console.log(entity1);
                                this.data[i].entity_1 = this.data[i].entity_1 + " " + entity1;
                                if(this.data[i].entity_2 != ''){
                                    this.data[i].entity_2 = this.data[i].entity_2.replace(this.word, entity2);
                                }else{
                                    this.data[i].entity_2 = this.data[i].문장.replace(this.word, entity2);
                                }
                            }
                        }
                        count++;
                    }
                }
                
                if(count == 0){
                    this.showMessage = '문장 내에 태그할 단어가 존재하지 않습니다';
                    this.showModal = !this.showModal;
                }

            }else{
                this.showMessage = '입력 사항을 모두 선택해주세요';
                this.showModal = !this.showModal;

            }
        },
        editTag1(str, t, w){
            //str : 수정할 entity 1, w : 대신 넣을 entity1 단어
            var tag_to_edit;

            var array = str.split(w);
            console.log('변화시킬 entity string');
            console.log(array[0]);
            var slashidx = array[0].lastIndexOf(':');
            var substr = array[0].substring(0, slashidx);

            var first = substr.lastIndexOf(' ');

            var replaceword = substr.substring(first+1, substr.length);

            tag_to_edit = str.replace(replaceword, t);


            return tag_to_edit
        },
        editTag2(str, t, w){
            var tag_to_edit;

            var array = str.split(w);
            console.log(array[1]);
            var first = array[1].indexOf(':');
            var last = array[1].indexOf('>');
            
            var replaceword = array[1].substring(first+1, last);

            var replaceStr = array[1].replace(replaceword, t);
            tag_to_edit = array[0] + w + replaceStr;

            return tag_to_edit
        },
        save(){
            this.$store.commit('chngTotalList', this.total);
        },
        nextPage(){
            this.pageNum += 1;
        },
        prevPage(){
            this.pageNum -= 1;
        },
        addTag (newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        },
        search(){
            this.data = this.total;
            this.data = this.data.filter((value) => {
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

            this.pageNum = 0;
        }
    }
    
}
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.tagging_layout{
    margin-left: 10px;
    margin-right: 10px;
}

table {
    table-layout: auto;
    margin-right: 10px;
}
td {
  font-size: 12px;
  max-width: 500px;
  text-overflow:ellipsis; overflow:hidden; white-space:nowrap;
}

.bg-grey {background:#efefef}
.breadcrumb {background: none; margin: 0;font-weight: 300;padding-left: 0; font-size: 13px;}
.breadcrumb a {color: #999;}
.breadcrumb > .active {color: #696969;}
.breadcrumb > li + li::before {content: "\203A";color: #999;padding: 0 8px;}


.vertical.menu{
  height:100vh;
  padding-top:20px;
}

#content{
  padding-top:20px;
}


</style>
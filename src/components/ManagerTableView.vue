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
                <tr v-for="datalist in datatable" v-bind:key="datalist">
				    <td v-for="data in datalist" v-bind:key="data">{{data}}</td>
			    </tr>
            </tbody>
        </table>
        <br>
        <br>
    </div>
</template>

<script>
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import Vue, { Component } from 'vue';
import {EventBus} from '../utils/EventBus';

Vue.use(VueGoodTable);


export default {
    components:{
        VueGoodTable
    },
    data(){
        return {
             datatable : ''
        };
    },
    created(){
        EventBus.$on('use_eventbus', (sendingdata) => {
            this.datatable = sendingdata;
            console.log('여기 데이터 받음!');
            console.log(this.datatable);
        })
    },

}
</script>

<style scoped>
table {
    table-layout: fixed
}
th{
    font-size:13px;
}
td {
  font-size: 12px;
  text-overflow:ellipsis; overflow:hidden; white-space:nowrap;
}
</style>

<template>
    <div>
        <main>
            <section ref="chatArea" class="chat-area">
                <p v-for="message in messages" :key="message" class="message" :class="{ 'message-out': message.화자 === 's', 'message-in': message.화자 !== 's' }">
                {{ message.문장 }}
                </p>
            </section>
            
            <section class="chat-subject">
                <div>
                    <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" style="width:150px; solid gray; marginLeft:20px;" v-model="pickCategory">
                        <option value="">카테고리별</option>
                        <option v-for="idx in listCategory.length" :key="idx" :value="listCategory[idx-1]">{{ listCategory[idx-1] }}</option>
                    </select>

                    <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" style="width:150px; solid gray; marginLeft:20px;" v-model="pickIntent">
                        <option value="">Intent</option>
                        <option v-for="idx in listIntent.length" :key="idx" :value="listIntent[idx-1]">{{ listIntent[idx-1] }}</option>
                    </select>

                    <input type="radio" id="one" v-model="pickQA" value="Q" style="marginLeft:20px;"> Q
                    <input type="radio" id="two" v-model="pickQA" value="A" style="marginLeft:20px;"> A
                </div>
                <div align="right" style="marginLeft:50px;">
                    <button class="refreshbtn" @click="refreshMessages()"><img src="../assets/reload.png"></button>
                </div>
                
            </section>

            <section class="chat-inputs" style="margin: 30px;">

                <form @submit.prevent="sendMessage('in')" id="person1-form">
                    <label for="person1-input">고객</label>
                    <input v-model="sMessage" id="person1-input" type="text" placeholder="Type your message">
                    <button type="submit" class="btn btn-outline-dark">Send</button>
                </form>

                <button class="btn btn-primary" @click="sendAllMessages">대화 끝내기</button>

                <form @submit.prevent="sendMessage('out')" id="person2-form" >
                    <label for="person2-input">점원</label>
                    <input v-model="cMessage" id="person2-input" type="text" placeholder="Type your message">
                    <button type="submit" class="btn btn-outline-dark">Send</button>
                </form>
            </section>

            <modal v-if="showModal" @close="showModal = false">
                <h3 slot="header">경고</h3>
                <span slot="body">입력 사항을 모두 선택해주세요.</span>
                <button slot="footer" @click="showModal = false">닫기</button>
            </modal>

            
        </main>
    </div>

</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import {components} from 'vue';

import Modal from './modal.vue';

import { store } from "@/util/store";

export default {
    store: store,
    components:{
        Modal : Modal
    },
    data(){
        return {
            timestamp:'',
            sMessage: '',
            cMessage: '',
            messages: [],

            listCategory:[],
            listIntent:[],

            dialogueList:[],

            pickCategory:'',
            pickIntent:'',
            pickQA:'',
            count:0,

            sendData:[],
            showModal: false
        }
    }, 
    created(){
        this.getTimeStamp();
        console.log("store에서 데이터 받아왔음!")
        this.dialogueList = this.$store.state.totalList;
        this.listIntent = this.$store.getters.getIntentlist;
        this.listCategory = this.$store.getters.getCategorylist;
        console.log(this.dialogueList);
    },
    methods: {
        sendMessage(direction) {

            this.setCount();

            if (!this.cMessage && !this.sMessage) {
                return
            }
            if (direction === 'out') {
                this.messages.push({날짜: this.timestamp, QA번호 : this.count, 대화순번: 1, 화자: 's', QA여부: this.toggleQA, 문장: this.cMessage, 카테고리:this.pickCategory, 상담번호:'', 상담내순번:1, intent: this.pickIntent, entity_1:'', entity_2:'', emotion_tagging:''})
                this.cMessage = ''
            } else if (direction === 'in') {
                this.messages.push({날짜: this.timestamp, QA번호 : this.count, 대화순번: 2, 화자: 'c', QA여부: this.toggleQA, 문장: this.sMessage, 카테고리:this.pickCategory, 상담번호:'', 상담내순번:2, intent: this.pickIntent, entity_1:'', entity_2:'', emotion_tagging:''})
                this.sMessage = ''
            } else {
                alert('something went wrong')
            }
            Vue.nextTick(() => {
                let messageDisplay = this.$refs.chatArea
                messageDisplay.scrollTop = messageDisplay.scrollHeight
            })

        },

        setCount(){
            this.count = this.count+1;
        },

        getTimeStamp(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            this.timestamp = date;
        },
        
        sendAllMessages() {
        //대화 끝내기 - 데이터는 테이블 뷰로 넘기고 윗부분은 clear
            if(this.pickCategory !== '' && this.pickIntent !== '' && this.pickQA !== ''){
                this.sendData = this.dialogueList.concat(this.messages);
                console.log(this.sendData);
                this.$store.commit('chngTotalList', this.sendData);
                this.messages = [];
                this.count=0;
            }else{
                this.showModal = !this.showModal;
            }
            
        },

        //대화 새로고침
        refreshMessages(){
            this.messages = [];
        }
    },
}
</script>

<style scoped>
문장, html {
  font-family: sans-serif;
  font-weight: 100;
}
.chat-area {
/*   border: 1px solid #ccc; */
  background: white;
  height: 500px;
  padding: 1em;
  overflow: auto;
  max-width: 1000px;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
.chat-subject{
    display: flex;
    align-items: center;
    justify-content: center;
    margin:20px;
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: .5em;
/*   margin-bottom: .5em; */
  font-size: .8em;
}
.message-out {
  background: #407FFF;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #F1F0F0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: .5em;
  width: 350px;
}
#person2-input {
  padding: .5em;
  width: 350px;
}

.refreshbtn{
    background-color: rgba( 255, 255, 255, 0.5 );
    outline: none;
    border:none
}

</style>
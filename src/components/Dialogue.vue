<template>
    <div>
        <main>
            {{ jsonlist }}
            <section ref="chatArea" class="chat-area">
                <p v-for="message in messages" :key="message" class="message" :class="{ 'message-out': message.화자 === 's', 'message-in': message.화자 !== 's' }">
                {{ message.문장 }}
                </p>
            </section>

            <section class="chat-subject">

                <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" style="width:150px; solid gray; marginLeft:20px;">
                    <option value="">카테고리별</option>
                    <option v-for="idx in listCategory.length" :key="idx" :value="listCategory[idx-1]">{{ listCategory[idx-1] }}</option>
                </select>

                <select class="mdb-select colorful-select dropdown-primary mt-2 ml-2" style="width:150px; solid gray; marginLeft:20px;">
                    <option value="">Intent</option>
                    <option v-for="idx in listIntent.length" :key="idx" :value="listIntent[idx-1]">{{ listIntent[idx-1] }}</option>
                </select>

                <input type="checkbox" v-model="toggleQ" true-value="Q" false-value="" style="marginLeft:20px;"> Q
                <input type="checkbox" v-model="toggleA" true-value="A" false-value="" style="marginLeft:20px;"> A

            </section>

            <section class="chat-inputs" style="margin: 30px;">

                <form @submit.prevent="sendMessage('in')" id="person1-form">
                    <label for="person1-input">고객</label>
                    <input v-model="sMessage" id="person1-input" type="text" placeholder="Type your message">
                    <button type="submit" class="btn btn-outline-dark">Send</button>
                </form>

                <button class="btn btn-primary" @click="clearAllMessages">대화 끝내기</button>

                <form @submit.prevent="sendMessage('out')" id="person2-form" >
                    <label for="person2-input">점원</label>
                    <input v-model="cMessage" id="person2-input" type="text" placeholder="Type your message">
                    <button type="submit" class="btn btn-outline-dark">Send</button>
                </form>
            </section>
        </main>
    </div>

</template>

<script>
import Vue from 'vue';
import {components} from 'vue';

export default {
    data(){
        return {
            timestamp:'',
            sMessage: '',
            cMessage: '',
            messages: [],


            listCategory:[],
            listIntent:[],
            toggleQ:'',
            toggleA:'',

            totalList:[],
            dialogueList:[],
        }
    },
    created(){
        console.log('dialogue');
        console.log("router", this.$router)
        console.log("route", this.$route)
    },
    computed:{
        jsonlist(){
            
        }
    },
    methods: {
        sendMessage(direction) {
            if (!this.cMessage && !this.sMessage) {
                return
            }
            if (direction === 'out') {
                this.messages.push({문장: this.cMessage, 화자: 's'})
                this.cMessage = ''
            } else if (direction === 'in') {
                this.messages.push({문장: this.sMessage, 화자: 'c'})
                this.sMessage = ''
            } else {
                alert('something went wrong')
            }
            Vue.nextTick(() => {
                let messageDisplay = this.$refs.chatArea
                messageDisplay.scrollTop = messageDisplay.scrollHeight
            })
        },
        getIntentCategorylist(){
            this.listIntent = TableView.getIntentlist();
            this.listCategory = TableView.getCategorylist();
        },
        
        clearAllMessages() {
        //대화 끝내기 - 데이터는 테이블 뷰로 넘기고 윗부분은 clear
        this.messages = []
        }
    },
    computed:{

    }
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
</style>
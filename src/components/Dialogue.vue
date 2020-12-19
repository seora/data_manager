<template>
    <div>
        <br>
        <section ref="chatArea" class="chat-area">
            <p v-for="message in messages" :key="message" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                {{ message.body }}
            </p>
        </section>

        <section class="chat-inputs">

            <form @submit.prevent="sendMessage('in')" id="person1-form" style="margin-left: 30px;">
                <label for="person1-input">Bob</label>
                <input v-model="c_Message" id="person1-input" type="text" placeholder="Type your message">
                <button type="submit">Send</button>
            </form>
        
        <button @click="clearAllMessages">Clear All</button>
            <form @submit.prevent="sendMessage('out')" id="person2-form" style="margin-right: 30px;">
                <label for="person2-input">You</label>
                <input v-model="s_Message" id="person2-input" type="text" placeholder="Type your message">
                <button type="submit">Send</button>
            </form>
        </section>
    </div>
            
</template>

<script>
import Vue from 'vue';

export default {
    data(){
        return {
            c_Message: '',
            s_Message: '',
            messages: [
                    {
                    body: 'Welcome to the chat, I\'m Bob!',
                    author: 'bob'
                },
                {
                    body: 'Thank you Bob',
                    author: 'you'
                },
                {
                    body: 'You\'re most welcome',
                    author: 'bob'
                }
            ],
        }
    },
    methods:{
        endMessage(direction) {
            if (!this.youMessage && !this.bobMessage) {
                return
            }
            if (direction === 'out') {
                this.messages.push({body: this.s_Message, author: 'you'});
                this.s_Message = '';
            } else if (direction === 'in') {
                this.messages.push({body: this.c_Message, author: 'bob'});
                this.c_Message = '';
            } else {
                alert('something went wrong');
            }
            Vue.nextTick(() => {
                let messageDisplay = this.$refs.chatArea;
                messageDisplay.scrollTop = messageDisplay.scrollHeight;
            })
        },
        clearAllMessages() {
        this.messages = []
        }
    }

}
</script>

<style scoped>
body, html {
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
  height: 100px;
  
}
#person2-input {
  padding: .5em;
  width: 350px;
}

</style>
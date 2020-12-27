<template>
    <div>
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

        <div>
            <table class="table table-striped table-bordered table-sm">
                <thead class="thead-primary">
                    <tr>
                        <th>문장</th>
                        <th>entity_1</th>
                        <th>entity_2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(datalist, idx) in paginatedData" :key="idx">
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
                <span slot="body">입력 사항을 모두 선택해주세요.</span>
                <button slot="footer" @click="showModal = false">닫기</button>
        </modal>
    </div>

</template>


<script>
import { store } from "@/util/store";
import Modal from './Modal';

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

            showModal: false
        }
    },
    created(){
        this.total = this.$store.state.totalList;
        this.data = this.total;
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
            var entity = this.tag1 + ": " + this.word;
            var entity2 = "<" + this.word+":" + this.tag2 + ">";

            if (this.word !== '' && this.tag !== ''){
                for(var i = 0; i < this.data.length; i++){
                    if(this.data[i].문장.includes(this.word)){
                        if(this.data[i].entity_1.includes(this.word) || this.data[i].entity_2.includes(this.word)){
                            //이미 태깅되어 있는 것은 수정할 것!
                            var tag1toedit = this.editTag1(this.data[i].entity_1, this.word);
                            console.log(tag1toedit);
                            this.data[i].entity_1 = this.data[i].entity_1.replace(tag1toedit, this.tag1);

                        
                            var tag2toedit = this.editTag2(this.data[i].entity_2, this.word);
                            console.log(tag2toedit);
                            this.data[i].entity_2 = this.data[i].entity_2.replace(tag2toedit, this.tag2);

                        }else{
                            this.data[i].entity_1 = this.data[i].entity_1 + " " + entity;
                            this.data[i].entity_2 = this.data[i].문장.replace(this.word, entity2);
                        }
                    }
                }
            }else{
                this.showModal = !this.showModal;
            }
            console.log(this.data);
        },
        editTag1(str, w){
            var tag_to_edit;
            var target = ": " + w;
            tag_to_edit = str.substring(str.indexOf(" " || 0)+1, str.lastIndexOf(target));

            return tag_to_edit
        },
        editTag2(str, w){
            var tag_to_edit;
            tag_to_edit = str.substring(str.indexOf(w)+w.length + 1, str.lastIndexOf(">"));

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
    }
    
}
</script>

<style scoped>
table {
    table-layout: auto;
    margin-left: 10px;
    margin-right: 10px;
}
td {
  font-size: 12px;
  text-overflow:ellipsis; overflow:hidden; white-space:nowrap;
}

</style>
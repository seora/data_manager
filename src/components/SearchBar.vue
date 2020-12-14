<!-- Search Bar -->

<template>
    <div style="marginRight:10px; marginLeft:10px">
            <!--Section: Table-->
            <section class="mb-5">
                <h5 class="mb-0">Search Dialogue</h5>
                <!--Top Table UI-->
                <div class="card p-2 mb-5">
                    <!--Grid row-->
                    <div class="row">
                        <!--Grid column-->
                        <div class="col-md-3">
                            <!--Name-->
                            <select class="mdb-select colorful-select dropdown-primary mx-2">
                                <option value="" disabled selected>카테고리별</option>
                                <option value="1">스포츠-레저-자동차_스포츠 신발</option>
                                <!-- <option value="2">Export</option>
                                <option value="3">Change segment</option> -->
                            </select>
                        </div>
                        <!--Grid column-->
                        <div class="col-md-3">
                            <!--Name-->
                            <select class="mdb-select colorful-select dropdown-primary mx-2">
                                <option value="" disabled selected>Intent</option>
                                <option value="1">제품_구성_질문</option>
                                <option value="2">환불_비용_질문</option>
                                <option value="3">교환_시간_질문</option>
                                <option value="4">제품_정보_비교</option>
                                <option value="5">제품_정보_질문</option>
                                <option value="5">제품_추천_질문</option>
                            </select>
                        </div>
                        <!--Grid column-->
                        <div class="col-md-3">
                            <!--Blue select-->
                            <select class="mdb-select colorful-select dropdown-primary mx-2">
                                <option value="" disabled selected>Show only</option>
                                <option value="1">All</option>
                                <option value="2">Never opened</option>
                                <option value="3">Opened but unanswered</option>
                                <option value="4">Answered</option>
                                <option value="5">Unsunscribed</option>
                            </select>
                            <!--/Blue select-->
                        </div>
                        <!--Grid column-->

                        <!--Grid column-->
                        <div style="float:right;">
                            <form class="form-inline mt-2 ml-2">
                                <input class="form-control" type="text" placeholder="Search" style="max-width: 150px;">
                                <button class="btn btn-outline-primary" style="margin-left : 4px;" @click="applyFilter()"><img src="../assets/search.png"></button>
                            </form>

                        </div>
                        <!--Grid column-->

                    </div>
                    <!--Grid row-->

                </div>
                <!--Top Table UI-->
            </section>
    </div>
</template>


<script>
import Vue from './GetData.vue';
import {EventBus} from '../utils/EventBus';
import Dropdown from 'vue-simple-search-dropdown';


//해야할 것! Getdata에서 각 카테고리별 목록 받아와서 searchfilter에 뿌리고 각 필터에 맞는 값 search 
export default {
    data() {
        return {
        items: [],
        
        filter: {
            practice: '',
            serviceLine: '',
            serviceOffering: '',
            region: '',
            country: '',
            capabilitySkill: ''
        },

        appliedFilter: null
        };
    },
    methods: {
        applyFilter() {
            this.appliedFilter = {...this.filter};
        }
  }

}
</script>

<style scoped>
 .side-nav .logo-sn {
    padding-bottom: 1rem;
    padding-top: 1rem;
}

.side-nav .logo-sn img {
    height: 38px;
}

.side-nav .search-form input[type=text] {
      margin-top: 0;
      padding-top: 12px;
      padding-bottom: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

body {
    background-color: #eee;
}

.accordion .card {
    margin-bottom: 1.2rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.accordion .card .card-body {
    border-top: 1px solid #eee;
}
</style>
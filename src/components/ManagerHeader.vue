<!-- ManagerHeader -->

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Data Manager</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">데이터 추가</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">태그 관리</a>
                </li>
            </ul>
            </div>
            <p style="font-size:15px; float:right;">{{ timestamp }}</p>
        </div>
    </nav>
</template>



<script>
import Vue from 'vue';

export default {
    data(){
        return{
            timestamp: ""
        };
    },
    created(){
        const now = new Date();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const weekList = new Array("Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.");
        const week = weekList[now.getDay()];
        this.timestamp = `${month}/${date} ${week}`;
    }
}

</script>

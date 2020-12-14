<!-- GetData -->

<template>
        <div style="float:right; marginRight : 10px">
            <input ref = "csv" type = "file" @change.prevent="validFileMimeType" name = "csv">
            <slot name = "error" v-if = "showErrorMessage">
                <div class="invalid-feedback d-block">
                    File type is invalid
                </div>
            </slot>
            <slot name="next" :load="load">
                <button type="submit" :disabled="disabledNextButton" class="btn btn-primary" @click.prevent="load">
                    파일 불러오기
                </button>
            </slot>
        </div>
</template>

<script>
import { drop, forEach, get, map, set } from 'lodash';
import Papa from 'papaparse';
import mimeTypes from "mime-types";
import { EventBus } from '../utils/EventBus';

export default {
    props:{
        url: {
                type: String
            },
        fileMimeTypes: {
                type: Array,
                default: () => {
                    return ["text/csv", "text/x-csv", "application/vnd.ms-excel", "text/plain"];
                }
        },
        callback: {
                type: Function,
                default: () => ({})
        },
        catch: {
            type: Function,
            default: () => ({})
        },
        finally: {
            type: Function,
            default: () => ({})
        },
    },
    data: () => ({
        form: {
            csv: null,
        },
        fieldsToMap: [],
        map: {},
        hasHeaders: true,
        csv: null,
        isValidFileMimeType: false,
        fileSelected: false,
    }),
    
    methods: {
        validFileMimeType() {
                let file = this.$refs.csv.files[0];
                const mimeType = file.type === "" ? mimeTypes.lookup(file.name) : file.type;
                if (file) {
                    this.fileSelected = true;
                    this.isValidFileMimeType = this.validation ? this.validateMimeType(mimeType) : true;
                } else {
                    this.isValidFileMimeType = !this.validation;
                    this.fileSelected = false;
                }
        },
        validateMimeType(type) {
                return this.fileMimeTypes.indexOf(type) > -1;
        },
        load() {
            console.log('load 시작');
            const _this = this;
            let result;
            this.readFile((output) => {
                console.log(output);
                result = get(Papa.parse(output, {skipEmptyLines: true, header:true}), "data");
                console.log(result);
                this.sender(result);
            });
            console.log('load 끝');

        },
        readFile(callback) {
            let file = this.$refs.csv.files[0];
            if (file) {
                let reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    callback(evt.target.result);
                };
                reader.onerror = function () {
                };
                console.log('readFile 함수');
            }
        },
        sender(result){
            EventBus.$emit('use_eventbus', result);
        }
    },
    computed: {
        showErrorMessage() {
                return this.fileSelected && !this.isValidFileMimeType;
        },
        disabledNextButton() {
            return !this.isValidFileMimeType;
        }
    }
}
</script>
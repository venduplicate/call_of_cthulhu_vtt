<script setup lang="ts">
import {ref} from "vue";
import {useInvestigatorStore} from "../stores/InvestigatorStore";
import { v4 } from "uuid";
import { useRouter } from "vue-router";

const store = useInvestigatorStore();
const router = useRouter()

const investigators = ref<Array<{id: string, name: string}>>([])

// load investigators
// new investigator button

// fetch list of investigators and ids
// investigator name + id
// then once sheet loads, load 

function addInvestigator(){
    const id = v4()
    const newArray = [{name: "", id: id}, ...investigators.value]
    investigators.value = newArray;
    router.push("")
}

</script>

<template>
<div v-if="investigators !== null">
    <div v-for="record in investigators">
        {{record.name}}
    </div>
</div>
<button @click="addInvestigator">Create New Investigator</button>
</template>
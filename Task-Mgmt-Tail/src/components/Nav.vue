<template>
  <div class="mt-2 py-10 border">
      <h1 class="text-4xl">TASKS MANAGEMENT </h1>
      <div class="mt-2">
          <button @click="signOut()" class="bg-red-600 mt-2 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full"> Sign Out</button>
          
      </div>
</div>

  
</template>

<script setup>
import { storeToRefs } from "pinia";
import {useUserStore} from "../store/user"
import {useRouter} from 'vue-router';

// const {tasks} = storeToRefs()

const ux = useUserStore();
const uy = storeToRefs(ux);

const router = useRouter();


async function signOut(){
    try{
      await ux.signOut();
      router.push({name: "Auth"});
    }
    catch (e){
      alert(e.message);
    }
    
    
}
</script>

<style>

</style>
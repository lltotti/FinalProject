<template>
   <div class="mt-2">
        
        <div class="mt-2">
            <label name="user"> Username</label><input type="text" name="email" v-model="email">
            
        </div>
        <div class="mt-2">
            <label name="pass"> Password</label><input type="password" name="passw" v-model="passw" >
        </div>
           {{email}}
            {{passw}}
        <div>
           <button @click="signIn()" class="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Register
            </button>
         
        </div>
              

    </div>
</template>

<script setup>
import {ref} from "vue";
import { storeToRefs } from "pinia";
import {useUserStore} from "../store/user";
import {useRouter} from 'vue-router';

const x = useUserStore();
const router = useRouter();
const y = storeToRefs(x);
const email=ref("");
const passw=ref("");
// const isSignIn=reactive(false);
//const isSignIn=y.isSignIn; 

async function signIn(){
    console.log("EMAIL: "+email.value+" / PASSW: "+passw.value);
    try{
        await x.signIn(email.value, passw.value);
        router.push({name: "Home"});

    }
    catch(e){
        alert(e.message);
    }
    
}

</script>

<style>

</style>
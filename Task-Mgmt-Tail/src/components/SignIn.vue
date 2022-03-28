<template>
   <div>
        
        <label class="text-sm text-gray-500 text-left" name="inputMail">E-mail address</label>
            <input class="w-full py-3 pl-3 mb-4 bg-white rounded-lg" type="email" placeholder="" name="inputMail" v-model="email">
            <label class="text-sm text-gray-500 text-left" name="inputPassw">Password</label>
            <input class="w-full py-3 pl-3 mb-4 bg-white rounded-lg" type="password" placeholder="" name="inputPassw" v-model="passw">
            <button @click="signIn()" class="w-full inline-block px-6 py-3 mb-4 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200">Get Started</button>
    
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
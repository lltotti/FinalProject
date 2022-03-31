<template>
   <div>
        
        <label class="text-sm text-gray-500 text-left" name="inputMail">E-mail address</label>
            <input class="w-full py-3 pl-3 mb-4 bg-white rounded-lg" type="email" placeholder="" name="inputMail" v-model="email">
            <button @click="recoverPassw()" class="w-full inline-block px-6 py-3 mb-4 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200">Recover Password</button>
            <button @click="backSignIn()" class="w-full inline-block px-6 py-3 mb-4 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200">Back</button>
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

function backSignIn(){
    x.isRecoverPassw=false;
    x.isSignIn=true;
    
    
    

}
async function recoverPassw(){
    console.log("EMAIL: "+email.value);
    try{
        await x.recoverPassw(email.value);
        y.isRecoverPassw=false;
        alert("Password has been successfully reseted. Check you email");

    }
    catch(e){
        alert(e.message);
    }
    
}

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
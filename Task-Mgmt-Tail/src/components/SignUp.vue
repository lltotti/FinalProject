<template>
   <div class="mt-2">
        
        <div class="mt-2">
            <label name="user"> E-mail</label><input type="text" name="user" v-model="email">
            
        </div>
        <div class="mt-2">
            <label name="pass"> Password</label><input type="password" name="pass" v-model="passw">
        </div>
        <div>
          <label name="pass2"> Repeat password</label><input type="password" name="pass2" v-model="passw2">
        
        </div>
        <div>
            <button @click="signUp()" class="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Register
            </button>
        </div>
        

    </div>
</template>

<script setup>
import {ref} from "vue";
import { storeToRefs } from "pinia";
import {useUserStore} from "../store/user";

const x = useUserStore();
const y = storeToRefs(x);
const email=ref("");
const passw=ref("");
const passw2=ref("");
// const isSignIn=reactive(false);
//const isSignIn=y.isSignIn; 

async function signUp(){
    if(passw.value.localeCompare(passw2.value)!==0){
        alert("The passwords didn't match. Please retype.");
    }
    if(email.value && passw.value && passw2.value){
        alert("Muito bem!")
    }
    
    console.log("EMAIL: "+email.value+" / PASSW: "+passw.value);
    try{
        await x.signUp(email.value, passw.value);
    }
    catch(e){
        alert(e.message);
    }
    
}
</script>

<style>

</style>
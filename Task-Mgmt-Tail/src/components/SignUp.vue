<template>
   

   <div>
        
        <label class="text-sm text-gray-500 text-left" name="inputMail">E-mail address</label>
            <input class="w-full py-3 pl-3 mb-4 bg-white rounded-lg" type="email" placeholder="" name="inputMail" v-model="email">
            <label class="text-sm text-gray-500 text-left" name="inputPassw">Password</label>
            <input class="w-full py-3 pl-3 mb-4 bg-white rounded-lg" type="password" placeholder="" name="inputPassw" v-model="passw">
            <label class="text-sm text-gray-500 text-left" name="inputRepPassw">Repeat Password</label>
            <input class="w-full py-3 pl-3 mb-4 bg-white rounded-lg" type="email" placeholder="" name="inputRepPassw" v-model="repPassw">            
             <!-- <label class="inline-block mb-4">
              <input class="mr-1" type="checkbox" name="terms" value="1">
              <span class="text-sm text-gray-500">By signing up, you agree to our <a class="font-bold hover:underline" href="#">Terms, Data Policy</a> and <a class="font-bold hover:underline" href="#">Cookies Policy</a>.</span>
            </label> -->
           
            <button @click="signUp()" class="w-full inline-block px-6 py-3 mb-4 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200">Get Started</button>
        
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
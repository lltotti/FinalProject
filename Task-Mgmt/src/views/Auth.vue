

<script setup>
import { storeToRefs } from "pinia";
import {useUserStore} from "../store/user"
import {reactive} from "vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

const x = useUserStore();
const y = storeToRefs(x);

// const isSignIn=reactive(false);
const isSignIn=y.isSignIn; 



// function llamaSignIn(){
//     alert("SignIn");
// }
// function llamaSignUp(){
//     alert("SignUp");
// }
</script>

<style>

</style>

<template >
<div>
    <div>
        <h1>Welcome to Iron Vue Task Manager</h1>
    </div>
    <SignIn v-if="isSignIn"/>
    <SignUp v-else/>
    <button v-if="isSignIn" @click="isSignIn=false" class="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Sign Up
    </button>
    <button v-if="!isSignIn" @click="isSignIn=true" class="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Sign In
    </button>

   
</div>
        

</template>
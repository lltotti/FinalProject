

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
<!-- <div>
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

   
</div> -->

<section class=" py-20 h-screen">
  
  
    <div class="flex flex-wrap  -m-4  justify-center py-40">
      
      
        <div class="lg:max-w-md p-6 bg-gray-50 text-left rounded-lg">
         
            <p class="my-2 text-sm text-gray-500 font-semibold uppercase">Sign In</p>
            <div class="flex flex-row my-6">
                  <img src="../assets/logo.png" alt="" width="35" height="2"  >
                <h3 class="px-3 text-2xl font-bold font-heading self-end">Vue Task Management</h3>      
            </div>

                  <!-- <img src="../assets/logo.png" alt="" width="50"  class="border">
                <h3 class="mb-8 text-2xl font-bold font-heading border">Vue Task Management</h3>      
             -->
            <SignIn v-if="isSignIn"/>
            <SignUp v-else/>

            <div v-if="isSignIn" @click="isSignIn=false">
                <a class="text-sm text-gray-500 hover:underline" href="#">Forgot password?</a>
                <p class="text-sm text-gray-500">Don't have an account? <span @click="isSignIn=false" class="text-sm text-emerald-500 hover:underline cursor-pointer">Sign UP</span>.</p>
            </div>

            <div v-else >
                <p class="text-sm text-gray-500">Already registred? <span @click="isSignIn=true" class="text-sm text-emerald-500 hover:underline cursor-pointer">Sign IN</span>.</p>
            </div>


           


            
          
        
      </div>
    
  </div>
</section>
        

</template>
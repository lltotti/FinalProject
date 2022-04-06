<template>
<section class="bg-white w-full">
  <div class=" w-screen ">
    <nav class="flex justify-between justify-left items-center py-4">
      <div class="lg:hidden">
        <button class="block navbar-burger text-gray-500 hover:text-gray-600 focus:outline-none">
          <svg class="h-4 w-4" fill="currentColor " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
     <div class="flex flex-row">
                  <img src="../assets/logo.png" alt="" width="35" height="2"  >
                <h3 class="px-3 text-2xl font-bold font-heading self-end">2-Do Vue Task Management</h3>      
            </div>
      <!-- <ul class="hidden lg:flex ml-auto mr-10 items-center w-auto space-x-12">
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">About</a></li>
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">Company</a></li>
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">Services</a></li>
        <li><a class="text-sm text-gray-500 hover:text-gray-700" href="#">Testimonials</a></li>
      </ul> -->
      <div class="flex flex-row">
        <div class="mt-3 flex -space-x-2 overflow-hidden">
         <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="../assets/yo.jpeg" alt=""/>
         </div>
         <div class="px-6">
           <h4 class="myy-0 text-sm text-gray-500 font-semibold uppercase " >
             Leandro Totti
           </h4>
           <!-- <a class="w-20 hidden lg:block px-0 py-1 text-sm text-gray-500 hover:text-gray-600 font-bold border border-gray-100 hover:border-gray-200 rounded" href="#">Sign Out</a> -->
           <p @mouseover="goProfile()" class="text-sm text-emerald-500 hover:underline cursor-pointer"> My profile</p>
        
            <Profile v-if="isModalProfile" @mouseleave="isModalProfile=false"/>
      
          
           <p @click="signOut()" class="text-sm text-emerald-500 hover:underline cursor-pointer">
             Sign OUT </p>
         </div>
         <!-- <a class="hidden lg:block px-6 py-3 text-sm text-gray-500 hover:text-gray-600 font-bold border border-gray-100 hover:border-gray-200 rounded" href="#">Sign Out</a> -->
      </div>
      
      
     </nav>
    </div>
    
    
 <!-- <div v-if="isModalProfile" id="popup-modal" tabindex="-1" class=" bg-slate-600 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center" aria-hidden="true">
         <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto">
    <div class="w-full h-full text-center">
        
    </div>
</div>
</div> -->

  </section>  
  <!-- <div class="mt-2 py-10 border">
      <h1 class="text-4xl">TASKS MANAGEMENT </h1>
      <div class="mt-2">
          <button @click="signOut()" class="bg-red-600 mt-2 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full"> Sign Out</button>
          
      </div>
</div> -->

  
</template>

<script setup>
import { storeToRefs } from "pinia";
import {useUserStore} from "../store/user"
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import Profile from "./Profile.vue";
// const {tasks} = storeToRefs()

const ux = useUserStore();
const uy = storeToRefs(ux);

const router = useRouter();
let isModalProfile=ref(false);

function goProfile(){
   
   //router.push({ path: '/Profile' });
   isModalProfile.value=!isModalProfile.value;
}

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
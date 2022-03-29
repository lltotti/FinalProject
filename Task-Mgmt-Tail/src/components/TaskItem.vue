<template>
  
    <!-- <div v-if="item.is_complete===showComplete" class="flex flex-row items-center" > -->
      <div v-if="item.is_complete===showComplete" :class="designCard.div1">
        <div :class="designCard.div2">
          <h3 :class="designCard.h3">{{item.title}}</h3>
        <div class="flex flex-wrap space-y-1  p-1 " >

        <div @click="editTasks(item.id)" :class="designCard.btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span class="text-sm" >Edit</span>
        </div>        

        <div v-if="showComplete===false" @click="completeTask(item.id)" :class="designCard.btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Complete</span>
        </div>

        <div v-if="showComplete===true" @click="completeTask(item.id)" :class="designCard.btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Re-Open</span>
        </div>

        <!-- <div @click="deleteTask(item.id)" :class="designCard.btn"> -->
          <div @click="isModal=true" :class="designCard.btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Delete</span>
        </div>

        

       

          <!-- <button @click="editTasks(item.id)" :class="designCard.btn"> Edit</button>
           <button v-if="showComplete===false" @click="completeTask(item.id)" :class="designCard.btn"> Complete</button>
           <button v-if="showComplete===true" @click="completeTask(item.id)" :class="designCard.btn"> Re-Open</button>
           <button @click="deleteTask(item.id)" :class="designCard.btn"> Delete</button> -->


      </div>
      </div>
      </div>
      <div v-if="isModal" id="popup-modal" tabindex="-1" class=" bg-slate-600 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center" aria-hidden="true">
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex justify-end p-2">
                <button @click="isModal=false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>

              <div class="p-6 pt-0 text-center">
                <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this record?</h3>
                <button data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" @click="deleteTask(item.id)">
              Yes, delete
                </button>
                 <button data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" @click="isModal=false">No, cancel</button>
              </div>
            </div>
          </div>
        </div>
      <!-- </div> -->








      <!-- MODEL
       <div class="w-full lg:w-1/3 px-4 mb-6 lg:mb-0">
        <div class="p-12 bg-gray-500 rounded lg:text-center">
          <h3 class="text-2xl font-bold text-gray-50">Pro</h3>
          <span class="inline-block mb-6 text-6xl font-bold text-white">$65,99</span>
          <ul class="mb-6 text-left text-lg">
            <li class="mb-2 flex items-center">
              <svg class="mr-2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg text-white">Complete documentation</p>
            </li>
            <li class="mb-2 flex items-center">
              <svg class="mr-2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg text-white">Working materials in Figma</p>
            </li>
            <li class="mb-2 flex items-center">
              <svg class="mr-2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg text-white">100GB cloud storage</p>
            </li>
            <li class="mb-2 flex items-center">
              <svg class="mr-2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg text-white">500 team members</p>
            </li>
            <li class="mb-2 flex items-center">
              <svg class="mr-2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg text-white">Premium support</p>
            </li>
          </ul>
          <a class="block py-2 w-full text-center text-gray-800 font-semibold bg-white hover:bg-gray-50 rounded" href="#">Action</a>
        </div>
      </div>-->

</template>

<script setup>
import { onMounted } from 'vue';
import { defineProps, reactive, ref } from "vue";
import { storeToRefs, mapActions } from "pinia";
import {useTaskStore} from "../store/task.js";
import {useUserStore} from "../store/user"

import {useRouter} from 'vue-router';

let isModal=ref(false);

const props = defineProps({
  item: {
      type: Object,
      default: {
        id: "",
        user_id: "none",
        title: "",
        is_complete: false,
        inserter_ate:""
    
      },
  },
    showComplete: {
        type: Boolean,
        default: false
    },
    designCard: {
      type: Object,
      default:{
        div1: "w-full lg:w-1/5  mb-6 lg:mb-0 self-start ",
        div2: "py-1 px-1 pb-0 florence-red-border bg-gray-50 rounded-lg lg:text-center border drop-shadow-lg hover:border-red-700 m-1 ",
        h3: "text-base  text-black font-heading mb-8 font-Roboto florence-red rounded-lg p-1",
        btn: "flex flex-wrap cursor-pointer px-1 w-full justify-center text-gray-500 font-semibold bg-gray-100 hover:bg-gray-300 rounded border m-0"
      }
      // default:{
      //   div1: "w-full lg:w-5 px-4 mb-6 lg:mb-0",
      //   div2: "p-6 bg-gray-500 rounded lg:text-center",
      //   h3: "text-2xl font-bold text-gray-50",
      //   btn: "block py-2 w-full text-center text-gray-800 font-semibold bg-white hover:bg-gray-50 rounded"
      //  }
       
    }
    
});

const x = useTaskStore();
const y = storeToRefs(x);
//chave para reatividade na store
const {tasks, taskEdit, titleEdit} = storeToRefs(x);

 const ux = useUserStore();
 const uy = storeToRefs(ux);
const router = useRouter();



// function addPatch(){
//   // x.title = "TRICOLOR";
//   // console.log(x.title); 

  
// const item = {
//           id: 1000,
//           user_id: ux.user.id,
//           title: "SUPER TRUNFO",
//           is_complete: true    
//     }
// x.taskEdit=item;
// }



function editTasks(id){
    const indexOf = tasks.value.findIndex( (element) => element.id === id);
     console.log("INDEX-OF: "+indexOf);
     const item = {
          id: id,
          user_id: ux.user.id,
          title: tasks.value[indexOf].title,
          is_complete: tasks.value[indexOf].is_complete    
    }
    console.log(item);
x.setTaskEdit(item);
//this.taskEdit=item;
//x.idEdit=id;
//taskEdit.value=item;
//titleEdit.value=tasks.value[indexOf].title;

x.titleEdit=tasks.value[indexOf].title;
console.log("SEM REFS: "+x.taskEdit.title);
console.log("COM REFS: "+taskEdit.value.title);

}

async function getTasks(){
    await x.fetchTasks();
    // tasks.value = x.tasks;
    // console.log(tasks.value[0].id);
    
}
async function createTasks(){
    const item = {
          user_id: ux.user.id,
          title: title.value,
          //is_complete: state.value.,
          is_complete: "true"
          
        }
    try{
      await x.createTasks(item);
      getTasks();
    }
    catch (e){
      alert(e.message);
    }
}

async function deleteTask(id){
    try{
      console.log("ID - "+tasks.value[0].id);
      console.log(ux.user.id);
      await x.deleteTasks(id);
      getTasks();
    }
    catch (e){
      alert(e.message);
    }
    finally{
      isModal=false;
    }
}

 
async function completeTask(id){
     const indexOf = tasks.value.findIndex( (element) => element.id === id);
     console.log("INDEX-OF: "+indexOf);
     const item = {
          id: id,
          user_id: ux.user.id,
          title: tasks.value[indexOf].title,
          is_complete: !tasks.value[indexOf].is_complete
          
        }
    try{
      console.log("ID - "+tasks.value[indexOf].id);
      console.log(ux.user.id);
      console.log("COMPLETE: "+tasks.value[indexOf].is_complete+" / "+item.is_complete);
      await x.updateTasks(item);
      getTasks();
    }
    catch (e){
      alert(e.message);
    }
}

async function updateTask(id){
     const indexOf = tasks.value.findIndex( (element) => element.id === id);
      const item = {
          user_id: ux.user.id,
          title: title.value,
          //is_complete: state.value.,
          is_complete: tasks.value[indexOf].is_complete
          
        }
   try{
      console.log("ID - "+tasks.value[0].id);
      console.log(ux.user.id);
      await x.updateTasks(id);
      getTasks();
    }
    catch (e){
      alert(e.message);
    }
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

getTasks();

// onMounted(async () => {
//   alert (taskEdit.value);
// })

</script>

<style>

</style>
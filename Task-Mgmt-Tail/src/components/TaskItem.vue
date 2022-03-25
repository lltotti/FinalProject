<template>
  <div v-if="item.is_complete===showComplete" class="flex flex-row border border-black">
      <div class="w-3/4 border">
          <h2 class="text-2xl">{{item.title}}</h2>
      </div>
      <div class="flex flex-row space-x-7" >
           <button @click="editTasks(item.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Edit</button>
           <button v-if="showComplete===false" @click="completeTask(item.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Complete</button>
           <button v-if="showComplete===true" @click="completeTask(item.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Re-Open</button>
           <button @click="deleteTask(item.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Delete</button>

      </div>
      
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { defineProps, reactive, ref } from "vue";
import { storeToRefs, mapActions } from "pinia";
import {useTaskStore} from "../store/task.js";
import {useUserStore} from "../store/user"

import {useRouter} from 'vue-router';

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
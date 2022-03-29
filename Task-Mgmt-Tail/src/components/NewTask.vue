<template>


    <div class="py-5 bg-gray-200 px-5">
            <div>
               <div>
                  <label class="font-Roboto text-xl text-gray-800 text-left" name="title"> Title: </label>
                </div>
                <div class="flex flex-row ">
                  <input type="text" name="title" v-model="title" class=" font-Roboto text-lg w-2/4 inline-block p-0 m-0 text-black placeholder-gray-50 font-regular bg-white border-transparent rounded-l h-11">
                  <button v-if="idEdit<0" class="px-5 mx-3 my-0 py-0 inline-block py-2 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200" @click="selectCreateUpdate()">Add Task</button>
                  <button v-else class="px-5 mx-3 my-0 inline-block py-2 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200" @click="selectCreateUpdate()">Modify </button>
                  <button class="px-7 mx-0 my-0 py-0 inline-block py-2 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200" @click="cancelEdit()">Cancel</button>
                </div>
            </div> 
            
           
           
           
        </div>



          <!-- <div class="hidden lg:flex">
      <input class="inline-block px-4 py-3 text-sm text-gray-50 placeholder-gray-50 font-semibold bg-gray-400 border border-transparent rounded-l" placeholder="Search">
      <button class="px-2 rounded-r bg-gray-400">
        <svg class="text-gray-50 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div> -->

  
</template>

<script setup>
import Delete from "./Delete.vue";
import { storeToRefs } from "pinia";
import {useTaskStore} from "../store/task.js";
import {useUserStore} from "../store/user"
import {reactive,ref, toRefs} from "vue";


// const {tasks} = storeToRefs()


const x = useTaskStore();
const y = storeToRefs(x);

//chave para reatividade na store
const {tasks, taskEdit, idEdit, titleEdit } = storeToRefs(x);

const ux = useUserStore();
const uy = storeToRefs(ux);
 
const title= titleEdit;
//const title= idEdit;
//const title=taskEdit;// chama o objeto

//const title=taskEdit;// chama o objeto

//  const result = Object.entries(taskEdit);
  //const result = Object.entries(taskEdit);

//const title = idEdit;
//const title = x.getTaskEdit();
//const title = taskEdit.value.title; //(1)
// const title = taskEdit.title; //nada
//const title = x.taskEdit.title; //igual (1)
//const title = taskEdit.value.title; // igual (1)

//const title = taskEdit.value.title; //(1)
// const title = taskEdit.title; //nada
// const title = taskEdit.value; //igual (1)
//const title = taskEdit.value.title; // igual (1)
//const title = taskEdit.value.title;
 
 


function cancelEdit(){
  x.setTaskEdit(null);
  this.title="";

}

async function getTasks(){
    await x.fetchTasks();
    tasks.value = x.tasks;
    // console.log(tasks.value[0].id);
    
}

function selectCreateUpdate(){
  console.log("ID_EDIT: "+idEdit.value);
  console.log("TITLE_EDIT: "+titleEdit.value);
  if(idEdit.value<0){
    console.log("==:>Create");
    createTasks(title.value);
  }
  else{
    console.log("==:>Update");
    updateTask(idEdit.value);
  }
}

async function createTasks(nome){
    
    const item = {
          user_id: ux.user.id,
          title: nome,
          is_complete: "false"
          
        }
    try{
      await x.createTasks(item);
     // getTasks();
    }
    catch (e){
      alert(e.message);
    }
    finally{
      x.setTaskEdit(null);
    }
}



async function updateTask(id){
     const indexOf = tasks.value.findIndex( (element) => element.id === id);
      const item = {
          id: id,
          user_id: ux.user.id,
          title: title.value,
          //is_complete: state.value.,
          is_complete: tasks.value[indexOf].is_complete
          
        }
   try{
      console.log("ID - "+tasks.value[0].id);
      console.log(ux.user.id);
      await x.updateTasks(item);
      //getTasks();
      
    }
    catch (e){
      alert(e.message);
    }
    finally{
      x.setTaskEdit(null);
    }
}




</script>

<style>

</style>
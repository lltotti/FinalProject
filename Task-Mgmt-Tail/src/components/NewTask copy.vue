<template>
    <div class="mt-2 py-5 border">
        <!-- <h1 class="text-4xl">Hello {{ux.user.email}} </h1> -->
        <div class="mt-2 flex flex-row justify-start">
            <!-- <label name="title"> Title</label><input type="text" name="title" v-model="x.taskEdit.title"> -->
            <label name="title"> Title</label>
            <input class="w-full py-3 pl-3 mb-4 bg-white rounded-lg" type="text" name="title" v-model="title" >
           
            <button class="w-full inline-block px-6 py-3 mb-4 text-sm text-white font-bold leading-loose bg-gray-500 hover:bg-gray-600 rounded transition duration-200" @click="selectCreateUpdate()">Add Task</button>
            {{title}}
            <!-- {{"*"+taskEdit.title+"*"}}
            {{" ["+x.taskEdit.title+"]"}} -->
            {{"*"+idEdit+"*"}}
            {{"*"+titleEdit+"*"}}
            <p></p><br>
            <!-- <p>{{result}}</p> -->
        </div>
        <div>
            <button @click="selectCreateUpdate()" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-full"> Add Task</button>
      </div>
    </div>
</template>

<script setup>
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
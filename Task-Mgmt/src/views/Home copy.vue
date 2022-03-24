<template>
  
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  
  <!-- {{myContacts[0]}} -->
  <!-- <p>Contacts: {{fiveContacts.length}}</p>  -->
  <div class="mt-2 mx-auto">
      <div class="mt-2">
          <button @click="signOut()" class="bg-red-600 mt-2 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full"> Sign Out</button>
          
      </div>
      <div class="mt-2">
            <label name="user"> Title</label><input type="text" name="title" v-model="title">
            
        </div>
        <div class="mt-2">
            <label name="pass"> State</label><input type="text" name="passw" v-model="state" >
        </div>
           
        
      <div>
        <button @click="createTasks()" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-full"> Add Task</button>
      </div>
      <div>
        <h1 class="text-4xl"> TASKS</h1>
        <table >
            <tr>
              <th style="padding:10px;">ID</th>
              <th style="padding:10px;">User_Id</th>
              <th style="padding:10px;">Tittle</th>
              <th style="padding:10px;">Is completed</th>
              <th style="padding:10px;">Inserted at</th>
              <th style="padding:10px;">Actions</th>
            
            </tr>
            <tr v-for="task in tasks" :key="task.id" :id="task.id">
              <td style="padding:10px;">{{task.id}}</td>
              <td style="padding:10px;" >{{task.user_id}}</td>
              <td style="padding:10px;">{{task.title}}</td>
              <td style="padding:10px;">{{task.is_complete}}</td>
              <td style="padding:10px;">{{task.inserted_at}}</td>
              <td>
              <button @click="updateTask(task.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Edit</button>
              <button @click="completeTask(task.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Complete</button>
              <button @click="deleteTask(task.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Delete</button>

              </td>
            </tr>
          </table>
      </div>
      <div>
        <table >
            <tr>
              <th style="padding:10px;">ID</th>
              <th style="padding:10px;">User_Id</th>
              <th style="padding:10px;">Tittle</th>
              <th style="padding:10px;">Is completed</th>
              <th style="padding:10px;">Inserted at</th>
              <th style="padding:10px;">Actions</th>
            
            </tr>
            <tr v-for="task in tasks" :key="task.id" :id="task.id">
              <td style="padding:10px;">{{task.id}}</td>
              <td style="padding:10px;" >{{task.user_id}}</td>
              <td style="padding:10px;">{{task.title}}</td>
              <td style="padding:10px;">{{task.is_complete}}</td>
              <td style="padding:10px;">{{task.inserted_at}}</td>
              <td>
              <button @click="updateTask(task.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Edit</button>
              <button @click="completeTask(task.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Complete</button>
              <button @click="deleteTask(task.id)" class="bg-indigo-500 mt-2 hover:bg-violet-400 text-white font-bold py-1 px-2 mx-1 rounded-full"> Delete</button>

              </td>
            </tr>
          </table>
      </div>

  </div>
  
  

</template>

<script setup>
import { storeToRefs } from "pinia";
import {useTaskStore} from "../store/task.js";
import {useUserStore} from "../store/user"
import {reactive,ref} from "vue";
import {useRouter} from 'vue-router';


const x = useTaskStore();
const y = storeToRefs(x);

 const ux = useUserStore();
 const uy = storeToRefs(ux);
const router = useRouter();

const tasks = ref([]);

const title=ref("");
const state=ref("");




async function getTasks(){
    await x.fetchTasks();
    tasks.value = x.tasks;
    console.log(tasks.value[0].id);
    
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
     const item = {
          user_id: ux.user.id,
          title: tasks.value[indexOf].title,
          is_complete: !tasks.value[indexOf].title.is_complete
          
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
</script>





<style>


</style>
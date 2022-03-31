<template>
  <section>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  
  <!-- {{myContacts[0]}} -->
  <!-- <p>Contacts: {{fiveContacts.length}}</p>  -->
      
                 
        
      <Nav/>
      <NewTask/>
    
    <div class="flex flex-wrap justify-around mx-auto rounded-lg py-0">
      <div class="w-2/4">
        <h2 class="text-xl bold florence-red-border bg-white border-4 font-sans text-center rounded-lg font-Roboto py-0"> TASKS</h2>
        
        <div class="scroll border flex-row bg-white florence-red-border scrollbar scrollbar-thumb-custom scrollbar-track-custom-light overflow-y-scroll rounded-lg">
          
          
          <div class="flex flex-wrap items-center" >
          <TaskItem v-for="task in tasks" :key="task.id" :id="task.id" :item="task" :showComplete="false">
          </TaskItem>
          </div>
        </div>  
      </div>
      <div class="w-2/4">
        <h2 class="text-xl bold florence-blue-border bg-white border-4 font-sans text-center rounded-lg font-Roboto py-0"> COMPLETE</h2>
        <div class="scroll border flex-row bg-white florence-blue-border scrollbar scrollbar-thumb-custom scrollbar-track-custom-light overflow-y-scroll rounded-lg">
          <div class="flex flex-wrap items-center" >
            <TaskItem v-for="task in tasks" :key="task.id" :id="task.id" :item="task" :showComplete="true" :designCard="param">
            </TaskItem>
            </div>
          </div>
        </div>
    </div>
     


  </section>
  
  

</template>

<script setup>
import { storeToRefs } from "pinia";
import {useTaskStore} from "../store/task.js";
import {useUserStore} from "../store/user"
import {reactive,ref} from "vue";
import {useRouter} from 'vue-router';
import TaskItem from "../components/TaskItem.vue"
import Nav from "../components/Nav.vue"
import NewTask from "../components/NewTask.vue"

// const {tasks} = storeToRefs()


const x = useTaskStore();
const y = storeToRefs(x);

//chave para reatividade na store
const {tasks} = storeToRefs(x);

 const ux = useUserStore();
 const uy = storeToRefs(ux);

 const a="";
const router = useRouter();

// const tasks = ref([]);

const title=ref("");
const state=ref("");

const param={
      div1: "w-full lg:w-1/5  mb-6 lg:mb-0 self-start ",
      div2: "py-1 px-1 pb-0 florence-blue-border bg-gray-100 rounded-lg lg:text-center border drop-shadow-lg hover:border-blue-700 m-1 ",
      h3: "text-base  text-white font-heading mb-8 font-Roboto florence-blue rounded-lg p-1",
      btn: "flex flex-wrap cursor-pointer px-1 w-full justify-center text-gray-500 font-semibold bg-gray-200 hover:bg-gray-300 rounded border m-0"
    }

        
        
        
     
    

async function getTasks(){
    await x.fetchTasks();
    tasks.value = x.tasks;
    // console.log(tasks.value[0].id);
    
}
async function createTasks(){
    const item = {
          user_id: ux.user.id,
          title: title.value,
          is_complete: "false"
          
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
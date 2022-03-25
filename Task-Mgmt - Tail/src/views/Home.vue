<template>
  <section>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  
  <!-- {{myContacts[0]}} -->
  <!-- <p>Contacts: {{fiveContacts.length}}</p>  -->
      
                 
        
      <Nav/>
      <NewTask/>
      <div class="my-10 border">
        <h2 class="text-4xl florence-red"> TASKS</h2>
        <TaskItem v-for="task in tasks" :key="task.id" :id="task.id" :item="task" :showComplete="false">

        </TaskItem>
      </div>
      <div class="my-5 border">
        <h2 class="text-4xl bg-green-100"> COMPLETE</h2>
        <TaskItem v-for="task in tasks" :key="task.id" :id="task.id" :item="task" :showComplete="true">

        </TaskItem>
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

 
const router = useRouter();

// const tasks = ref([]);

const title=ref("");
const state=ref("");


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
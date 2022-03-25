<template >
    <section class="florence-blue h-screen" >
    <router-view class="app-main" /> <!-- your routes will load inside of these tags -->    
    <router-link to="/auth"/>
 

  
  </section>
  
</template>
 
 
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user.js'
import {useTaskStore} from "./store/task.js";
import Auth from "./views/Auth.vue"

 
const router = useRouter()
const userStore = useUserStore()
const taskStore = useTaskStore()
const { user } = storeToRefs(userStore)
const {task} = storeToRefs(taskStore)
 
onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      console.log("APP.VUE FETCHUSER")
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/' });
      console.log("APP.VUE DASH");
    }
  } catch (e) {
    console.log(e)
  }
})
</script>
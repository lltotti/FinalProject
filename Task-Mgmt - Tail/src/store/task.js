import { defineStore } from "pinia";
import { supabase } from "../supabase";

import { storeToRefs } from "pinia";
import {useUserStore} from "../store/user";



export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    taskEdit: 
      {id: "teste",
      user_id:"teste",
      title: "teste",
      is_complete: "teste"
    },
    idEdit:-1,
    titleEdit:""
     
    
  }),
  getters:{
    getidEdit(){
      return this.idEdit;
    },
    getTaskEdit(){
      return this.taskEdit;
    },
    
  },
  actions: {
     setTaskEdit(item){
      this.taskEdit=item;
      if(item!==null){
        this.titleEdit=item.title,
        this.idEdit=item.id
        
      }
      else{
        this.idEdit=-1;
        this.titleEdit="";
      }
      
    },
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    //update, create and delete
    async createTasks(item){
      const { data, error } = await supabase
      .from('tasks')
      .insert([
        {  
          user_id: item.user_id,
          title: item.title,
          is_complete: item.is_complete,
        }
      ])
      if (error) throw error;
      this.fetchTasks();
    },

    async updateTasks(item){
      console.log("ID NO UPDATE"+item.id);
      const { data, error } = await supabase
      .from('tasks')
      .update({
        title: item.title,
        is_complete: item.is_complete
        })
      .match({ 
        id: item.id
         })
        if (error) throw error;
        this.fetchTasks();
        
    },

    async upsertTasks(item){
      console.log("ID NO UPDATE"+item.id);
      
      
      const { data, error } = await supabase
  .from('tasks')
  .upsert({
    
    title: item.title,
    is_complete: item.is_complete
    })
      
     if (error) throw error;
        
    },
    async deleteTasks(id){
      console.log("ID dentro:"+id);
      const { data, error } = await supabase
      .from('tasks')
      .delete()
      .match({ id: id })
      if (error) throw error;
    },

    async upsert(item){
      const { data, error } = await supabase
      .from('messages')
      .upsert({ id: 3, message: 'foo', username: 'supabot' })
      if (error) throw error;  
    
    }
    
  },
  



});
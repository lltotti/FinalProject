import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isSignIn: true,
    isRecoverPassw: false,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      //console.log("asdfasdfasdf");
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      console.log("ERRO: "+error);
      console.log("USER: "+user);
      if (error) throw error;
        
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signIn(email, password) {
      //console.log("asdfasdfasdf");
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      if (error) throw error;
        
      if (user) {
        this.user = user;
        console.log(this.user);
        
      }
    },
    async signOut() {
      //console.log("asdfasdfasdf");
      const { error } = await supabase.auth.signOut()
      this.user=null;
      if (error) throw error;
            
    },
    
    async recoverPassw(email){
      const { data, error } = await supabase.auth.api
      .resetPasswordForEmail(email)
      if (error) throw error;
    
    },
    //signIn and signOut
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
}); 
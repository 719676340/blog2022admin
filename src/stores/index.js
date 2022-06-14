import { defineStore } from 'pinia'




export const myStore = defineStore('storetoken',{
    state: () => ({
      token:localStorage.getItem('token')?localStorage.getItem('token'):''
    }),
    actions: {
      changetoken(token) {
        this.token=token
        localStorage.setItem('token', token);
      }
    }
  })
  
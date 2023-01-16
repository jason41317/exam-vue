import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const state = {
    isLoggedIn: !!localStorage.getItem('accessToken') ?? false,
    user: []
  }

  function setUser(userData) {
    user = userData
  }

  return { user, isLoggedIn, setUser }
})

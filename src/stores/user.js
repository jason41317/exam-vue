import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let isLoggedIn = !!localStorage.getItem('accessToken') ?? false
  let user = []

  function setUser(userData) {
    user = userData
    isLoggedIn = true
  }

  function logoutUser() {
    isLoggedIn = false
  }

  return { user, isLoggedIn, setUser, logoutUser }
})

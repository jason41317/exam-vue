<script>
import { AuthApi } from "../mixins"
import { useUserStore } from '../stores/user'
  
export default {
    mixins: [AuthApi],
    setup() {
        const userState = useUserStore()
        return { userState }
    },
    methods: {
        callback(code) {
            this.googleCallback({code})
            .then(({ data }) => {
                localStorage.setItem('accessToken', data.accessToken)
                this.getAuthenticatedUser()
                    .then(({ data }) => {
                        this.userState.setUser(data)
                        this.userState.isLoggedIn = true
                        this.$router.push({ name: 'home'})
                        // console.log(this.userState)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }).catch(error => {
                console.log(error)
            })
        }
    },
    created() {
        const { code } = this.$route.query
        if (!code) {
            this.$router.push({ path: '/' });
            return
        }
        this.callback(code)
  },
}    
</script>

<template>
    <div></div>
</template>

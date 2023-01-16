<script>
import { AuthApi } from "../mixins"
  
export default {
    mixins: [AuthApi],
    methods: {
    onVerifyEmail(data) {
      this.verifyEmail(data)
      .then(({ data }) => {
        console.log(data)
        this.$router.push({ path: '/login', query: {msg: data.message}})
      }).catch(error => {
        console.log(error)
      })
    }
    },
    created() {
        const { id, hash } = this.$route.query
        if (!id && !hash) {
            this.$router.push({ name: 'EmailVerification' })
            return
        }
        this.onVerifyEmail({ id, hash })
    }
}    
</script>

<template>
    <div></div>
</template>

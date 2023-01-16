<script>
import { reactive } from "@vue/reactivity"
import { useUserStore } from '../stores/user'
import { AuthApi } from "../mixins"
  
export default {
    mixins: [AuthApi],
    data() {
        return { 
            user: {}
        }
    },
    setup() {
        const userState = useUserStore()
        return { userState }
    },

    methods: {
        getUser() {
            this.getAuthenticatedUser()
                .then(({ data }) => {
                    this.user = data.data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        onLogout() {
            this.revokeAuthentication().then(data => {
                this.userState.logoutUser()
                this.$router.push({ path: '/login' })
                localStorage.clear()
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.getUser()
    }
}    
</script>

<template>
    <section class='vh-100'>
        <div class='container py-5 h-100' style='width: 700px'>
            <div class='row d-flex justify-content-center align-items-center h-100'>
                <div class='col col-xl-10'>
                    <div class='card' style='border-radius: 1rem;'>
                        <div class='card-body p-4 p-lg-5 text-black'>
                            <div class='row mb-1'>
                                <div class='col-md-3'>Name :</div>
                                <div class='col-md-9'>{{ user.name }}</div>
                            </div>
                            <div class='row mb-1'>
                                <div class='col-md-3'>Email :</div>
                                <div class='col-md-9'>{{ user.email }}</div>
                            </div>
                            <div class='row mb-1'>
                                <div class='col-md-3'>Last Login :</div>
                                <div class='col-md-9'>{{ user.lastLoginAt }}</div>
                            </div>
                            <div class='row mb-1'>
                                <div class='col-md-12'>
                                    <button
                                        @click='onLogout()'
                                        class='btn btn-primary'
                                        style='width: 100%'
                                        type='button'>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { AuthApi } from '../mixins'
import { useUserStore } from '../stores/user'

export default {
    mixins: [ AuthApi ],
    setup() {
        const user = reactive({
            email: '',
            password: '',
        })

        const msg = ''

        const userState = useUserStore()

        const err = reactive({
            showErrors: false,
            errors: []
        })

        return {
            user, err, userState, msg
        }
    },
    methods: {
        onLogin() {
            const { email, password } = this.user
            this.login({ email, password })
                .then(({ data }) => {
                    localStorage.setItem('accessToken', data.accessToken)
                    this.getAuthenticatedUser()
                        .then(({ data }) => {
                            this.userState.setUser(data)
                            this.userState.isLoggedIn = true
                            // console.log(this.userState.isLoggedIn)
                            this.$router.push({ name: 'home'})
                            // console.log(this.userState)
                        })
                        .catch(error => {
                            console.log(error)
                            const { message } = error.response.data
                            this.err.errors = {email: [message]}
                            this.err.showErrors = true
                        })
                })
                .catch(error => {
                    const { errors } = error.response.data
                    this.err.errors = errors
                    this.err.showErrors = true
                })
        },
        onGoogleLogin() {
            this.googleLogin()
                .then(({data}) => {
                    console.log(data)
                    window.location = data
                })
        }
    },
    created() {
        const { msg } = this.$route.query
        this.msg = msg
        this.$router.replace({'query': null});
    }
}
</script>

<template>
    <section class='vh-100'>
        <div class='container py-5 h-100' style='width: 500px'>
            <div class='row d-flex justify-content-center align-items-center h-100'>
                <div class='col col-xl-10'>
                    <div class='card' style='border-radius: 1rem;'>
                        <div class='card-body p-4 p-lg-5 text-black'>
                            <h5 class='fw-normal mb-3 pb-3'>Sign into your account</h5>
                            <div v-if='err.showErrors' class="alert alert-danger" role="alert">
                                <div v-for='(error, index) in err.errors' :key='index'>
                                    {{ error[0] }}
                                </div>
                            </div>
                            <div v-if='msg' class="alert alert-success" role="alert">
                                {{msg}}
                            </div>
                            <div class='form-outline mb-4'>
                                <label class='form-label' for='email'>Email address</label>
                                <input 
                                    v-model='user.email'
                                    type='email'
                                    id='email'
                                    class='form-control' />
                            </div>
                            <div class='form-outline mb-4'>
                                <label class='form-label' for='password'>Password</label>
                                <input
                                    v-model='user.password'
                                    type='password'
                                    id='password'
                                    class='form-control' />
                            </div>

                            <div class='pt-1 mb-4'>
                                <button
                                    @click='onLogin()'
                                    class='btn btn-primary' 
                                    style='width: 100%' 
                                    type='button'>
                                    Login
                                </button>
                            </div>

                            <div class='pt-1 mb-4'>
                                <button
                                    @click='onGoogleLogin()'
                                    class='btn' 
                                    style='width: 100%' 
                                    type='button'>
                                    Use Google Account
                                </button>
                            </div>

                            <p class='mb-5 pb-lg-2' style='color: #393f81;'>Don't have an account? 
                                <RouterLink to="/register">Register Here</RouterLink>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

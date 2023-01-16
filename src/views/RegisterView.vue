<script>
import { reactive } from "@vue/reactivity"
import { AuthApi } from '../mixins'
import { useUserStore } from '../stores/user'

export default {
    mixins: [ AuthApi ],
    setup() {
        const user = reactive({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        })

        const userState = useUserStore()

        const err = reactive({
            showErrors: false,
            errors: [],
            loading: false
        })

        return {
            user, err, userState
        }
    },
    methods: {
        onRegister() {
            this.err.showErrors = false
            this.err.loading = true
            this.register(this.user)
                .then((data) => {
                    this.$router.push({ name: 'login', query: {msg: 'Please check email to verify.'}})
                    // const { email, password } = this.user
                    // this.login({ email, password })
                    //     .then(({ data }) => {
                    //         localStorage.setItem('accessToken', data.accessToken)
                    //         this.getAuthenticatedUser()
                    //             .then(({ data }) => {
                    //                 this.userState.setUser(data)
                                    
                    //             })
                    //     })
                    this.loading = false
                })
                .catch(error => {
                    const { errors } = error.response.data
                    this.err.errors = errors
                    this.err.showErrors = true
                    this.err.loading = false
                })
        }
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
                            <h5 class='fw-normal mb-3 pb-3'>Register</h5>
                            <div v-if='err.showErrors' class="alert alert-danger" role="alert">
                                <div v-for='(error, index) in err.errors' :key='index'>
                                    {{ error[0] }}
                                </div>
                            </div>
                            <div class='form-outline mb-4'>
                                <label class='form-label' for='first_name'>First Name</label>
                                <input
                                    v-model='user.firstName' 
                                    type='text' 
                                    id='first_name' 
                                    class='form-control' />
                            </div>
                            <div class='form-outline mb-4'>
                                <label class='form-label' for='middle_name'>Middle Name</label>
                                <input
                                    v-model='user.middleName' 
                                    type='text' 
                                    id='middle_name' 
                                    class='form-control' />
                            </div>
                            <div class='form-outline mb-4'>
                                <label class='form-label' for='last_name'>Last Name</label>
                                <input
                                    v-model='user.lastName'
                                    type='text' 
                                    id='last_name'
                                    class='form-control' />
                            </div>
                            <div class='form-outline mb-4'>
                                <label class='form-label' for='email'>Email</label>
                                <input 
                                    v-model='user.email' 
                                    type='text' 
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
                            <div class='form-outline mb-4'>
                                <label class='form-label' for='confirm_password'>Confirm Password</label>
                                <input
                                    v-model='user.passwordConfirmation'
                                    type='password'
                                    id='confirm_password'
                                    class='form-control' />
                            </div>

                            <div class='pt-1 mb-4'>
                                <button
                                    @click='onRegister()'
                                    :disabled='err.loading'
                                    class='btn btn-primary'
                                    style='width: 100%'
                                    type='button'>
                                    Register
                                </button>
                            </div>

                            <p class='mb-5 pb-lg-2' style='color: #393f81;'>Already have an account? 
                                <RouterLink to="/login">Login Here</RouterLink>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

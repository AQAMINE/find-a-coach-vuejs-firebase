<template>
    <base-card>
        <base-spinner v-if="isLoading"></base-spinner>
        <form v-else @submit.prevent="submitForm">
            <p v-if="getErrors">{{getErrors}}</p>
            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" id="email" v-model.trim="email">
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password">
            </div>
            <p v-if="!fromIsValid">Please enter a valid email and password must be at least 6 characters long</p>
            <base-button>{{submitButtonCaption}}</base-button>
            <base-button @click="switchAuthMode" type="button" mode="flat">{{switchModeButtonCaption}}</base-button>
        </form> 
    </base-card>

</template>


<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            fromIsValid: true,
            mode: 'login',
            isLoading : false,
            errors : ''
        }
    },
    computed:{
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Login'
            }else{
                return 'Signup'
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'login'){
                return 'Signup instead'
            }else{
                return 'Login instead'
            }
        },
        getErrors(){
            const errors = this.$store.getters['getErrors'];
            return errors && this.mode=='login' ? 'Email or password invalid!' : errors && this.mode=='signup' ? 'Email already exists' : '' ;
        }

    },
    methods:{
        async submitForm(){
            //rets
            this.$store.commit('seetErrors' , '');
            this.fromIsValid = true;


            if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
                return this.fromIsValid = false;
            }
            //form validated send http request to the server now
            const actionPayload = {
                    email: this.email,
                    password: this.password
                };

                
            if(this.mode === 'login'){
                this.isLoading = true;
                await this.$store.dispatch('login',actionPayload);
                this.isLoading = false;
            }else{
                this.isLoading = true,
                await this.$store.dispatch('signup',actionPayload);
                this.isLoading = false;
            }

            const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
            //if no errors go to dashboard
            if(!this.$store.getters.getErrors){
                this.$router.replace(redirectUrl); 
            } 
            

        },
        switchAuthMode(){
            this.mode === 'login' ? this.mode = 'signup' : this.mode = 'login';
        }

    }
}
</script>

<style scoped>
p{
    color: red;
}
form {
    margin: 1rem;
    border-radius: 12px;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}
</style>

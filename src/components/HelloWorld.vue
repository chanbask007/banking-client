<template>

  <div style="width:35%;margin-right:auto;margin-left:auto">
    <b-tabs content-class="mt-3" fill>          
    <b-tab title="Login" active>
      <span style="color:red">{{ errors.first('email') }}</span>
      <b-form-input v-validate="{ required: true, email: true }" type="email" name="email" v-model="loginEmail"  placeholder="Enter email"></b-form-input><br>
      <span style="color:red">{{ errors.first('password') }}</span>      
      <b-form-input v-validate="'required|min:6'"  type="password" name="password" v-model="loginPassword"  placeholder="Enter password"></b-form-input><br>
      <b-button variant="success" @click="loginUser">Login</b-button>
      <b-button @click="loginReset" variant="danger">Reset</b-button>

    </b-tab>
    <b-tab title="Register">
      <span style="color:red">{{ errors.first('Registration Email') }}</span>
      <b-form-input name="Registration Email" v-validate="{ required: true, email: true }" v-model="registerEmail"  placeholder="Enter email"></b-form-input><br>
      <span style="color:red">{{ errors.first('Registration Password')}}</span>
      <b-form-input type="password" v-validate="'required|min:6'" name="Registration Password" v-model="registerPassword"  placeholder="Enter password"></b-form-input><br>
    <!-- <b-form-input name="role" v-model="role"  placeholder="role"></b-form-input><br> -->
      <span style="color:red">{{ errors.first('balance')}}</span>  
    <b-form-input name="balance" v-validate="{required:true}" type="number" v-model="registerBalance"  placeholder="enter balance"></b-form-input><br>
    <span style="color:red">{{ errors.first('role')}}</span>  
    <b-form-select name="role" v-validate="{required:true}" v-model="selected" :options="options">
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
    </b-form-select><br><br>
    <!-- <b-form-input class="error" v-html="error"></b-form-input> -->
    <b-button @click="register" variant="success">Register</b-button>
    <b-button @click="registerReset" variant="danger">Reset</b-button>
      
      </b-tab>
    </b-tabs>
  </div>
  
  
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'HelloWorld',
  data () {
    return {
      error: null,
      loginEmail: '',
      loginPassword: '',
      registerEmail: '',
      registerPassword: '',
      registerBalance: '',
      registerRole: null,
      selected: null,
      options: [
        {value:null, text:'Select Role', disabled:true},
        { value: 'customer', text: 'Register as Customer' },
        { value: 'banker', text: 'Register as Banker' }
      ]

    }
  },
  methods:{
   async loginUser(){
    //  console.log('user', this.loginEmail, this.loginPassword);
    
    const response = await AuthenticationService.login({
      email: this.loginEmail,
      password: this.loginPassword
    })
    this.$store.dispatch('setToken',response.data.token)
    this.$store.dispatch('setUser', response.data.user)
    // console.log('token ', this.$state.token);
    console.log(response);
    if(response.data.user.role=='customer'){
    this.$router.push({path:'/transactions'})
    }
    if(response.data.user.role == 'banker'){
      this.$router.push({path:'/users'})
    }

    },
    async register(){
        //    console.log("register button was clicked!", this.email, this.password)
        try{
        const response = await AuthenticationService.register({
            email:this.registerEmail,
            password: this.registerPassword,
            role: this.selected,
            balance: this.registerBalance
        })
        this.$store.dispatch('setToken',response.data.token)
        this.$store.dispatch('setUser',response.data.user)
        this.$router.push({path:'/transactions'})

       
       } catch(error){
           this.error = error.response.data.error
       }
       },
       loginReset(){
         this.loginPassword='',
         this.loginEmail=''
       },
       registerReset(){
         this.registerEmail='',
         this.registerPassword='',
         this.registerBalance=''

       }
   }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}
input[aria-invalid="true"] {
  border-color: red;
}

input[aria-invalid="false"] {
  border-color: green;
}
</style>

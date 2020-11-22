<template>
  <div>
      <h1>Banker</h1><b-btn @click="logout" variant="danger">Logout</b-btn>
      <md-table md-card>
      <md-table-row>
        <md-table-head>User Mail</md-table-head>
        <md-table-head>Current Balance</md-table-head>
      </md-table-row>
      <md-table-row v-for="user in users" :key="user.id">
        <md-table-cell><router-link :to="{ path:'/users', params: { id: 123 }}"> {{user.email}}</router-link></md-table-cell>
        <!-- <router-link :to="{ name: 'Users', params: { id: 123 }}">User</router-link> -->
        <md-table-cell>{{user.balance}}</md-table-cell>
      </md-table-row>
      
    </md-table>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import AccountService from '@/services/AccountService'
export default {

    name: 'Users',
    data(){
        return {
            bankersData: null,
            error: null,
            users: null

        }
    },
    methods:{
        async getUsers(){
            try {
            const response = await AuthenticationService.getUsers()
            this.users = response.data.users,
            this.bankersData = response.data.banker
            } catch (error) {
                this.error = error.response.data.error                
            }
        },
        logout(){
            
            this.$router.push('/')
            // localStorage.clear()

        }
    },
    beforeMount(){
        this.getUsers()
    }

}
</script>

<style>
.md-table-head-container, .md-table-head-label{
    text-align: center;
}

</style>
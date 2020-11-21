<template>
  <div>
      <h1>Users Details</h1>
      <md-table md-card>
      <md-table-row>
        <md-table-head>User Mail</md-table-head>
        <md-table-head>Current Balance</md-table-head>
      </md-table-row>
      <md-table-row v-for="user in users" :key="user.id">
        <md-table-cell><router-link :to="{name:'Users',params: { userId: user.email }}"> {{user.email}}</router-link></md-table-cell>
        <md-table-cell>{{user.balance}}</md-table-cell>
      </md-table-row>

      
    </md-table>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {

    name: 'Users',
    data(){
        return {
            
            error: null,
            users: null,
            userId: null

        }
    },
    methods:{
        async getUsers(){
            try {
            const response = await AuthenticationService.getUsers()
            this.users = response.data.users
            } catch (error) {
                this.error = error.response.data.error                
            }
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
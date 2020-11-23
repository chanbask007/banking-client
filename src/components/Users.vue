<template>
  <div><div>
      <div style="width:30%;display: inline-block;">
      <md-card >
          <md-card-header>
        <md-card-header-text>
          <div class="md-title">&#129333;<span style="margin-left:20px" v-if="bankersData">{{bankersData.email}}</span></div>
          <div class="sub-head" v-if="bankersData"><u>{{bankersData.role}}</u></div>
        </md-card-header-text>
          </md-card-header>
      </md-card>
      </div>
      <div>
      <b-btn @click="logout" variant="danger">Logout</b-btn>
      </div>
      </div>
      <div style="width: 50%;margin-left: auto;margin-right: auto;">
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
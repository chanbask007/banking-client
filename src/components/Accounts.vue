<template>
<div>
  <h1>Accounts Component</h1>
  <b-btn variant="success" @click="accounts">click</b-btn>
   <div v-if="transactionsData">
      <ul>
  <li v-for="transaction in transactionsData" :key="transaction.id"> {{transaction.balance}} {{transaction.email}} </li>
  </ul>
  </div> 
</div>  
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
    name: 'Accounts',
    data(){
        return {
            error: null,
            transactionsData: null

        }
        
    },
    methods: {
        async accounts(){
            try{
            const response = await AuthenticationService.accounts()
            this.transactionsData = response.data.users
            console.log(this.transactionsData);
            console.log(typeof(this.transactionsData));
            }catch(error){
                this.error = error.response.data.error
            }
        }

    }

}
</script>

<style>

</style>
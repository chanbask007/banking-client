<template><div>
  <div style="display:flex">
   <div style="width:60%;">
       <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users Transactions</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>User Mail</md-table-head>
        <md-table-head>Credit/Debit</md-table-head>
        <md-table-head>Amount</md-table-head>
      </md-table-row>
      <md-table-row v-for="transaction in transactionsDetails" :key="transaction.id">
        <md-table-cell md-numeric>{{transaction.id}}</md-table-cell>
        <md-table-cell><router-link :to="{name:'Users',params: { userId: transaction.userEmail }}"> {{transaction.userEmail}}</router-link></md-table-cell>
        <md-table-cell>{{transaction.transactionType}}</md-table-cell>
        <md-table-cell>{{transaction.transactionAmount}}</md-table-cell>
      </md-table-row>

      
    </md-table>
  </div>
    </div>   
  <div style="margin-left: auto;margin-right: auto;margin-top:40px">
      <md-card>
          <md-card-header>
        <md-card-header-text>
          <div class="md-title">&#8377; {{$store.state.user.balance}}</div><br>
          <div class="md-subhead"><u>{{$store.state.user.email}}</u></div>
        </md-card-header-text>
          </md-card-header>
      </md-card>      

      <h3><u> Make Transaction</u></h3><br>
      <b-form-select v-model="transactionType" :options="options">
      <div class="mt-3">Selected: <strong>{{ transactionType }}</strong></div>
      </b-form-select><br><br>
      <span style="color:red">{{ errors.first('Amount')}}</span>
      <b-form-input v-validate="'required'" name="Amount" v-model="transactionAmount" type="number" placeholder="Enter Amount"></b-form-input><br>
      <b-btn @click="makeTransactions" variant="success">Make Transaction</b-btn>
      <b-btn @click="logout" variant="danger">Logout</b-btn>
  <div> 

  </div>
  </div>
  </div>  
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import TransactionService from '@/services/TransactionService'
export default {
    name: 'Transactions',
    data (){

        return {
            transactionAmount: null,
            transactionType: null,
            error: null,
            transactionsDetails: null,
            selected: null,
            options: [
                {value:null, text:'Select Transaction Type', disabled:true},
                { value: 'debit', text: 'Debit from Account'},
                { value: 'credit', text: 'Deposit to Account' }
            ]
            
        }        
    },
    computed: {
      rows() {
        return this.items.length
        }
      },
    methods:{
        async makeTransactions(){
            // console.log('transaction data ',this.transactionAmount, this.transactionType)
           try{
               
        const response = await AuthenticationService.transactions({transactionType:this.transactionType,transactionAmount: this.transactionAmount})       
       } catch(error){
           this.error = error.response.data.error
       }
        },

       async getTransactionsDetails(){
            try {
                console.log('getTransactions called!');
                const response = await AuthenticationService.getTransactionsDetails()
                this.transactionsDetails = response.data.transactions
                console.log(this.transactionsDetails);
                                
            } catch (error) {
                this.error = error.response.data.error
            }
        },
        logout(){
            this.$router.push('/')
        }
    },
    beforeMount() {
        this.getTransactionsDetails()
    } 


}
</script>

<style>

</style>
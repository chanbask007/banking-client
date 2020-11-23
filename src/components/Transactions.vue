<template><div>
  <div style="display:flex">
   <div style="width:65%;">
       <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users Transactions</h1>
      </md-table-toolbar>
    <div style="color:red" v-if="!transactionsDetails">No Transactions Found!</div>  
    <div v-if="transactionsDetails">
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>User Mail</md-table-head>
        <md-table-head>Credit/Debit</md-table-head>
        <md-table-head>Amount</md-table-head>
        <md-table-head>Date</md-table-head>
        <md-table-head>Time</md-table-head>
      </md-table-row>
      <md-table-row v-for="transaction in transactionsDetails" :key="transaction.id">
        <md-table-cell md-numeric>{{transaction.id}}</md-table-cell>
        <md-table-cell><router-link :to="{name:'Users'}"> {{transaction.userEmail}}</router-link></md-table-cell>
        <md-table-cell>{{transaction.transactionType}}</md-table-cell>
        <md-table-cell>{{transaction.transactionAmount}}</md-table-cell>
        <md-table-cell>{{transaction.createdAt|moment("DD MMM YY")}}</md-table-cell>
        <md-table-cell>{{transaction.createdAt|moment("hh:mm A")}}</md-table-cell>
      </md-table-row>
    </div>
      
    </md-table>
  </div>
    </div>   
  <div style="margin-left: auto;margin-right: auto;margin-top:40px">
      <md-card>
          <md-card-header>
        <md-card-header-text>
          <div class="md-title">&#8377; <span v-if="!updatedBalance">{{$store.state.user.balance}}</span><span v-if="updatedBalance">{{updatedBalance}}</span></div><br>
          <div class="md-subhead"><u>{{$store.state.user.email}}</u></div>
        </md-card-header-text>
          </md-card-header>
      </md-card>      

      <h3><u> Make Transaction</u></h3><br>
      <span v-if="error" style="color:red">No suffieient funds! </span>
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
            updatedBalance: null,
            transactionAmount: null,
            transactionType: null,
            error: null,
            transactionsDetails: null,
            selected: null,
            options: [
                {value:null, text:'Select Transaction Type', disabled:true},
                { value: 'debit', text: 'Debit from Account'},
                { value: 'credit', text: 'Deposit to Account' }
            ],
            customerDetails:null,
            
            
        }        
    },
    methods:{
        async makeTransactions(){
            // console.log('transaction data ',this.transactionAmount, this.transactionType)
           try{
               
        const response = await AuthenticationService.transactions({transactionType:this.transactionType,transactionAmount: parseFloat(this.transactionAmount)})
        this.transactionAmount = 0.00,
        this.transactionType = null,        
        this.error = null,
        this.updatedBalance = response.data.customer.updatedBalance
        console.log(this.updatedBalance);
        this.getTransactionsDetails()
       } catch(error){
           this.error = error.response.data.msg
       }
        },

       async getTransactionsDetails(){
            try {
                console.log('getTransactions called!');
                const response = await AuthenticationService.getTransactionsDetails()
                this.transactionsDetails = response.data.transactions
                this.customerDetails = response.data.customer
               
                                
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

<style scoped>
.md-table-cell-container {
    padding: 10px 10px 10px 10px;
}

</style>
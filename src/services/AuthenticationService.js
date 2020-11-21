import  Api from '@/services/Api'
import TransactionService from '@/services/TransactionService'
import AccountService from './AccountService'

export default {
    register(credentials){
        return Api().post('register', credentials)
    },
    login(credentials){
        return Api().post('login',credentials)
    },
    transactions(credentials){
        // const config = {headers:{'Authorization': `Bearer ${this.$store.state.token}`}}
        return TransactionService().post('transaction',credentials)
    },
    getTransactionsDetails(){
        return TransactionService().post('accounts')
    },
    getUsers(){
        return AccountService().get('users')
    }
}
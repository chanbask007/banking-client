import axios from 'axios'

export default()=>{
    // console.log(`the token is ${this.$store.state.token}`);
    return axios.create({
        baseURL: `http://localhost:8081`,
        headers: {'authorization': 'Bearer xyz eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoZWtoYXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiJzaGVraGFyMTIzNCIsInJvbGUiOiJiYW5rZXIiLCJiYWxhbmNlIjo3MDAwMCwiY3JlYXRlZEF0IjoiMjAyMC0xMS0xOFQxNjo0MTo0NC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0xMS0xOFQxNjo0MTo0NC4wMDBaIiwiaWF0IjoxNjA1OTQyMDQ3LCJleHAiOjE2MDYwMjg0NDd9.yQ8FJjP8EvS_oVrOuCngv9SujT6ZX-q2-buBxbGMizc'}
    })
}
import axios from 'axios'

export default()=>{
    return axios.create({
        baseURL: `http://localhost:8081`,
        headers: {'Authorization': 'Bearer xyz eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5iYXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiJjaGFuYmFzMTIzNCIsInJvbGUiOiJjdXN0b21lciIsImJhbGFuY2UiOjQ1NjAwLCJjcmVhdGVkQXQiOiIyMDIwLTExLTE4VDE1OjU5OjExLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTExLTIxVDAyOjA4OjE0LjAwMFoiLCJpYXQiOjE2MDU5MjUyODEsImV4cCI6MTYwNjAxMTY4MX0.rFThwiN0GFXFLsPVaqw7uO6txQXqxmN_wHCmZTnAnXs'}
    })
}

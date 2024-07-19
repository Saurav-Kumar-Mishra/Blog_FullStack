import axios from 'axios'



const createPostAPI = async(token,data)=>{
  try {
    const response=  await axios.post('http://localhost:3009/api/v1/createPost',JSON.stringify(data),{
      headers:{
        Authorization:'Bearer '+token
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default createPostAPI

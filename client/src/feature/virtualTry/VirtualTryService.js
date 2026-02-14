import axios from "axios"

const API_URL = "/api/virtual_try"


const tryClothsVirtualy = async (token, formData) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.post("/api/virtual_try", formData, options)
    console.log("response", response)
    return response.data

}


const virtualTryService = { tryClothsVirtualy }

export default virtualTryService
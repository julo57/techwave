import axios from "axios";

export default axios.create({
    baseURL:"https://techwavework.000.pe/",
    withCredentials: true,
})


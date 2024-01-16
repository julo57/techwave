import axios from "axios";

export default axios.create({
    baseURL:"http://techwavetrue.wuaze.com/",
    withCredentials: true,
})


import axios from "axios";

export default axios.create({
    baseURL:"http://techwave-online-shop.wuaze.com/",
    withCredentials: true,
})
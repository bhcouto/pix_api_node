import axios from "axios";
import "dotenv/config"


const isProduction = process.env.NODE_ENV === 'production';

export const api = axios.create({
    baseURL: isProduction ? process.env.API_URL_PROD : process.env.API_URL_HOMOLOG,
})
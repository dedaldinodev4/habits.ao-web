import { config } from "dotenv";

config();

const { API_URL } = process.env; 

export {
    API_URL
}
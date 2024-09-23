import axios from "axios";

export async function getOffers(){
    const req = await axios.get("http://localhost:3000/offers");
    return req.data;
}
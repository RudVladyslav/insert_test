import axios from "axios";
import {BTC_API, EXCHANGE_API} from "../consts";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
}

export const loadBtcToUsd = async () => {
    try {
        const {data: {USD}} = await axios.get(BTC_API)
        return {data: USD}
    } catch (e) {
        console.log(e)
        return {error: true}
    }
}

export const loadExchangeData = async () => {
    try {
        const {data} = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(EXCHANGE_API)}`
        );
        data.push({ccy: "UAH", buy: "1", sale: "1"});
        data.splice(2, 1);
        return data;
    } catch (e) {
        console.log(e)
        return {error: true}
    }
}

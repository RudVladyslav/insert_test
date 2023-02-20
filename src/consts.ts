export const TABLE_HEAD_TITLE: string[] = ['Currency/Current Date', 'Buy', 'Sell']
export const SELECT_DATA = ['UAH', 'USD', 'EUR', 'BTC']
export const BTC_API: string = 'https://blockchain.info/ticker'
export const EXCHANGE_API: string = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5'

export const SELECT_DATA_AFTER_CHS = Object.freeze({
    UAH: {value: 'UAH', array: ['USD', 'EUR']},
    USD: {value: 'USD', array: ['UAH', 'BTC']},
    EUR: {value: 'EUR', array: ['UAH']},
    BTC: {value: 'BTC', array: ['USD']}
})

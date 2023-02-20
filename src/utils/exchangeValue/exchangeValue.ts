import {IDataItem} from "../../interfaces";

export interface IExchangeValue {
    changeType: string
    getType: string
    changeValue: string
    getValue: string
    data: IDataItem[],
    calculateType?: string
}

export const exchangeValue = ({
                                  changeType,
                                  changeValue,
                                  getType,
                                  getValue,
                                  data,
                                  calculateType = ''
                              }: IExchangeValue): any => {

    const workData = data.filter((item: any) =>
        item.base_ccy === changeType
        && item.ccy === getType
        || item.ccy === changeType
        && item.base_ccy === getType
    )[0]
    if (calculateType === 'change' || calculateType === '') {
        if (workData.base_ccy === changeType) {
            const updatedValue = (Number(changeValue) / Number(workData.buy)).toFixed(2)
            return {value: updatedValue.toString(), type: calculateType}
        } else {
            const updatedValue = (Number(changeValue) * Number(workData.sale)).toFixed(2)
            return {value: updatedValue.toString(), type: calculateType}
        }
    } else if (calculateType === 'get') {
        if (workData.ccy === changeType) {
            const updatedValue = (Number(getValue) / Number(workData.sale)).toFixed(2)
            return {value: updatedValue.toString(), type: calculateType}
        } else {
            const updatedValue = Math.round(Number(getValue) * Number(workData.buy))
            return {value: updatedValue.toString(), type: calculateType}
        }

    }
}

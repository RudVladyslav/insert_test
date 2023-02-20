import { exchangeValue } from './exchangeValue';
import {IDataItem} from "../../interfaces";

describe('exchangeValue', () => {
    const data: IDataItem[] = [
        {
            ccy: 'USD',
            base_ccy: 'UAH',
            buy: '26.80',
            sale: '27.20'
        },
        {
            ccy: 'EUR',
            base_ccy: 'UAH',
            buy: '31.00',
            sale: '31.70'
        },
        {
            ccy: 'BTC',
            base_ccy: 'USD',
            buy: '52563.49',
            sale: '58013.03'
        }
    ];

    it('should return the correct value when calculating change from USD to UAH', () => {
        const result = exchangeValue({
            changeType: 'USD',
            getType: 'UAH',
            changeValue: '10',
            getValue: '',
            data,
            calculateType: 'change'
        });
        expect(result).toEqual({ value: '272.00', type: 'change' });
    });

    it('should return the correct value when calculateType is not provided', () => {
        const result = exchangeValue({
            changeType: 'USD',
            getType: 'UAH',
            changeValue: '10',
            getValue: '',
            data
        });
        expect(result).toEqual({ value: '272.00', type: '' });
    });
});

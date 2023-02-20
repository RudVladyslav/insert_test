import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import InputComponent from "./components/Input";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {SELECT_DATA, SELECT_DATA_AFTER_CHS, TABLE_HEAD_TITLE} from "./consts";
import {loadBtcToUsd, loadExchangeData} from "./api";
import {checkLocalStorage, initLocalStorage} from "./utils/localStorage";
import Error from "./components/Error";
import {exchangeValue} from "./utils/exchangeValue/exchangeValue";
import {IDataItem} from "./interfaces";
import SelectComponent from "./components/Select";


function App() {
    const [error, setError] = useState(false);

    const [data, setData] = useState<IDataItem[]>([])

    const [sellValue, setSellValue] = useState('1000')
    const [buyValue, setBuyValue] = useState('')

    const [getSelectValue, setGetSelectValue] = useState(SELECT_DATA[1])
    const [changeSelectValue, setChangeSelectValue] = useState(SELECT_DATA[0])

    const [getSelectArray, setGetSelectArray] = useState<string[]>([])
    const [changeSelectArray, setChangeSelectArray] = useState<string[]>(SELECT_DATA)

    const [isBeenSelectEdited, setIsBeenSelectEdited] = useState(false)
    const [isCalculate, setIsCalculate] = useState(false)

    const [calculateType, setCalculateType] = useState('')

    const isFirstRender = useRef(false)

    const setSaveChangeValue = (label: string, value: string): void => {
        if (label === 'Change') {
            setCalculateType('change')
            setSellValue(value)
            setIsCalculate(true)
        } else {
            setCalculateType('get')
            setBuyValue(value)
            setIsCalculate(true)
        }
    }

    const loadData = async () => {
        try {
            isFirstRender.current = !isFirstRender.current
            const dataBtc = await loadBtcToUsd()
            let dataExchange = await loadExchangeData()
            const updatedDataBtc = {
                sale: dataBtc.data.sell.toString(),
                buy: dataBtc.data.buy.toString(),
                base_ccy: 'USD',
                ccy: 'BTC'
            }
            dataExchange = [...dataExchange, updatedDataBtc]
            setData(dataExchange)
            checkLocalStorage(setError)
            setIsCalculate(true)
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }

    const onClickCurrencyExchange = () => {
        const currentGetValue = buyValue
        const currentChangeValue = sellValue

        const activeChangeSelectItem = changeSelectValue
        const activeGetSelectItem = getSelectValue

        setSellValue(currentGetValue)
        setBuyValue(currentChangeValue)

        setChangeSelectValue(activeGetSelectItem)
        setGetSelectValue(activeChangeSelectItem)
    }

    useEffect(() => {
        if (!isFirstRender.current) {
            initLocalStorage()
            loadData()
        }
    }, [])

    useEffect(() => {
        if (SELECT_DATA_AFTER_CHS.hasOwnProperty(changeSelectValue)) {
            setGetSelectArray(Object.getOwnPropertyDescriptor(SELECT_DATA_AFTER_CHS, changeSelectValue)?.value.array)
            setIsBeenSelectEdited(true)
        }
    }, [changeSelectValue])

    useEffect(() => {
        if (isBeenSelectEdited) {
            setGetSelectValue(getSelectArray[0])
            setIsBeenSelectEdited(false)
            setIsCalculate(true)
        }
    }, [isBeenSelectEdited])

    useEffect(() => {
        if (isCalculate) {
            if (data.length > 0) {
                const {value, type} = exchangeValue({
                    changeType: changeSelectValue,
                    changeValue: sellValue,
                    getType: getSelectValue,
                    getValue: buyValue,
                    data,
                    calculateType
                })
                if (type === '' || type === 'change') {
                    setBuyValue(value)
                    setCalculateType('')
                } else {
                    setSellValue(value)
                    setCalculateType('')
                }
            }
            setIsCalculate(false)
        }
    }, [isCalculate, data])

    if (error) {
        return <Error/>
    }

    return (
        <Container maxWidth="md">
            <Box sx={{paddingTop: 14, boxSizing: 'border-box'}}>
                <TableContainer sx={{dataBtc: 800, marginX: 'auto'}} elevation={5} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD_TITLE.map(item => <TableCell
                                        key={item}
                                        width={100 / TABLE_HEAD_TITLE.length}
                                        align="center"
                                    >
                                        {item}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={`${item.ccy}_${index}`}>
                                    <TableCell align="center">
                                        {item.ccy}/{item.base_ccy}
                                    </TableCell>
                                    <TableCell align="center">{item.buy}</TableCell>
                                    <TableCell align="center">{item.sale}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingTop: 14,
                boxSizing: 'border-box'
            }}>
                <Box sx={{display: 'flex'}}>
                    <InputComponent onClickSave={setSaveChangeValue} label='Change' value={sellValue}/>
                    <SelectComponent
                        value={changeSelectValue}
                        onChangeMethod={(e: any) => setChangeSelectValue(e.target.value)}
                        selectArray={changeSelectArray}
                    />
                </Box>
                <CurrencyExchangeIcon sx={{'&:hover': {color: 'orange'}, cursor: 'pointer'}}
                                      onClick={onClickCurrencyExchange} fontSize={'large'}/>
                <Box sx={{display: 'flex'}}>
                    <InputComponent onClickSave={setSaveChangeValue} label='Get' value={buyValue}/>
                    <SelectComponent
                        value={getSelectValue}
                        onChangeMethod={(e) => {
                            setGetSelectValue(e.target.value)
                            setIsCalculate(true)
                        }}
                        selectArray={getSelectArray}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default App;

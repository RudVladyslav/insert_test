import React from 'react';
import {MenuItem, Select} from "@mui/material";

interface ISelectProps {
    value: string
    onChangeMethod: (e: any) => void
    selectArray: string[]
}

const SelectComponent: React.FC<ISelectProps> = ({onChangeMethod, value, selectArray}) => {
    return (
        <Select
            value={value}
            onChange={onChangeMethod}
            sx={{marginLeft: 2}}
            displayEmpty
            inputProps={{'aria-label': 'Without label'}}
        >
            {selectArray.map((item, index) => (
                <MenuItem key={`${index}_${item}`} value={item}>{item}</MenuItem>)
            )}
        </Select>
    );
};

export default SelectComponent;

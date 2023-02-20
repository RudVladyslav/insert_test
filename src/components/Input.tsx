import React, {useEffect, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

interface InputComponentProps {
    value: string
    label: string,
    onClickSave: (value: string, name: string) => void
}

const InputComponent: React.FC<InputComponentProps> = ({value, label, onClickSave}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    const onClickEdit = () => {
        setIsEdit(true)
    }
    const onClickSuccess = () => {
        onClickSave(label, localValue)
        setIsEdit(false)
    }
    const onClickCancel = () => {
        setLocalValue(value)
        setIsEdit(false)
    }

    return (
        <Box sx={{position: 'relative', maxWidth: 250}}>
            {!isEdit
                ? (
                    <EditIcon
                        onClick={onClickEdit}
                        sx={{
                            position: 'absolute',
                            top: 4,
                            right: 5,
                            zIndex: 20,
                            '&:hover': {cursor: 'pointer', color: '#f2d82d'}
                        }} fontSize='small'
                    />
                ) : (
                    <>
                        <DoneIcon
                            onClick={onClickSuccess}
                            sx={{
                                position: 'absolute',
                                top: 3,
                                right: 25,
                                zIndex: 20,

                                '&:hover': {cursor: 'pointer', color: '#51d70b'}
                            }} fontSize='small'
                        />
                        <CloseIcon
                            onClick={onClickCancel}

                            sx={{
                                position: 'absolute',
                                top: 3,
                                right: 3,
                                zIndex: 20,
                                '&:hover': {cursor: 'pointer', color: '#d20e0e'}
                            }} fontSize='small'
                        />

                    </>

                )
            }

            <TextField
                sx={{minWidth: 250}}
                id="outlined-basic"
                type='number'
                label={label}
                variant="outlined"
                disabled={!isEdit}
                value={localValue}
                onChange={(e) => {
                    setLocalValue(e.target.value)
                }}
            />
        </Box>
    );
};

export default InputComponent;

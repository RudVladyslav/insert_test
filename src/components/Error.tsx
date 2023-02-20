import React from 'react';
import {Box, Paper, Typography} from "@mui/material";

const Error: React.FC = () => {
    return (
        <Box sx={{paddingTop: 20}}>
            <Paper elevation={3} sx={{maxWidth: 200, marginX: 'auto', padding: 10,}}>
                <Typography color={"red"} align='center' variant="h6" component="div" sx={{flexGrow: 1,}}>
                    Error!
                </Typography>
                <Typography color={"black"} align='center' variant="h6" component="div" sx={{flexGrow: 1,}}>
                    Oops... You need to reload this page! 😅
                </Typography>

            </Paper>

        </Box>
    );
};

export default Error;

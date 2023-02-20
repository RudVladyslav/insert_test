import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

interface AppLayoutProps {
    children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
    return (
        <Box>
            <header>
                <AppBar position="static" sx={{display: 'flex', justifyContent: 'center', alignItems: ' flex-start'}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Logo
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <AppBar position="static" sx={{display: 'flex', justifyContent: 'center', alignItems: ' center'}}>
                    <Toolbar>
                        <Typography variant="subtitle2" component="div" sx={{textAlign: 'center'}}>
                            2020 all right reserved
                        </Typography>
                    </Toolbar>
                </AppBar>
            </footer>
        </Box>
    );
};

export default AppLayout;

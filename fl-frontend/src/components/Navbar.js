import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {

    return (
        <Box sx={{ flexGrow: 1 }} className="navbar">
            <AppBar position="static" style={{ "backgroundColor": "black", "boxShadow": "10px" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ "fontWeight": "bold" }}>
                        FED-HEALTH
                    </Typography>
                    <Button color="inherit"><Link to="/" style={{
                        "textDecoration": "none", "color": "white"
                    }}>Home</Link></Button>
                    <Button color="inherit"><Link to="/fed" style={{
                        "textDecoration": "none", "color": "white"
                    }}>Federated</Link></Button>
                    <Button color="inherit"><Link to="/validation" style={{
                        "textDecoration": "none", "color": "white"
                    }}>Validation</Link></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
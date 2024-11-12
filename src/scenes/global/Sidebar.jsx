import { useState } from "react";
import { tokens } from "../../theme";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.secondary[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh', // Set full height of the viewport
            "& .pro-sidebar-inner": {
                background: `${colors.primary[200]} !important`,
                height: '100%',
            },

            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
            },

            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
            },

            "& .pro-inner-item:hover": {
                color: "#868dfb !important",
            },

            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },
        }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape='square'>
                    {/* Logo and Menu */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.secondary[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h4" color={colors.secondary[100]}>Bridget's Irish Pub</Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Post Media"
                            to="/posting"
                            icon={<AppShortcutIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="AI Post Generator"
                            to="/ai_image"
                            icon={<AddToPhotosIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
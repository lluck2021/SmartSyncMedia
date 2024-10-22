import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


const Topbar = () => {
    const theme = useTheme();
    const color = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return <Box display="flex" backgroundColor={color.secondary[700]} justifyContent="space-between" p={2}>

        {/* SearchBar*/}
        <Box
            display="flex"
            backgroundColor={color.primary[500]}
            borderRadius="3px"
        >

        </Box>

        {/* Icons*/}
        <Box
            display="flex"
        >

            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}

            </IconButton>

            <IconButton>
                <PersonOutlinedIcon />
            </IconButton>



        </Box>



    </Box>;


};

export default Topbar;
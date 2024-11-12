import { createContext, useState, useMemo } from "react";
import { createTheme, Typography } from "@mui/material";

// Define the colors for the Irish flag
export const tokens = {
    primary: {
        green: "#169B62",  // Green stripe
        white: "#FFFFFF",  // White stripe
        orange: "#FF883E", // Orange stripe
    },
};

export const themeSettings = () => {
    const colors = tokens;

    return {
        palette: {
            primary: {
                main: colors.primary.green,  // Set primary color to green
            },
            secondary: {
                main: colors.primary.orange,  // Set secondary color to orange
            },
            background: {
                default: colors.primary.white,  // Set background to white
            },
        },
        typography: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);

    return [theme];
};
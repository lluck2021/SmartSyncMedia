import { createContext, useState, useMemo } from "react";
import { createTheme, Typography } from "@mui/material";


export const tokens = (mode) => ({
    ...(mode === 'light'
        ? {

            primaryAccent: {
                100: "#030006",
                200: "#06000c",
                300: "#090113",
                400: "#0c0119",
                500: "#0f011f",
                600: "#3f344c",
                700: "#6f6779",
                800: "#9f99a5",
                900: "#cfccd2",
            },
            background: {
                default: '#fff',
            },
            primary: {
                100: "#00001e",
                200: "#00013c",
                300: "#00015a",
                400: "#000278",
                500: "#000296",
                600: "#3335ab",
                700: "#6667c0",
                800: "#999ad5",
                900: "#ccccea",
            },
            secondary: {
                100: "#10082b",
                200: "#211056",
                300: "#311782",
                400: "#421fad",
                500: "#5227d8",
                600: "#7552e0",
                700: "#977de8",
                800: "#baa9ef",
                900: "#dcd4f7",
            },

        }),
})

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'light'

                ? {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.primaryAccent[500],
                    },
                    neutral: {
                        dark: colors.secondary[700],
                        main: colors.secondary[500],
                        light: colors.secondary[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }
            )

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
        }
    }
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}
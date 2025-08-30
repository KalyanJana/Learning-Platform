// import React, { createContext, useState, useMemo, useContext } from "react";
// import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";

// interface ColorModeContextType {
//   toggleColorMode: () => void;
//   mode: PaletteMode;
// }

// const ColorModeContext = createContext<ColorModeContextType>({
//   toggleColorMode: () => {},
//   mode: "light",
// });

// export const useColorMode = () => useContext(ColorModeContext);

// export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [mode, setMode] = useState<PaletteMode>("light");

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prev) => (prev === "light" ? "dark" : "light"));
//       },
//       mode,
//     }),
//     [mode]
//   );

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           primary: {
//             main: mode === "light" ? "#1976d2" : "#90caf9",
//           },
//           secondary: {
//             main: mode === "light" ? "#9c27b0" : "#ce93d8",
//           },
//           background: {
//             default: mode === "light" ? "#fff" : "#121212",
//             paper: mode === "light" ? "#fff" : "#1e1e1e",
//           },
//         },
//         shape: { borderRadius: 10 },
//       }),
//     [mode]
//   );

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

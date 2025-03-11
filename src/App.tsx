import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import MainPlayer from "./components/MainPlayer";

export default function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })
  return(
     <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main
            style={{
              minHeight: "100vh",
              background: "linear-gradient(to bottom right, #1a1a2e, #16213e, #1a1a2e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <MainPlayer />
          </main>
        </ThemeProvider>
  );
}

import Header from "./Header"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import "../App.css";

// const inter = Inter({ subsets: ["latin"] })

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff61d8",
    },
    secondary: {
      main: "#5b8def",
    },
    warning: {
      main: "#ffd166",
    },
    error: {
      main: "#ef476f",
    },
    success: {
      main: "#06d6a0",
    },
  },
  typography: {
    // fontFamily: inter.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Header />
        <main className="main-content">{children}</main>
      </div>
    </ThemeProvider>
  )
}

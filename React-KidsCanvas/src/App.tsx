import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Layout from "./components/layout"
import "./App.css"
import Home from "./components/Home"
import Auth from "./components/Auth"
import { SearchProvider } from "./Context/searchContext"
import OpenDrawing from "./components/OpenDrawing"
import AIDraw from "./components/AIDraw"
import Favorites from "./components/Favorites"
import StoryPage from "./components/StoryPage"
import { DrawingsProvider } from "./Context/drawingContext"
import ColoringDraw from "./components/ColoringDraw"

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
    fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
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

function App() {
  return (
    <DrawingsProvider>
    <SearchProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coloring-game" element={<ColoringDraw />} />
              <Route path="/open-drawing/:id" element={<OpenDrawing />}/>
                <Route path="/ai-drawing" element={<AIDraw/>} />
                <Route path="/favorites" element={<Favorites />} />
                  <Route path="/story-page" element={<StoryPage/>} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </SearchProvider>
    </DrawingsProvider>
  )
}

export default App


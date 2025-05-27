
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css'
// import backgroundImg from './assets/image.png';
// import Login from './components/Login';
// import  Header  from './components/Header';
// import UserContext from './Context/userContext';
// import Register from './components/Register';
// import Auth from './components/Auth';
// import Home from './components/Home';
// import ColoringCanvas from './components/Canvas';
// import CheckCanvas from './components/checkCanvas';
// // import {DrawingProvider} from './Context/useDrawingContext';
// export default function App() {
//   return (
//     <>  <img
//       src={backgroundImg}
//       alt="Background"
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//         zIndex: -1,
//       }}
//     ></img>
//     {/* <DrawingProvider> */}
//       <UserContext>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Header><Home /></Header>} />
//             <Route path="/auth" element={<Header><Auth /></Header>} />
//             <Route path="/canvas" element={<Header><ColoringCanvas /></Header>} />
//             <Route path="/checkCanvas" element={<Header><CheckCanvas /></Header>} />
//           </Routes>
//         </BrowserRouter>
//       </UserContext>
//       {/* </DrawingProvider> */}
//     </>
//   );
// }




import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Layout from "./components/layout"
// import Home from "./pages/Home"
// import ColoringGame from "./pages/ColoringGame"
// import AIColoring from "./pages/AIColoring"
// import Favorites from "./pages/Favorites"
// import Auth from "./pages/Auth"
import "./App.css"
import Home from "./components/Home"
import Auth from "./components/Auth"
// import ColoringGame from "./components/ColoringGame"
import CheckCanvas from "./components/ColoringDraw"
import { SearchProvider } from "./Context/searchContext"
import OpenDrawing from "./components/OpenDrawing"
import AIDraw from "./components/AIDraw"
import Favorites from "./components/Favorites"

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
    <SearchProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coloring-game" element={<CheckCanvas />} />
              <Route path="/open-drawing" element={<OpenDrawing />}/>
                <Route path="/ai-drawing" element={<AIDraw />} />
                <Route path="/favorites" element={<Favorites />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </SearchProvider>
  )
}

export default App


import { useEffect, useMemo, useState } from "react";
import { Drawing } from "../models/Drawing";
import { useSearch } from "../Context/searchContext";
import { Box, Button, Container, createTheme, Grid, IconButton, Paper, ThemeProvider, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDrawings } from "../Context/drawingContext";

const Home = () => {
  const theme = createTheme({
    direction: "rtl" as const,
    palette: {
      primary: {
        main: "#e91e63",
        light: "#f48fb1",
        dark: "#ad1457",
        contrastText: "#fff",
      },
      secondary: {
        main: "#9c27b0",
        light: "#ba68c8",
        dark: "#7b1fa2",
      },
      background: {
        default: "#f8f9fa",
        paper: "#ffffff",
      },
      text: {
        primary: "#333333",
        secondary: "#6b6b6b",
      },
    },
    typography: {
      fontFamily: "Assistant, Rubik, Arial, sans-serif",
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
  })

  const [drawings, setDrawing] = useState<Drawing[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { searchValue } = useSearch();
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const setSelectedDrawing = useDrawings().setSelectedDrawing
  const base_url = import.meta.env.VITE_BASE_URL_API;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // קריאה לשרת עבור הציורים
        const drawingsResponse = await fetch(`https://localhost:7001/api/Drawings`);
        if (!drawingsResponse.ok) {
          throw new Error('Failed to fetch drawings');
        }
        const drawingsData = await drawingsResponse.json();
        setDrawing(drawingsData);
        if (drawingsData) {
          // קריאה לשרת עבור הקטגוריות
          const categoriesResponse = await fetch(`https://localhost:7001/api/Category`);
          if (!categoriesResponse.ok) {
            throw new Error('Failed to fetch categories');
          }
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData); // שמירת הקטגוריות ב-state
          categories.map(() => { })
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const filteredPaintings = useMemo(() => {
    if (!searchValue) return drawings; // הצג הכול אם אין חיפוש
    return drawings.filter(d => d.name.includes(searchValue));
  }, [drawings, searchValue]);

  const opendrawing = (d: Drawing) => {
    console.log("ציור שנבחר:", d);
    navigate("/open-drawing", { state: { id: d.id } });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
          <Container maxWidth="lg">
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 248px)", // 5 עמודות ברוחב קבוע
            gap: "12px",
            justifyContent: "center", // מרכז את הגריד
            margin: "0 auto", // מרכז את הגריד גם אם יש מקום פנוי
            // maxWidth: "calc(5 * 248px + 4 * 12px)", // רוחב מקסימלי לגריד
          }}
        >
          {filteredPaintings.map((d, index) => {
            if (!d.path) {
              console.warn("ציור בלי path:", d);
              return null;
            }
            return (
              <div key={index} style={{ textAlign: "center" }}>
                <Tooltip title="לחץ להגדלה" arrow >
                  <IconButton onClick={() => {
                    setSelectedDrawing(d);
                    console.log("ID לפני ניווט:", d.id);
                    navigate(`/open-drawing/${d.id}`);
                  }}>
                    {/* <Box className="image-grid">
                      {drawings.map((d, i) => (
                        <Box key={i}>
                          <img
                            src={d.path}
                            alt={d.name}
                            onClick={() => opendrawing(d)}
                            className="drawing-image"
                          />
                          <div className="image-label">{d.name}</div>
                        </Box>
                      ))}
                    </Box> */}
                  </IconButton>
                </Tooltip>
              </div>
            );
          })}
        </div>




        
        {/* Footer */}
        <Paper
          elevation={4}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #333 0%, #555 100%)",
            color: "white",
          }}
        >
          <Grid container spacing={4}>
            <Grid>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#ff69b4" }}>
                Kids Canvas
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Creating magical stories from your imagination with the power of AI
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["🎨", "📚", "✨"].map((emoji, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(255, 105, 180, 0.2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 105, 180, 0.4)",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {emoji}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Features
              </Typography>
              {["AI Story Generation", "Character Library", "Voice Narration", "Story Sharing"].map((item) => (
                <Typography key={item} variant="body2" sx={{ mb: 1, opacity: 0.8, cursor: "pointer" }}>
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Support
              </Typography>
              {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                <Typography key={item} variant="body2" sx={{ mb: 1, opacity: 0.8, cursor: "pointer" }}>
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Stay Connected
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Get updates on new features and stories
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "20px",
                    border: "none",
                    outline: "none",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: "#ff69b4",
                    borderRadius: "20px",
                    minWidth: "auto",
                    px: 2,
                    "&:hover": { background: "#ff1493" },
                  }}
                >
                  ✉️
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2024 Kids Canvas. All rights reserved. Made with ❤️ for creative minds.
            </Typography>
          </Box>
        </Paper>
      </div>
      </Container>
           {/* Global styles for animations */}
                <style>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px); 
            }
            50% { 
              transform: translateY(-10px); 
            }
          }
        `}</style>
    </Box>
    </ThemeProvider >

  );

}
export default Home;



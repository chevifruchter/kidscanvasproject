import { useEffect, useMemo, useState } from "react";
import { Drawing } from "../models/Drawing";
import {  useSearch } from "../Context/searchContext";
import { Box, Button, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDrawings } from "../Context/drawingContext";
import Footer from "./Footer";

const Home = () => {
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
        const drawingsResponse = await fetch(`${base_url}/api/Drawings`);
        if (!drawingsResponse.ok) {
          throw new Error('Failed to fetch drawings');
        }
        const drawingsData = await drawingsResponse.json();
        setDrawing(drawingsData);
        if (drawingsData) {
          // קריאה לשרת עבור הקטגוריות
          const categoriesResponse = await fetch(`${base_url}/api/Category`);
          if (!categoriesResponse.ok) {
            throw new Error('Failed to fetch categories');
          }
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData); // שמירת הקטגוריות ב-state
          categories.map(()=>{})
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

  // const opendrawing = () => {
  //   console.log("ציור שנבחר:", );
  //   navigate("/open-drawing");
  // };
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 248px)", // 5 עמודות ברוחב קבוע
          gap: "12px",
          justifyContent: "center", // מרכז את הגריד
          margin: "0 auto", // מרכז את הגריד גם אם יש מקום פנוי
          maxWidth: "calc(5 * 248px + 4 * 12px)", // רוחב מקסימלי לגריד
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
                  <img
                    src={d.path}
                    alt="תמונה מ-S3"
                    style={{
                      width: "248px",
                      height: "298px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid black",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <div
        style={{
          background: "#f0f4ff",
          border: "1px solid #bbb",
          borderTop: "none",
          borderRadius: "0 0 10px 10px",
          padding: "4px 0",
          marginTop: "0px", // קרב את המלבן לתמונה
          width: "248px",
          fontWeight: "bold",
          fontSize: "1.05em",
          color: "#333",
          boxShadow: "0 2px 6px #eee"
        }}
      >
                {d.name}
              </div>
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
  );

}
export default Home;



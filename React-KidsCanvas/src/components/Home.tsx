import React, { use, useContext, useEffect, useMemo, useState } from "react";
import { Drawing } from "../models/Drawing";
import { SearchContext, useSearch } from "../Context/searchContext";
import { Modal, Box, Stack, Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Service as DowonloadService } from '../services/DowonloadService';
import { useDrawings } from "../Context/drawingContext";
import Footer from "./Footer";

const Home = () => {
  const [drawings, setDrawing] = useState<Drawing[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { searchValue } = useSearch();
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const setSelectedDrawing = useDrawings().setSelectedDrawing
  const selectedDrawing = useDrawings().selectedDrawing

  useEffect(() => {
    const fetchData = async () => {
      try {
        // קריאה לשרת עבור הציורים
        const drawingsResponse = await fetch('https://localhost:7001/api/Drawings');
        if (!drawingsResponse.ok) {
          throw new Error('Failed to fetch drawings');
        }
        const drawingsData = await drawingsResponse.json();
        setDrawing(drawingsData);
        if (drawingsData) {
          // קריאה לשרת עבור הקטגוריות
          const categoriesResponse = await fetch('https://localhost:7001/api/Category');
          if (!categoriesResponse.ok) {
            throw new Error('Failed to fetch categories');
          }
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData); // שמירת הקטגוריות ב-state
        }
        // drawingContext.setCategories(categoriesData); // שמירת הקטגוריות ב-Context
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
      <Footer />
    </div>
  );

}
export default Home;



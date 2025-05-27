import React, { useContext, useEffect, useMemo, useState } from "react";
import { Drawing } from "../models/Drawing";
import { SearchContext, useSearch } from "../Context/searchContext";
import { Modal, Box, Stack, Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Service as DowonloadService } from '../services/DowonloadService';

const Home = () => {
  const [drawings, setDrawing] = useState<Drawing[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { searchValue } = useSearch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

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

 const opendrawing = (id: string) => {
  navigate("/open-drawing", { state: { id } });
};
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 עמודות
          gap: "20px", // רווח בין התמונות
          justifyItems: "center", // מיקום התמונות במרכז
        }}
      >
        {filteredPaintings.map((d, index) => {
          if (!d.path) {
            console.warn("ציור בלי path:", d);
            return null;
          }
          return (
            <div key={index} style={{ textAlign: "center" }}>
              <Tooltip title="לחץ להגדלה" arrow>
                <IconButton onClick={() => opendrawing(d.id)}>
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
                  padding: "10px 0",
                  margin: "0 auto",
                  width: "250px",
                  fontWeight: "bold",
                  fontSize: "1.1em",
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
    </div>
  );

}
export default Home;



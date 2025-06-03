import React, { createContext, useContext, useState, useEffect } from "react";
import { Drawing } from "../models/Drawing";
const base_url = import.meta.env.VITE_BASE_URL_API;
interface DrawingsContextType {
  drawings: Drawing[];
  selectedDrawing: Drawing | null;
  categories: string[];
  setCategories: (categories: string[]) => void;
  setSelectedDrawing: (drawing: Drawing) => void;
  fetchDrawings: () => Promise<void>;
}

const DrawingsContext = createContext<DrawingsContextType | undefined>({
    drawings: [],
    selectedDrawing: null,
    setSelectedDrawing: () => {},
    fetchDrawings: async () => {},
    categories: [],
    setCategories: () => {},
});

export const DrawingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [categories, setCategories] = useState<string[]>([]);


  const fetchDrawings = async () => {
    try {
      const response = await fetch(`${base_url}/api/Drawings`);
      if (!response.ok) {
        throw new Error("Failed to fetch drawings");
      }
      const data = await response.json();
      setDrawings(data);
         const categoriesResponse = await fetch(`${base_url}/api/Category`);
          if (!categoriesResponse.ok) {
            throw new Error('Failed to fetch categories');
          }
          const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching drawings:", error);
    }
  };

  useEffect(() => {
    fetchDrawings();
  }, []);
  
  return (
    <DrawingsContext.Provider value={{ drawings, selectedDrawing, setSelectedDrawing, fetchDrawings, categories, setCategories }}>
      {children}
    </DrawingsContext.Provider>
  );
};

export const useDrawings = (): DrawingsContextType => {
  const context = useContext(DrawingsContext);
  if (!context) {
    throw new Error("useDrawings must be used within a DrawingsProvider");
  }
  return context;
};

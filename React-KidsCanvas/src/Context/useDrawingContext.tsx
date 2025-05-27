// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode
// } from 'react';
// import { Drawing } from '../models/Drawing';

// type DrawingContextType = {
//   drawings: Drawing[];
//   setDrawings: (value: Drawing[]) => void;
//   categories: string[];
//   setCategories: (value: string[]) => void;
// }|undefined;

// const DrawingContext = createContext<DrawingContextType | undefined>({
//   drawings: [],
//   setDrawings: () => {},
//   categories: [],
//   setCategories: () => {},
// });

// export const DrawingProvider = ({ children }: { children: ReactNode }) => {
//   const [drawings, setDrawing] = useState<Drawing[]>([]);
//   const [categories, setCategorie] = useState<string[]>([]);

//   const setDrawings = (value: Drawing[]) => {setDrawing(value);}
//   const setCategories = (value: string[]) => {setCategorie(value);}

//   return (
//     <DrawingContext.Provider value={{ drawings, setDrawings, categories, setCategories }}>
//       {children}
//     </DrawingContext.Provider>
//   );
// };

// export const useUseDrawingsContext = () => useContext(DrawingContext);
// export default DrawingProvider;


import React, { useRef, useState, useEffect } from 'react';
import { Drawing } from '../models/Drawing';

export default function ColoringCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(5);
  const [shapeSize, setShapeSize] = useState(50); // גודל הצורה
  const [selectedShape, setSelectedShape] = useState<'circle' | 'square' | null>(null); // צורה נבחרת
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [selectedImage, setSelectedImage] = useState<Drawing | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drawingsResponse = await fetch('https://localhost:7001/api/Drawings');
        if (!drawingsResponse.ok) {
          throw new Error('Failed to fetch drawings');
        }
        const drawingsData = await drawingsResponse.json();
        setDrawings(drawingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const drawShape = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || !selectedShape) return;

    ctx.fillStyle = color;

    if (selectedShape === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, shapeSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (selectedShape === 'square') {
      ctx.fillRect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawShape(x, y);
  };

  return (
    <div>
      {!selectedImage ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {drawings.map((d, index) => {
            if (!d.path) {
              console.warn('ציור בלי path:', d);
              return null;
            }
            return (
              <div key={index} style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>{d.name}</p>
                <img
                  src={d.path}
                  alt={`ציור ${index + 1}`}
                  onClick={() => {
                    const img = new Image();
                    img.src = d.path;
                    img.onload = () => {
                      setSelectedImage({
                        ...d,
                        width: img.width,
                        height: img.height,
                      });

                      const canvas = canvasRef.current;
                      const ctx = canvas?.getContext('2d');
                      if (canvas && ctx) {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        ctxRef.current = ctx;
                      }
                    };
                  }}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    border: '1px solid black',
                    cursor: 'pointer',
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {/* צד שמאל - כלים */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  background: c,
                  width: 30,
                  height: 30,
                  border: color === c ? '2px solid black' : '1px solid #ccc',
                }}
              />
            ))}
            <label>
              גודל מברשת:
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
              />
            </label>
            <label>
              גודל צורה:
              <input
                type="range"
                min="10"
                max="200"
                value={shapeSize}
                onChange={(e) => setShapeSize(Number(e.target.value))}
              />
            </label>
            <button onClick={() => setSelectedShape('circle')}>עיגול</button>
            <button onClick={() => setSelectedShape('square')}>ריבוע</button>
            <button onClick={() => setSelectedShape(null)}>מברשת</button>
          </div>

          {/* הקנבס */}
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{
              border: '2px solid black',
              backgroundColor: '#fff',
              borderRadius: '8px',
            }}
          />
        </div>
      )}
    </div>
  );
}
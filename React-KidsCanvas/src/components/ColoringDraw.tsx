import React, { useEffect, useRef, useState } from 'react';
import { Drawing } from '../models/Drawing';
import {
    Box,
    IconButton,
    Slider,
    Tooltip,
    Divider,
    Typography,
} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../styles/ColoringDraw.css";
type Props = {
    imageUrl: Drawing | null; // הנתיב או ה-URL של הציור (למשל משרת)
};
export default function ColoringDraw({ imageUrl }: Props) {
    const [drawings, setDrawings] = useState<Drawing[]>([]);
    const [selectedImage, setSelectedImage] = useState<Drawing | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [color, setColor] = useState('#000000');
    const [tool, setTool] = useState<'brush' | 'fill' | 'eraser'>('brush');
    const [brushSize, setBrushSize] = useState(5);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const base_url = import.meta.env.VITE_BASE_URL_API;
    // const newDrawings: Drawing[] = [{ id: "1", name: "arnav2", path: "/drawings/arnav2.jpg", width: 300, height: 350 }, { id: "2", name: "arnav1", path: "/drawings/arnav1.jpg", width: 300, height: 600 }, { id: "3", name: "alepant", path: "/drawings/alepant.jpg", width: 800, height: 600 }];
    useEffect(() => {
        if (imageUrl) {
            setSelectedImage(imageUrl);
            return;
        }
        fetch(`${base_url}/api/Drawings`)
            .then((res) => res.json())
            .then((data) => setDrawings(data));

        // setDrawings(newDrawings);
    }, []);

    useEffect(() => {

        if (selectedImage && canvasRef.current) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = `/drawings/${selectedImage.name}`;
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return; // אם אין קנבס, יוצאים

                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const canvasWidth = 345;
                const canvasHeight = 450;

                // כאן בטוח שיש canvas, אז אפשר לשנות את המידות
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;

                const x = (canvasWidth - scaledWidth) / 2;
                const y = (canvasHeight - scaledHeight) / 2;

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
            };

        }
    }, [selectedImage]);

    const startDrawing = (e: React.MouseEvent) => {
        if (tool !== 'brush') return;
        setIsDrawing(true);
        draw(e);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing || tool !== 'brush' || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
    };


    const finishDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            saveToHistory();
        }
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (tool !== 'fill' && tool !== 'eraser') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const targetColor = getColorAtPixel(imageData, x, y);
        const fillColor = tool === 'fill' ? hexToRgba(color) : [255, 255, 255, 0];
        floodFill(imageData, x, y, targetColor, fillColor);
        ctx.putImageData(imageData, 0, 0);
        saveToHistory();
    };

    const getColorAtPixel = (imageData: ImageData, x: number, y: number): Uint8ClampedArray => {
        const { data, width } = imageData;
        const index = (y * width + x) * 4;
        return new Uint8ClampedArray(data.slice(index, index + 4));
    };

    const colorsMatch = (
        a: Uint8ClampedArray,
        b: Uint8ClampedArray,
        tolerance = 16
    ): boolean => {
        return (
            Math.abs(a[0] - b[0]) <= tolerance &&
            Math.abs(a[1] - b[1]) <= tolerance &&
            Math.abs(a[2] - b[2]) <= tolerance &&
            Math.abs(a[3] - b[3]) <= tolerance
        );
    };

    const floodFill = (
        imageData: ImageData,
        startX: number,
        startY: number,
        targetColor: Uint8ClampedArray,
        fillColor: number[],
    ) => {
        const { data, width, height } = imageData;
        const visited = new Uint8Array(width * height); // חוסך המון בזיכרון
        const queue = [[startX, startY]];

        const getIndex = (x: number, y: number) => (y * width + x) * 4;

        while (queue.length > 0) {
            const [x, y] = queue.shift()!;
            if (x < 0 || x >= width || y < 0 || y >= height) continue;

            const index = getIndex(x, y);
            const pos = y * width + x;
            if (visited[pos]) continue;
            visited[pos] = 1;

            const currentColor = data.slice(index, index + 4);
            if (!colorsMatch(currentColor, targetColor)) continue;

            data.set(fillColor, index);

            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }
    };

    const hexToRgba = (hex: string) => {
        const bigint = parseInt(hex.slice(1), 16);
        return [
            (bigint >> 16) & 255,
            (bigint >> 8) & 255,
            bigint & 255,
            255,
        ];
    };

    const saveToHistory = () => {
        if (!canvasRef.current) return;
        const dataUrl = canvasRef.current.toDataURL();
        setHistory((prev) => [...prev, dataUrl]);
        setRedoStack([]);
    };

    const undo = () => {
        if (history.length < 2 || !canvasRef.current) return;
        const newHistory = [...history];
        const last = newHistory.pop()!;
        setRedoStack((prev) => [...prev, last]);
        const previous = newHistory[newHistory.length - 1];
        const img = new Image();
        img.src = previous;
        img.onload = () => {
            const ctx = canvasRef.current!.getContext('2d')!;
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            ctx.drawImage(img, 0, 0);
        };
        setHistory(newHistory);
    };

    const redo = () => {
        if (redoStack.length === 0 || !canvasRef.current) return;
        const last = redoStack[redoStack.length - 1];
        const img = new Image();
        img.src = last;
        img.onload = () => {
            const ctx = canvasRef.current!.getContext('2d')!;
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            ctx.drawImage(img, 0, 0);
        };
        setHistory((prev) => [...prev, last]);
        setRedoStack((prev) => prev.slice(0, -1));
    };

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')!;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        saveToHistory();
    };

    const saveImage = () => {
        if (!canvasRef.current) return;
        const dataURL = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'colored-image.png';
        link.href = dataURL;
        link.click();
    };

    return (
        <Box sx={{ textAlign: 'center', p: 3, fontFamily: 'Arial' }}>
            {!selectedImage ? (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        🎨 בחר ציור לצביעה
                    </Typography>
                    <Box className="image-grid">
                        {drawings.map((d, i) => (
                            <Box key={i}>
                                <img
                                    src={d.path}
                                    alt={d.name}
                                    onClick={() => setSelectedImage(d)}
                                    className="drawing-image"
                                />
                                <div className="image-label">{d.name}</div>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 4 }}>
                    <Box className="color-picker">
                        {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'].map((c) => (
                            <IconButton
                                key={c}
                                onClick={() => setColor(c)}
                                sx={{
                                    backgroundColor: c,
                                    border: color === c ? '2px solid black' : '1px solid #ccc',
                                    width: 36,
                                    height: 36,
                                }}
                            />
                        ))}
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    </Box>

                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={finishDrawing}
                        onMouseLeave={finishDrawing}
                        onClick={handleCanvasClick}
                        className="drawing-canvas"

                    />


                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Tooltip title="מברשת">
                            <IconButton onClick={() => setTool('brush')} color={tool === 'brush' ? 'primary' : 'default'}>
                                <BrushIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="מילוי">
                            <IconButton onClick={() => setTool('fill')} color={tool === 'fill' ? 'primary' : 'default'}>
                                <FormatColorFillIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="מחק">
                            <IconButton onClick={() => setTool('eraser')} color={tool === 'eraser' ? 'primary' : 'default'}>
                                <AutoFixNormalIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="caption">גודל מברשת</Typography>
                        <Slider
                            min={1}
                            max={50}
                            value={brushSize}
                            onChange={(e, val) => { setBrushSize(val as number); e }}
                            size="small"
                            sx={{ width: 100 }}
                        />
                        <Divider sx={{ my: 1 }} />
                        <Tooltip title="בטל">
                            <IconButton onClick={undo}>
                                <UndoIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="חזור">
                            <IconButton onClick={redo}>
                                <RedoIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="נקה">
                            <IconButton onClick={clearCanvas}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="שמור">
                            <IconButton onClick={saveImage}>
                                <SaveAltIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="חזור לבחירה">
                            <IconButton onClick={() => setSelectedImage(null)}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            )}
        </Box>
    );
}


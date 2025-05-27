import React, { useRef, useState, useEffect } from 'react';

const ColoringCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [brushSize, setBrushSize] = useState(10);
  const [color, setColor] = useState('#ff0000');
  const [mode, setMode] = useState<'brush' | 'fill' | 'erase'>('brush');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    if (canvas && ctx && img) {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, []);

  const getPixel = (imageData: ImageData, x: number, y: number) => {
    const index = (y * imageData.width + x) * 4;
    return imageData.data.slice(index, index + 4);
  };

  const setPixel = (imageData: ImageData, x: number, y: number, color: number[]) => {
    const index = (y * imageData.width + x) * 4;
    for (let i = 0; i < 4; i++) {
      imageData.data[index + i] = color[i];
    }
  };

  const matchColor = (a: number[], b: number[]) => a.every((v, i) => v === b[i]);

  const floodFill = (x: number, y: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = getPixel(imageData, x, y);
    const fillColorArr = [
      parseInt(fillColor.slice(1, 3), 16),
      parseInt(fillColor.slice(3, 5), 16),
      parseInt(fillColor.slice(5, 7), 16),
      255,
    ];

    if (matchColor(Array.from(targetColor), fillColorArr)) return;

    const stack = [[x, y]];
    while (stack.length > 0) {
      const [cx, cy] = stack.pop()!;
      const currentColor = Array.from(getPixel(imageData, cx, cy));
      if (!matchColor(currentColor, Array.from(targetColor))) continue;

      setPixel(imageData, cx, cy, fillColorArr);
      if (cx > 0) stack.push([cx - 1, cy]);
      if (cx < canvas.width - 1) stack.push([cx + 1, cy]);
      if (cy > 0) stack.push([cx, cy - 1]);
      if (cy < canvas.height - 1) stack.push([cx, cy + 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / scale);
    const y = Math.floor((e.clientY - rect.top) / scale);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (mode === 'fill') {
      floodFill(x, y, color);
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);

      const draw = (e: MouseEvent) => {
        const newX = Math.floor((e.clientX - rect.left) / scale);
        const newY = Math.floor((e.clientY - rect.top) / scale);
        ctx.lineTo(newX, newY);
        ctx.strokeStyle = mode === 'erase' ? '#ffffff' : color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.stroke();
      };

      const stopDrawing = () => {
        window.removeEventListener('mousemove', draw);
        window.removeEventListener('mouseup', stopDrawing);
      };

      window.addEventListener('mousemove', draw);
      window.addEventListener('mouseup', stopDrawing);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my_drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        🎨 צבע:
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        🖌️ גודל מברשת:
        <input type="range" min={1} max={50} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
        🧰 מצב:
        <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
          <option value="brush">מברשת</option>
          <option value="fill">מילוי אזור</option>
          <option value="erase">מחיקה</option>
        </select>
        🔍 גודל תצוגה:
        <input type="range" min={0.5} max={2} step={0.1} value={scale} onChange={(e) => setScale(Number(e.target.value))} />
        <button onClick={handleDownload}>📥 הורד ציור</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        style={{ border: '1px solid #000', transform: `scale(${scale})`, transformOrigin: 'top left' }}
      />
      <img
        ref={imgRef}
        src="/images/your-coloring-image.png"
        alt="לצביעה"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ColoringCanvas;




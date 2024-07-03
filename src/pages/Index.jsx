import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.addEventListener("mousemove", draw);
  };

  const endDrawing = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener("mousemove", draw);
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Drawing Canvas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <div>
                <Label htmlFor="color">Brush Color</Label>
                <Input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="brushSize">Brush Size</Label>
                <Input
                  type="number"
                  id="brushSize"
                  value={brushSize}
                  onChange={(e) => setBrushSize(e.target.value)}
                  min="1"
                  max="50"
                />
              </div>
              <Button onClick={clearCanvas}>Clear Canvas</Button>
            </div>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-300"
              onMouseDown={startDrawing}
              onMouseUp={endDrawing}
              onMouseOut={endDrawing}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ShowPage: React.FC = () => {
  const query = useQuery();
  // Get 3 points from query params
  const points = [1, 2, 3].map(i => ({
    x: Number(query.get(`x${i}`)),
    y: Number(query.get(`y${i}`)),
  }));

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Optionally scale points to fit canvas if needed
    // For now, assume user enters values in 0-800 range
    ctx.strokeStyle = '#0074D9';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#FF4136';
    points.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 7, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw angle arcs at each vertex and show angle value
    type Point = { x: number; y: number };
    function getAngle(A: Point, B: Point, C: Point) {
      // angle at A between AB and AC
      const abx = B.x - A.x, aby = B.y - A.y;
      const acx = C.x - A.x, acy = C.y - A.y;
      const dot = abx * acx + aby * acy;
      const magAB = Math.hypot(abx, aby);
      const magAC = Math.hypot(acx, acy);
      const cosTheta = dot / (magAB * magAC);
      return Math.acos(Math.max(-1, Math.min(1, cosTheta))); // clamp for safety
    }


    function drawAngleArcWithLabel(A: Point, B: Point, C: Point, radius = 28, label = "") {
      if (!ctx) return;
      // A is the vertex, B and C are the other two points
      const v1x = B.x - A.x;
      const v1y = B.y - A.y;
      const v2x = C.x - A.x;
      const v2y = C.y - A.y;
      const angle1 = Math.atan2(v1y, v1x);
      const angle2 = Math.atan2(v2y, v2x);
      // Ensure arc is drawn in the correct direction
      let start = angle1;
      let end = angle2;
      if (end < start) {
        [start, end] = [end, start];
      }
      // If the arc is more than 180deg, swap
      if (end - start > Math.PI) {
        [start, end] = [end, start + 2 * Math.PI];
      }
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#2ECC40';
      ctx.lineWidth = 2;
      ctx.arc(A.x, A.y, radius, start, end, false);
      ctx.stroke();
      ctx.restore();

      // Draw label (angle in degrees) outside the arc
      if (label) {
        const mid = (start + end) / 2;
        // Move label further out (outside the triangle)
        const OUTSIDE_OFFSET = 44;
        const lx = A.x + (radius + OUTSIDE_OFFSET) * Math.cos(mid);
        const ly = A.y + (radius + OUTSIDE_OFFSET) * Math.sin(mid);
        ctx.save();
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#111';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(255,255,255,0.85)';
        ctx.shadowBlur = 6;
        ctx.lineWidth = 2;
        ctx.fillText(label, lx, ly);
        ctx.restore();
      }
    }

    // Calculate angles in degrees
    const angleA = getAngle(points[0], points[1], points[2]) * 180 / Math.PI;
    const angleB = getAngle(points[1], points[2], points[0]) * 180 / Math.PI;
    const angleC = getAngle(points[2], points[0], points[1]) * 180 / Math.PI;

    // For each vertex, draw the angle arc and label
    drawAngleArcWithLabel(points[0], points[1], points[2], 28, angleA ? angleA.toFixed(1) + '°' : '');
    drawAngleArcWithLabel(points[1], points[2], points[0], 28, angleB ? angleB.toFixed(1) + '°' : '');
    drawAngleArcWithLabel(points[2], points[0], points[1], 28, angleC ? angleC.toFixed(1) + '°' : '');
  }, [points]);

  return (
    <div style={{ padding: 32 }}>
      <h1>Triangle</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        style={{ border: '1px solid #ccc', background: '#fafafa' }}
      />
      <div style={{ marginTop: 24 }}>
        <h3>Points:</h3>
        <ul>
          {points.map((pt, i) => (
            <li key={i}>Point {i+1}: (X: {pt.x}, Y: {pt.y})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowPage;

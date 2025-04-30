import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function SlideButton({ onConfirm }) {
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleStart = (clientX) => {
    setDragging(true);
    moveSlider(clientX);
  };

  const handleMove = (clientX) => {
    if (!dragging) return;
    moveSlider(clientX);
  };

  const handleEnd = () => {
    if (!dragging) return;
    setDragging(false);

    const containerWidth = containerRef.current.offsetWidth;
    const min = containerWidth * 0.25;
    const max = containerWidth - 48;

    if (position >= max) {
        setPosition(max);
        setProgress(1);
        onConfirm();
    } else {
        setPosition(min);
        setProgress(0);
    }
  };

  const moveSlider = (clientX) => {
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const rawLeft = clientX - containerLeft - 24;
    const max = containerRef.current.offsetWidth - 48;
    const min = containerRef.current.offsetWidth * 0.15; // posisi awal minimal

    const newLeft = Math.max(min, Math.min(rawLeft, max));
    setPosition(newLeft);
    setProgress((newLeft - min) / (max - min));
  };

  useEffect(() => {
    if (containerRef.current) {
      const initialPos = containerRef.current.offsetWidth * 0.15;
      setPosition(initialPos);
      setProgress(initialPos / (containerRef.current.offsetWidth - 48));
    }
  }, []);
  
  // Attach mouse/touch event listeners
  useEffect(() => {
    const handleMouseMove = (e) => handleMove(e.clientX);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
    const handleMouseUp = handleEnd;
    const handleTouchEnd = handleEnd;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragging, position]);

  return (
    <div
        ref={containerRef}
        className="relative w-full h-12 bg-[#7F56D9] rounded-lg overflow-hidden select-none"
        >
        <p
            className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium pointer-events-none transition-opacity duration-200"
            style={{ opacity: 1 - progress }}
        >
            Geser untuk konfirmasi pembayaran
        </p>
        <div
            onMouseDown={(e) => handleStart(e.clientX)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            className="absolute top-1 left-0 h-10 w-10 cursor-pointer flex items-center justify-center transition-transform duration-100"
            style={{ transform: `translateX(${position}px)` }}
        >
            <ArrowRight size={20} className="text-white" />
        </div>
    </div>
  );
}

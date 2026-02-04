import { useState, useEffect } from "react";
import { MediaProps } from "./types/ProjectProps";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";
import "./styling/MediaCarousel.css";

export function MediaCarousel({ media }: { media: MediaProps[] }) {
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setIndex(i => (i + 1) % media.length);
      }, 6000);
      return () => clearInterval(timer);
    }, [media.length, index]);
  
    return (
      <div className="media-carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="media-carousel-slide"
          >
            {media[index].type === "image" ? (
              <img
                src={media[index].src}
                className="media-carousel-image"
              />
            ) : (
              <video
                src={media[index].src}
                autoPlay
                loop
                muted
                className="media-carousel-video"
              />
            )}
          </motion.div>
        </AnimatePresence>
  
        <div className="media-carousel-dots">
          {media.map((_: MediaProps, i: number) => (
            <Button
              key={i}
              onClick={() => setIndex(i)}
              className={`media-carousel-dot ${
                i === index ? "media-carousel-dot-active" : "media-carousel-dot-inactive"
              }`}
            />
          ))}
        </div>
      </div>
    );
}  
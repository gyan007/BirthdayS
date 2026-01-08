import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import "./ReasonsJar.css";

const reasons = [
  "You always know how to make me laugh when I'm down. 😂",
  "Your kindness towards everyone is truly inspiring. ✨",
  "You're the best listener I've ever met. 👂💗", 
  "Your smile can literally brighten the darkest room. ☀️",
  "You're my go-to person for literally everything. 🧸",
  "You make the best memories out of the smallest moments. 📸",
  "Half of our conversations are just us laughing at things no one else understands. 🤣",
  "I love that I never have to 'pretend' to be someone when I'm around you. 🫂",
  "You're the only person I can be 100% weird with without a second thought. 🤡",
  "Thank you for all the 'remember when' moments that I’ll cherish forever. 🥂",
  "You have this magical way of making people feel important just by talking to them. 🪄",
  "Knowing you’re in my corner makes the whole world feel a little less scary. 🥊",
  "The world is chaotic, but your friendship is the one thing that always makes sense. 🧩",
  "Thank you for being the person who stays when everyone else leaves. 🛡️",
];
  
const ReasonsJar = () => {
  const [activeReason, setActiveReason] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const noteRef = useRef(null);
  const jarRef = useRef(null);

  const getNewReason = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    tl.to(jarRef.current, { 
      x: -5, 
      rotation: -2, 
      duration: 0.1, 
      repeat: 5, 
      yoyo: true 
    });
    
    tl.fromTo(noteRef.current, 
      { 
        scale: 0.5, 
        opacity: 0, 
        y: 0, 
        rotation: 5 
      },
      { 
        scale: 1, 
        opacity: 1, 
        y: 330,
        rotation: 0, 
        duration: 0.7, 
        ease: "back.out(1.2)",
        onStart: () => setActiveReason(randomReason)
      }
    );
  };

  return (
    <div className="jar-container">
      <div className="jar-wrapper">
        <div ref={noteRef} className="reason-note" style={{ opacity: 0 }}>
          <div className="note-content">
            <p>{activeReason}</p>
          </div>
        </div>

        <div ref={jarRef} className="jar" onClick={getNewReason}> 
          <div className="jar-lid"></div>
          <div className="jar-body">
            <div className="hearts-inside">
              <span>❤️</span>
              <span>💖</span>
              <span>✨</span>
              <span>🌸</span>
              <span>💕</span>
            </div>
          </div>
          <div className="jar-label">Reasons Why...</div>
        </div>
      </div>
      
      <p className="jar-hint">Tap the jar to reveal a reason 👆</p>
    </div>
  );
};

export default ReasonsJar;
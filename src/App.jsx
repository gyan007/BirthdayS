import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState, useLayoutEffect } from "react";
import "./App.css";
import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects"; 
import ReasonsJar from "./components/ReasonJar";
import Hearts from "./components/Hearts";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const [birthdayReached, setBirthdayReached] = useState(() => {
    const saved = localStorage.getItem("birthdayReached");
    return saved === "true";
  });


  const [showEffects, setShowEffects] = useState(false);

  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);
  const musicPlayerRef = useRef(null);

  useLayoutEffect(() => {
    const allPages = [page1Ref, page2Ref, page3Ref, page4Ref];
    
    allPages.forEach((page, index) => {
      if (index === 0) {
        gsap.set(page.current, { 
          x: "0%", 
          opacity: 1, 
          visibility: "visible" 
        });
      } else { 
        gsap.set(page.current, { 
          x: "100%", 
          opacity: 0, 
          visibility: "hidden" 
        });
      }
    });
  }, []);

  const goToPage = (pageNumber) => { 
    if (!birthdayReached && pageNumber !== 1) {
      return;
    }

    const refs = { 1: page1Ref, 2: page2Ref, 3: page3Ref, 4: page4Ref };
    const currentPageRef = refs[currentPage];
    const nextPageRef = refs[pageNumber];

    if (!currentPageRef.current || !nextPageRef.current) return;

    const isForward = pageNumber > currentPage;

    gsap.to(currentPageRef.current, {
      x: isForward ? "-100%" : "100%",
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(currentPageRef.current, { visibility: "hidden" });
      }
    });

    gsap.set(nextPageRef.current, {
      x: isForward ? "100%" : "-100%",
      opacity: 0,
      visibility: "visible",
    });

    gsap.to(nextPageRef.current, {
      x: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.1,
      onComplete: () => {
        setCurrentPage(pageNumber);
        gsap.to(window, { duration: 0.3, scrollTo: { y: 0 } });
      },
    });
  };

  const handleBirthdayReached = () => {
    setBirthdayReached(true);
    localStorage.setItem("birthdayReached", "true");
    setShowEffects(true);
    setTimeout(() => setShowEffects(false), 10000);
  };

  return (
    <div className="app">
      <MusicPlayer ref={musicPlayerRef} />
      <Hearts />

      {/* PAGE 1 */}
      <div ref={page1Ref} className={`page ${currentPage === 1 ? "active" : ""}`}>
        <section className="hero">
          <h1>
            {birthdayReached ? (
              <>Happy Birthday <span className="highlight">Shristi</span> 🎂</>
            ) : (
              <>Counting down to <span className="highlight">Shristi's</span> special day 🎂</>
            )}
          </h1>
          <p>To the best friend anyone could ask for. 💗</p>
        </section>

        <Countdown
          onBirthdayReached={handleBirthdayReached}
          birthdayReached={birthdayReached}
        />

        <section className="teaser">
          <h2>
            {birthdayReached
              ? "💖 Ready for your surprise! 💖"
              : "✨ A special celebration awaits you at midnight... ✨"}
          </h2>
        </section>

        <button
          id="surpriseBtn"
          className="celebrate-btn"
          disabled={!birthdayReached}
          onClick={() => goToPage(2)}
        >
          🎀 Let's Celebrate
        </button>
      </div>

      {/* PAGE 2 */}
      <div ref={page2Ref} className={`page ${currentPage === 2 ? "active" : ""}`}>
        <CelebrationPage onComplete={() => goToPage(3)} musicPlayerRef={musicPlayerRef} />
      </div>

      {/* PAGE 3 */}
      <div ref={page3Ref} className={`page ${currentPage === 3 ? "active" : ""}`}>
        <button className="back-btn" onClick={() => goToPage(2)}>← Back</button>
        <MessageCard isActive={currentPage === 3} />
        <button className="page-nav-btn" onClick={() => goToPage(4)}>✨ Reasons - Why You're Special ✨</button>
      </div>

      {/* PAGE 4 */}
      <div ref={page4Ref} className={`page ${currentPage === 4 ? "active" : ""}`}>
        <button className="back-btn" onClick={() => goToPage(3)}>← Back</button>
        
        <h2 className="section-title" style={{ marginTop: "100px" }}>✨ Why You're Special ✨</h2>
        <ReasonsJar />
        
        <section className="final">
          <h2 className="final-message">💖 Forever Yours — [CMate] 💖</h2>
        </section>
      </div>

      {showEffects && <Effects />}
    </div>
  );
}

export default App;
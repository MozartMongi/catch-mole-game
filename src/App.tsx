import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mole from './components/mole';

const App: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [isStarted, setIsStarted] = useState(false)
  const [visibleMoleIndex, setVisibleMoleIndex] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // Timer state
  const gameIntervalRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null); // Reference for timer
  const holes = useMemo(() => Array.from({ length: 3 }), []);

  // Debounce function to avoid spamming clicks on the mole
  const debounce = (func: () => void, delay: number) => {
    let timeoutId: number;
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  // Randomize the mole popping out between 200ms and 400ms
  const randomizeMoleTime = () => Math.random() * 200 + 200;

  // Function to show a random mole
  const showRandomMole = useCallback(() => {
    const randomHoleIndex = Math.floor(Math.random() * holes.length);
    setVisibleMoleIndex(randomHoleIndex);
    setTimeout(() => setVisibleMoleIndex(null), randomizeMoleTime());
  }, [holes.length]);

  // Start the game
  useEffect(() => {
    if(isStarted) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
      gameIntervalRef.current = setInterval(showRandomMole, randomizeMoleTime());
      
    }
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = null; // Optional: Resetting the ref
      }
    };
  }, [showRandomMole, isStarted]);


  const handleMoleClick = useCallback(
    debounce(() => {
      alert(`Time Elapsed: ${timeElapsed} seconds\nTotal Click: ${clicks+1}`);
      setTimeElapsed((prev) => {
        const newTime = 0;
        // Show an alert with the current time and score when the mole is clicked
        return newTime;
      });
      setClicks(0)
      setVisibleMoleIndex(null);
      setIsStarted(false)
      
      // Stop the timer when the mole is clicked
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 200),
    [timeElapsed] // Include timeElapsed in the dependency array
  );

  const handleNonMoleClick = () => {
    setClicks(prev => prev + 1)
  }

  return (
    <div className="game-container">
      <button onClick={() => setIsStarted(true)} className='btnStart'>Start The Game</button>
      <h1>Whack-A-Mole</h1>
      <h2>Clicks: {clicks}</h2>
      <h2>Time Elapsed: {timeElapsed} seconds</h2>
      <div className="mole-grid">
        {holes.map((_, index) => (
          <Mole key={index} onClickNoMole={handleNonMoleClick} onClick={handleMoleClick} isVisible={visibleMoleIndex === index} />
        ))}
      </div>
    </div>
  );
};

export default App;

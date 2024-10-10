import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Mole from './components/Mole';

const App: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [isStarted, setIsStarted] = useState(false)
  const [visibleMoleIndex, setVisibleMoleIndex] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const gameIntervalRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null); 
  const holes = useMemo(() => Array.from({ length: 3 }), []);

  // Debounce function to avoid spamming clicks on the mole
  const debounce = (func: () => void, delay: number) => {
    let timeoutId: number;
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(func, delay);
    };
  };

  // Randomize the mole popping out between 200ms and 400ms
  const randomizeMoleTime = () => Math.random() * 200 + 200;

  const showRandomMole = useCallback(() => {
    const randomHoleIndex = Math.floor(Math.random() * holes.length);
    setVisibleMoleIndex(randomHoleIndex);
    setTimeout(() => setVisibleMoleIndex(null), randomizeMoleTime());
  }, [holes.length]);

  useEffect(() => {
    if(isStarted) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
      gameIntervalRef.current = window.setInterval(showRandomMole, randomizeMoleTime());
      
    }
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = null; 
      }
    };
  }, [showRandomMole, isStarted]);


  const handleMoleClick = useCallback(
    debounce(() => {
      alert(`Time Elapsed: ${timeElapsed} seconds\nTotal Click: ${clicks+1}`);
      setTimeElapsed((prev) => {
        const newTime = 0;
        return newTime;
      });
      setClicks(0)
      setVisibleMoleIndex(null);
      setIsStarted(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 200),
    [timeElapsed]
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

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import ConfettiOverlay from '@/components/ConfettiOverlay';

export default function App() {
  // Screen state: 'notFound' | 'invitation' | 'accepted'
  const [screen, setScreen] = useState<'notFound' | 'invitation' | 'accepted'>('notFound');
  const [showAgreement, setShowAgreement] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [gradientIndex, setGradientIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Gradient color combinations for NO clicks
  const gradients = [
    'from-romantic-light via-romantic-medium to-romantic-accent',
    'from-purple-200 via-pink-200 to-rose-200',
    'from-blue-200 via-indigo-200 to-purple-200',
    'from-green-200 via-teal-200 to-cyan-200',
    'from-yellow-200 via-orange-200 to-red-200',
    'from-pink-300 via-rose-300 to-red-300',
  ];

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries
    const padding = 20;
    const maxX = container.width - button.width - padding * 2;
    const maxY = container.height - button.height - padding * 2;

    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleRefreshClick = () => {
    setScreen('invitation');
  };

  const handleYesClick = () => {
    // Show agreement message immediately
    setShowAgreement(true);
    
    // Hide buttons after 1 second
    setTimeout(() => {
      setShowButtons(false);
    }, 1000);
    
    // Start confetti
    setShowConfetti(true);
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleNoClick = () => {
    // Increment click count
    setNoClickCount(prev => prev + 1);
    
    // Move button to random position
    moveNoButton();
    
    // Change gradient background
    setGradientIndex(prev => (prev + 1) % gradients.length);
  };

  // Initialize No button position when invitation screen loads
  useEffect(() => {
    if (screen === 'invitation' && containerRef.current && noButtonRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      const centerX = (container.width - button.width) / 2 + 80;
      const centerY = (container.height - button.height) / 2;
      setNoButtonPosition({ x: centerX, y: centerY });
    }
  }, [screen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient - changes on NO clicks */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} opacity-95 transition-all duration-700`} />
      
      {/* 404 Screen */}
      <div
        className={`screen-section ${
          screen === 'notFound' ? 'screen-visible' : 'screen-hidden'
        }`}
      >
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-bold text-romantic-deep">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-romantic-dark">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-romantic-dark/80">
              Oops! Looks like you've wandered into the wrong place...
            </p>
          </div>
          
          <Button
            onClick={handleRefreshClick}
            size="lg"
            className="bg-romantic-deep hover:bg-romantic-darker text-white font-bold text-xl 
                     px-12 py-6 rounded-full shadow-2xl 
                     hover:scale-105 active:scale-95 transition-all duration-200
                     border-4 border-white/30"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Valentine Invitation Screen */}
      <div
        className={`screen-section ${
          screen === 'invitation' ? 'screen-visible' : 'screen-hidden'
        }`}
      >
        <div className="text-center space-y-12 max-w-3xl mx-auto">
          <div className="space-y-6 animate-in fade-in slide-in-from-top duration-700">
            <div className="flex justify-center gap-4">
              <span className="text-6xl animate-bounce">{noClickCount >= 2 ? '😭' : '💔'}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-romantic-deep tracking-tight leading-tight">
              Will you be my Valentine Oishi?
            </h1>
            
            <p className="text-xl md:text-2xl text-romantic-dark font-medium">
              Choose wisely... 💖
            </p>
          </div>

          {/* Agreement Message */}
          {showAgreement && (
            <div className="agreement-message bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-romantic-deep/20">
              <p className="text-xl md:text-2xl font-semibold text-romantic-deep mb-4">
                By clicking YES you agree to:
              </p>
              <ul className="text-left text-lg md:text-xl text-romantic-dark space-y-3 max-w-md mx-auto">
                <li className="flex items-start gap-3">
                  <span className="text-romantic-deep font-bold">•</span>
                  <span>Unlimited cuddles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-romantic-deep font-bold">•</span>
                  <span>Lifetime supply of milk</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-romantic-deep font-bold">•</span>
                  <span>Unlimited sex</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-romantic-deep font-bold">•</span>
                  <span>Daily minimum 1 nudes</span>
                </li>
              </ul>
            </div>
          )}

          {/* Buttons Container */}
          <div
            ref={containerRef}
            className={`relative min-h-[200px] md:min-h-[250px] flex items-center justify-center transition-opacity duration-500 ${
              showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* YES Button */}
            <Button
              onClick={handleYesClick}
              size="lg"
              className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+80px)] -translate-y-1/2 
                       bg-romantic-deep hover:bg-romantic-darker text-white font-bold text-2xl md:text-3xl 
                       px-12 md:px-16 py-8 md:py-10 rounded-full shadow-2xl 
                       hover:scale-110 active:scale-95 transition-all duration-200
                       border-4 border-white/30 min-w-[140px] md:min-w-[180px]"
            >
              YES
            </Button>

            {/* NO Button */}
            <button
              ref={noButtonRef}
              onClick={handleNoClick}
              className="absolute bg-romantic-muted hover:bg-romantic-muted text-romantic-dark font-bold text-2xl md:text-3xl 
                       px-12 md:px-16 py-8 md:py-10 rounded-full shadow-xl
                       transition-all duration-300 ease-out
                       border-4 border-romantic-border min-w-[140px] md:min-w-[180px]
                       cursor-pointer select-none touch-none"
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              }}
            >
              NO
            </button>
          </div>

          <p className="text-sm md:text-base text-romantic-dark/70 italic animate-in fade-in delay-500">
            Hint: There's really only one right answer here... 😉
          </p>
        </div>
      </div>

      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-romantic-deep/20 fill-romantic-deep/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti Overlay */}
      {showConfetti && <ConfettiOverlay />}

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-romantic-dark/60 z-10">
        <p>
          Built with <Heart className="inline w-4 h-4 fill-romantic-deep text-romantic-deep" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-romantic-deep transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

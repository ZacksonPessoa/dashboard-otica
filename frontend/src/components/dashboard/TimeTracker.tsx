import { Pause, Square } from "lucide-react";
import { useState, useEffect } from "react";

export function TimeTracker() {
  const [time, setTime] = useState({ hours: 1, minutes: 24, seconds: 8 });
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="gradient-dark rounded-2xl p-6 text-primary-foreground relative overflow-hidden animate-slide-up" style={{ animationDelay: "700ms" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern id="stripes-tracker" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            </pattern>
          </defs>
          <rect fill="url(#stripes-tracker)" width="200" height="200"/>
        </svg>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-4">Rastreador de Tempo</h3>
        
        <div className="text-4xl font-bold tracking-wider mb-6 font-mono">
          {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="w-12 h-12 rounded-full bg-warning hover:bg-warning/80 flex items-center justify-center transition-colors"
          >
            <Pause className="w-5 h-5 text-warning-foreground" />
          </button>
          <button className="w-12 h-12 rounded-full bg-destructive hover:bg-destructive/80 flex items-center justify-center transition-colors">
            <Square className="w-5 h-5 text-destructive-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

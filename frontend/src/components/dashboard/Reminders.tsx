import { Video } from "lucide-react";

export function Reminders() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Reminders</h3>
      
      <div className="flex items-start gap-4">
        {/* Circular Progress */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 35 * 0.65} ${2 * Math.PI * 35}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>

        {/* Meeting Info */}
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">Meeting with Arc Company</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Time : 02.00 pm - 04.00 pm
          </p>
          <button className="w-full bg-primary hover:bg-accent text-primary-foreground py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <Video className="w-4 h-4" />
            Start Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

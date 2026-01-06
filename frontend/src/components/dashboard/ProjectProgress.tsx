export function ProjectProgress() {
  const progress = 41;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "600ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Progresso do Projeto</h3>
      
      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="hsl(var(--primary))"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{progress}%</span>
            <span className="text-xs text-muted-foreground">Projeto Finalizado</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Concluído</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-chart-3" />
            <span className="text-xs text-muted-foreground">Em Progresso</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Pendente</span>
          </div>
        </div>
      </div>
    </div>
  );
}

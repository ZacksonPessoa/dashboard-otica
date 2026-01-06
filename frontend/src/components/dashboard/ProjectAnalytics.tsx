const data = [
  { day: "S", value: 45 },
  { day: "M", value: 55 },
  { day: "T", value: 74, highlight: true },
  { day: "W", value: 65 },
  { day: "T", value: 70 },
  { day: "F", value: 50 },
  { day: "S", value: 40 },
];

export function ProjectAnalytics() {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Análise de Projetos</h3>
      
      <div className="flex items-end justify-between gap-3 h-40">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full flex justify-center">
              {item.highlight && (
                <span className="absolute -top-6 text-xs font-medium text-foreground">
                  {item.value}%
                </span>
              )}
              <div 
                className="w-8 rounded-t-lg transition-all duration-500"
                style={{ 
                  height: `${(item.value / maxValue) * 120}px`,
                  background: item.highlight 
                    ? 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)'
                    : `repeating-linear-gradient(
                        0deg,
                        hsl(var(--primary)),
                        hsl(var(--primary)) 3px,
                        transparent 3px,
                        transparent 6px
                      )`
                }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

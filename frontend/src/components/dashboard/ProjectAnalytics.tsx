import { useFinance } from "@/hooks/use-finance";
import { cn } from "@/lib/utils";

export function ProjectAnalytics() {
  const { data, isLoading } = useFinance();
  const chartData = data?.data || [];
  const maxValue = data?.maxValue || 100;

  // Dados padrão enquanto carrega
  const defaultData = [
    { day: "D", renda: 0, despesas: 0, highlight: false },
    { day: "S", renda: 0, despesas: 0, highlight: false },
    { day: "T", renda: 0, despesas: 0, highlight: true },
    { day: "Q", renda: 0, despesas: 0, highlight: false },
    { day: "Q", renda: 0, despesas: 0, highlight: false },
    { day: "S", renda: 0, despesas: 0, highlight: false },
    { day: "S", renda: 0, despesas: 0, highlight: false },
  ];

  const displayData = isLoading ? defaultData : chartData;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Financeiro</h3>
      
      <div className="flex items-end justify-between gap-2 h-40">
        {displayData.map((item, index) => {
          const rendaHeight = (item.renda / maxValue) * 120;
          const despesasHeight = (item.despesas / maxValue) * 120;
          const maxHeight = Math.max(rendaHeight, despesasHeight, 10); // Mínimo de 10px

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex justify-center items-end gap-1 h-full">
                {/* Barra de Renda (verde) */}
                <div className="flex-1 flex flex-col items-center">
                  {item.highlight && item.renda > 0 && (
                    <span className="absolute -top-6 text-xs font-medium text-success">
                      R${Math.round(item.rendaValue)}
                    </span>
                  )}
                  <div
                    className="w-full rounded-t transition-all duration-500 bg-success"
                    style={{
                      height: `${rendaHeight}px`,
                      minHeight: rendaHeight > 0 ? "4px" : "0",
                    }}
                  />
                </div>

                {/* Barra de Despesas (vermelho) */}
                <div className="flex-1 flex flex-col items-center">
                  {item.highlight && item.despesas > 0 && (
                    <span className="absolute -top-6 text-xs font-medium text-destructive right-0">
                      R${Math.round(item.despesasValue)}
                    </span>
                  )}
                  <div
                    className="w-full rounded-t transition-all duration-500 bg-destructive"
                    style={{
                      height: `${despesasHeight}px`,
                      minHeight: despesasHeight > 0 ? "4px" : "0",
                    }}
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{item.day}</span>
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-xs text-muted-foreground">Renda</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-destructive" />
          <span className="text-xs text-muted-foreground">Despesas</span>
        </div>
      </div>
    </div>
  );
}

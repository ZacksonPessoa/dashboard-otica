import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStats } from "@/hooks/use-stats";

export function StatsCards() {
  const { data: statsData, isLoading } = useStats();

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const stats = [
    {
      title: "Total de Vendas",
      value: isLoading
        ? "..."
        : formatCurrency(statsData?.totalSales || 0),
      subtitle: "Valor total",
      trend: "up",
      active: true,
    },
    {
      title: "Vendas do Dia",
      value: isLoading ? "..." : (statsData?.todaySales || 0).toString(),
      subtitle: "Quantidade",
      trend: "up",
      active: false,
    },
    {
      title: "Total a Enviar",
      value: isLoading ? "..." : (statsData?.pendingShipments || 0).toString(),
      subtitle: "Pendentes",
      trend: "up",
      active: false,
    },
    {
      title: "Cancelados",
      value: isLoading ? "..." : (statsData?.cancelled || 0).toString(),
      subtitle: "Este mês",
      trend: "neutral",
      active: false,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={cn(
            "rounded-2xl p-5 transition-all duration-300 animate-slide-up",
            stat.active 
              ? "stat-card-active text-primary-foreground" 
              : "bg-card border border-border"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className={cn(
              "text-sm font-medium",
              stat.active ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {stat.title}
            </h3>
            <button className={cn(
              "p-1.5 rounded-lg transition-colors",
              stat.active 
                ? "bg-primary-foreground/20 hover:bg-primary-foreground/30" 
                : "bg-secondary hover:bg-muted"
            )}>
              <ArrowUpRight className={cn(
                "w-4 h-4",
                stat.active ? "text-primary-foreground" : "text-foreground"
              )} />
            </button>
          </div>
          
          <p className={cn(
            "text-4xl font-bold mb-2",
            stat.active ? "text-primary-foreground" : "text-foreground"
          )}>
            {stat.value}
          </p>
          
          <div className="flex items-center gap-1.5">
            {stat.trend === "up" && (
              <TrendingUp className={cn(
                "w-3.5 h-3.5",
                stat.active ? "text-primary-foreground/80" : "text-success"
              )} />
            )}
            <span className={cn(
              "text-xs",
              stat.active ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {stat.subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

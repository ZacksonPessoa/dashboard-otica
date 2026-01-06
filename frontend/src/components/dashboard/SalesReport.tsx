import { MoreVertical } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { cn } from "@/lib/utils";

export function SalesReport() {
  const { data, isLoading } = useProducts();

  const productsLaunched = data?.productsLaunched || 0;
  const salesOfLaunchedProducts = data?.salesOfLaunchedProducts || 0;

  // Valores máximos para a escala (ajustar conforme necessário)
  const maxProducts = 200;
  const maxSales = 2000;

  const productsPercentage = Math.min((productsLaunched / maxProducts) * 100, 100);
  const salesPercentage = Math.min((salesOfLaunchedProducts / maxSales) * 100, 100);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Relatório de Vendas</h3>
        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Produtos Lançados */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Produtos Lançados</span>
            {isLoading ? (
              <span className="text-sm font-semibold text-success">...</span>
            ) : (
              <span className="text-sm font-semibold text-success">
                ({productsLaunched})
              </span>
            )}
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-500 rounded-full"
              style={{ width: `${productsPercentage}%` }}
            />
          </div>
        </div>

        {/* Vendas de Produtos Lançados */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Vendas de Produtos Lançados</span>
            {isLoading ? (
              <span className="text-sm font-semibold text-success">...</span>
            ) : (
              <span className="text-sm font-semibold text-success">
                ({salesOfLaunchedProducts})
              </span>
            )}
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-500 rounded-full"
              style={{ width: `${salesPercentage}%` }}
            />
          </div>
        </div>

        {/* Escala numérica */}
        <div className="relative pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>500</span>
            <span>1000</span>
            <span>1500</span>
            <span>2000</span>
          </div>
        </div>
      </div>
    </div>
  );
}


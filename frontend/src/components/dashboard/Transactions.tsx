import { MoreVertical, Package } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { cn } from "@/lib/utils";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Concluído":
      return "text-success";
    case "Pendente":
      return "text-warning";
    case "Cancelado":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

export function Transactions() {
  const { data: transactions = [], isLoading } = useTransactions();

  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Transações</h3>
        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Carregando transações...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Nenhuma transação encontrada</div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {transaction.productName}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={cn("text-sm font-medium mb-1", getStatusStyles(transaction.status))}>
                  {transaction.status}
                </p>
                <p className="text-xs text-muted-foreground font-mono">{transaction.id}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


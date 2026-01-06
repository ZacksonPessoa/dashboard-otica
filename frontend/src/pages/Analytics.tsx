import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { useProductAnalysis } from "@/hooks/use-product-analysis";
import { useDateRange, DateRangeProvider } from "@/contexts/DateRangeContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AnalyticsContent() {
  const { dateRange, setDateRange } = useDateRange();
  const { data, isLoading, error } = useProductAnalysis();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "profit" | "loss">("all");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const summary = data?.summary || { total: 0, withProfit: 0, withLoss: 0, totalProfit: 0 };
  const products = data?.products || [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por tipo (lucro/prejuízo)
    if (filter === "profit") {
      filtered = filtered.filter((p) => p.profit > 0);
    } else if (filter === "loss") {
      filtered = filtered.filter((p) => p.profit < 0);
    }

    // Filtro por busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term) ||
          p.orderId.includes(term)
      );
    }

    return filtered;
  }, [products, filter, searchTerm]);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header />
        
        <main className="p-6 pt-24">
          {/* Title Section */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Análise por Produto</h1>
              <p className="text-muted-foreground">
                Visualize quais produtos geram lucro ou prejuízo
              </p>
            </div>
            <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-2xl p-5 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-3xl font-bold text-foreground">
                {isLoading ? "..." : summary.total}
              </p>
            </div>
            <div className="bg-success/10 rounded-2xl p-5 border border-success/20">
              <p className="text-sm text-muted-foreground mb-1">Com Lucro</p>
              <p className="text-3xl font-bold text-success">
                {isLoading ? "..." : summary.withProfit}
              </p>
            </div>
            <div className="bg-destructive/10 rounded-2xl p-5 border border-destructive/20">
              <p className="text-sm text-muted-foreground mb-1">Com Prejuízo</p>
              <p className="text-3xl font-bold text-destructive">
                {isLoading ? "..." : summary.withLoss}
              </p>
            </div>
            <div className="bg-success/10 rounded-2xl p-5 border border-success/20">
              <p className="text-sm text-muted-foreground mb-1">Lucro Total</p>
              <p className="text-3xl font-bold text-success">
                {isLoading ? "..." : formatCurrency(summary.totalProfit)}
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl p-4 border border-border mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produto, SKU ou pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={filter === "profit" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("profit")}
                >
                  Com Lucro
                </Button>
                <Button
                  variant={filter === "loss" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("loss")}
                >
                  Com Prejuízo
                </Button>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Produto</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Pedido</TableHead>
                  <TableHead className="text-right">Preço Venda</TableHead>
                  <TableHead className="text-right">Total Custos</TableHead>
                  <TableHead className="text-right">Lucro Real</TableHead>
                  <TableHead className="text-right">Margem</TableHead>
                  <TableHead>Problema</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-destructive">
                      Erro ao carregar produtos. Verifique o console para mais detalhes.
                    </TableCell>
                  </TableRow>
                ) : isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Carregando produtos...
                    </TableCell>
                  </TableRow>
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const isExpanded = expandedRows.has(product.id);
                    const hasProfit = product.profit > 0;

                    return (
                      <React.Fragment key={product.id}>
                        <TableRow className="cursor-pointer" onClick={() => toggleRow(product.id)}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="font-medium">{product.productName}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                          <TableCell className="font-mono text-sm">{product.orderId}</TableCell>
                          <TableCell className="text-right">{formatCurrency(product.salePrice)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(product.totalCosts)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {hasProfit ? (
                                <TrendingUp className="w-4 h-4 text-success" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-destructive" />
                              )}
                              <span
                                className={cn(
                                  "font-medium",
                                  hasProfit ? "text-success" : "text-destructive"
                                )}
                              >
                                {formatCurrency(product.profit)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={cn(
                                "inline-block px-2 py-1 rounded text-xs font-medium",
                                hasProfit
                                  ? "bg-success/10 text-success"
                                  : "bg-destructive/10 text-destructive"
                              )}
                            >
                              {formatPercent(product.margin)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {product.problems.length > 0 ? (
                              <div className="flex items-center gap-1 text-warning">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-xs">{product.problems.join(", ")}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={8} className="bg-muted/30">
                              <div className="p-4">
                                <div className="flex items-center gap-2 mb-4">
                                  <AlertTriangle className="w-5 h-5 text-warning" />
                                  <h4 className="font-semibold text-foreground">
                                    Análise de Lucro - {product.productName} - Pedido #{product.orderId}
                                  </h4>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Preço de Venda</p>
                                    <p className="text-lg font-semibold">{formatCurrency(product.salePrice)}</p>
                                    <p className="text-sm text-muted-foreground mt-2">Frete</p>
                                    <p className="text-lg font-semibold">{formatCurrency(product.shipping)}</p>
                                    <p className="text-sm text-success mt-2">Lucro</p>
                                    <p className="text-lg font-semibold text-success">
                                      {formatCurrency(product.profit)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Custo do Produto</p>
                                    <p className="text-lg font-semibold">{formatCurrency(product.productCost)}</p>
                                    <p className="text-sm text-muted-foreground mt-2">Total Recebido</p>
                                    <p className="text-lg font-semibold">
                                      {formatCurrency(product.salePrice - product.commission)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Comissão</p>
                                    <p className="text-lg font-semibold">{formatCurrency(product.commission)}</p>
                                    <p className="text-sm text-success mt-2">Margem</p>
                                    <p className="text-lg font-semibold text-success">
                                      {formatPercent(product.margin)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

const Analytics = () => {
  return (
    <DateRangeProvider>
      <AnalyticsContent />
    </DateRangeProvider>
  );
};

export default Analytics;


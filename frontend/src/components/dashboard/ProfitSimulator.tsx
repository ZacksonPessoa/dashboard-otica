import { useState } from "react";
import { Calculator, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export function ProfitSimulator() {
  const [salePrice, setSalePrice] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [commission, setCommission] = useState<string>("13"); // Comissão padrão do ML ~13%
  const [shipping, setShipping] = useState<string>("");
  const [extraFees, setExtraFees] = useState<string>("");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Calcular valores
  const salePriceNum = parseFloat(salePrice) || 0;
  const productCostNum = parseFloat(productCost) || 0;
  const commissionNum = parseFloat(commission) || 0;
  const shippingNum = parseFloat(shipping) || 0;
  const extraFeesNum = parseFloat(extraFees) || 0;

  // Calcular comissão em valor
  const commissionValue = salePriceNum * (commissionNum / 100);
  
  // Receita líquida (preço de venda - comissão)
  const netRevenue = salePriceNum - commissionValue;
  
  // Total de custos
  const totalCosts = productCostNum + commissionValue + shippingNum + extraFeesNum;
  
  // Lucro/Prejuízo
  const profit = netRevenue - productCostNum - shippingNum - extraFeesNum;
  
  // Margem
  const margin = salePriceNum > 0 ? (profit / salePriceNum) * 100 : 0;
  
  const hasNegativeMargin = margin < 0;

  return (
    <Card className="bg-card rounded-2xl border border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          <CardTitle>Simulador de Lucro Real</CardTitle>
        </div>
        <CardDescription>
          Calcule o lucro real de uma venda considerando todos os custos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Campos de entrada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salePrice">Preço de Venda</Label>
            <Input
              id="salePrice"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productCost">Custo do Produto</Label>
            <Input
              id="productCost"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission">Comissão do Mercado Livre (%)</Label>
            <Input
              id="commission"
              type="number"
              step="0.01"
              placeholder="13"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shipping">Frete</Label>
            <Input
              id="shipping"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="extraFees">Taxas Extras</Label>
            <Input
              id="extraFees"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={extraFees}
              onChange={(e) => setExtraFees(e.target.value)}
            />
          </div>
        </div>

        {/* Alerta de margem negativa */}
        {hasNegativeMargin && salePriceNum > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Atenção!</strong> Margem negativa detectada. Esta venda resultará em prejuízo.
            </AlertDescription>
          </Alert>
        )}

        {/* Resultado */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Receita Bruta:</span>
            <span className="font-medium">{formatCurrency(salePriceNum)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Comissão ({commissionNum}%):</span>
            <span className="font-medium text-destructive">-{formatCurrency(commissionValue)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Receita Líquida:</span>
            <span className="font-medium">{formatCurrency(netRevenue)}</span>
          </div>
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Custo do Produto:</span>
              <span className="font-medium text-destructive">-{formatCurrency(productCostNum)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Frete:</span>
              <span className="font-medium text-destructive">-{formatCurrency(shippingNum)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Taxas Extras:</span>
              <span className="font-medium text-destructive">-{formatCurrency(extraFeesNum)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total de Custos:</span>
              <span className="font-medium text-destructive">-{formatCurrency(totalCosts)}</span>
            </div>
          </div>
          <div className={cn(
            "border-t border-border pt-3 mt-3 flex items-center justify-between",
            hasNegativeMargin ? "text-destructive" : "text-success"
          )}>
            <div className="flex items-center gap-2">
              {hasNegativeMargin ? (
                <TrendingDown className="w-5 h-5" />
              ) : (
                <TrendingUp className="w-5 h-5" />
              )}
              <span className="text-lg font-semibold">Resultado Final:</span>
            </div>
            <span className={cn(
              "text-2xl font-bold",
              hasNegativeMargin ? "text-destructive" : "text-success"
            )}>
              {formatCurrency(profit)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Margem:</span>
            <span className={cn(
              "font-semibold text-lg",
              hasNegativeMargin ? "text-destructive" : "text-success"
            )}>
              {formatPercent(margin)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


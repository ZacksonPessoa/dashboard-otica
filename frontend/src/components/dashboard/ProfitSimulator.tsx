import { useState, useEffect } from "react";
import { Calculator, AlertTriangle, TrendingUp, TrendingDown, Check, ChevronsUpDown, Package, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useProductsList } from "@/hooks/use-products-list";
import { Product } from "@/lib/api";

export function ProfitSimulator() {
  const { data: products = [], isLoading: isLoadingProducts } = useProductsList();
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const [salePrice, setSalePrice] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [commission, setCommission] = useState<string>("13");
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

  const handleSelectProduct = (currentValue: string) => {
    const product = products.find((p) => p.id === currentValue);
    setSelectedProductId(currentValue);
    setOpen(false);

    if (product) {
      setSalePrice(product.price.toString());

      // Lógica de comissão
      // gold_special = Clássico (aprox 13%)
      // gold_pro = Premium (aprox 18%)
      const isPremium = product.listing_type_id === "gold_pro";
      setCommission(isPremium ? "18" : "13");

      // Lógica de frete
      // Se não é frete grátis, custo é 0 (comprador paga)
      // Se é frete grátis, o vendedor paga.
      // Como a API pública de itens search não retorna o custo exato fácil sem contexto,
      // vamos assumir que se é frete grátis, e é Premium, o frete pode ter subsídio.
      // Por enquanto, se não temos o valor, definimos como 0 mas marcamos.
      // *Usuário pediu para não alterar frete*.
      // *Usuário pediu para não alterar frete*.
      if (!product.shipping?.free_shipping) {
        setShipping("0");
      } else {
        // TODO: Tentar obter custo real. Por ora, 0.
        // Talvez adicionar uma flag visual.
        setShipping("0");
      }
    }
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

  const selectedProduct = products.find(p => p.id === selectedProductId);

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

        {/* Seleção de Produto */}
        <div className="space-y-2">
          <Label>Selecione um Produto (Opcional)</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedProduct
                  ? selectedProduct.title
                  : "Selecione um produto para preencher..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <Command>
                <CommandInput placeholder="Buscar produto..." />
                <CommandList>
                  <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                  <CommandGroup>
                    {products.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.id}
                        onSelect={() => handleSelectProduct(product.id)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedProductId === product.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="truncate">{product.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

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
            <Label htmlFor="commission" className="flex items-center gap-2">
              Comissão do Mercado Livre (%)
              {selectedProduct && <span className="text-xs text-muted-foreground">({selectedProduct.listing_type_id === 'gold_pro' ? 'Premium' : 'Clássico'})</span>}
            </Label>
            <Input
              id="commission"
              type="number"
              step="0.01"
              placeholder="13"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              readOnly={!!selectedProduct}
              className={selectedProduct ? "bg-muted" : ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shipping" className="flex items-center gap-2">
              Frete
              {selectedProduct && selectedProduct.shipping?.free_shipping && <span className="text-xs text-emerald-500 font-medium">(Grátis)</span>}
            </Label>
            <Input
              id="shipping"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              readOnly={!!selectedProduct}
              className={selectedProduct ? "bg-muted" : ""}
            />
            {selectedProduct && selectedProduct.shipping?.free_shipping && shipping === "0" && (
              <p className="text-xs text-amber-500 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Custo de frete não identificado.
              </p>
            )}
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


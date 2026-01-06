import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { useTransactions } from "@/hooks/use-transactions";
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

function TransactionsContent() {
  const navigate = useNavigate();
  const { dateRange, setDateRange } = useDateRange();
  const { data: transactions = [], isLoading, error } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Filtrar transações
  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactions;

    const term = searchTerm.toLowerCase();
    return transactions.filter(
      (t) =>
        t.productName.toLowerCase().includes(term) ||
        t.id.includes(term) ||
        t.buyer.toLowerCase().includes(term) ||
        t.cpf.includes(term) ||
        t.address.toLowerCase().includes(term)
    );
  }, [transactions, searchTerm]);


  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header />
        
        <main className="p-6 pt-24">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Transações</h1>
            </div>
            <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          </div>

          {/* Search Bar */}
          <div className="bg-card rounded-2xl p-4 border border-border mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por produto, pedido, comprador, CPF ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead>Comprador</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Pedido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-destructive">
                      Erro ao carregar transações. Verifique o console para mais detalhes.
                    </TableCell>
                  </TableRow>
                ) : isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Carregando transações...
                    </TableCell>
                  </TableRow>
                ) : filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhuma transação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={`${transaction.id}-${transaction.productName}`}>
                      <TableCell className="text-sm">{transaction.date}</TableCell>
                      <TableCell>
                        <span className="font-medium">{transaction.productName}</span>
                      </TableCell>
                      <TableCell className="text-center">{transaction.quantity}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(transaction.price)}
                      </TableCell>
                      <TableCell>{transaction.buyer}</TableCell>
                      <TableCell className="font-mono text-sm">{transaction.cpf}</TableCell>
                      <TableCell className="text-sm max-w-xs truncate">
                        {transaction.address}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

const Transactions = () => {
  return (
    <DateRangeProvider>
      <TransactionsContent />
    </DateRangeProvider>
  );
};

export default Transactions;


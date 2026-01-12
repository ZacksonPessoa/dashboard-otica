import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useProductsList } from "@/hooks/use-products-list";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DateRangeProvider } from "@/contexts/DateRangeContext";

function ProductsContent() {
    const { data: products = [], isLoading, error } = useProductsList();
    const [searchTerm, setSearchTerm] = useState("");

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <div className="ml-0 md:ml-64">
                <Header />

                <main className="p-6 pt-24">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-1">Meus Produtos</h1>
                            <p className="text-muted-foreground">
                                Lista de produtos ativos no Mercado Livre
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-card rounded-2xl p-4 border border-border mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por título..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Imagem</TableHead>
                                    <TableHead>Título</TableHead>
                                    <TableHead>Valor de Venda</TableHead>
                                    <TableHead>Tipo de Anúncio</TableHead>
                                    <TableHead className="text-right">Vendidos</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            Carregando produtos...
                                        </TableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-destructive">
                                            Erro ao carregar produtos.
                                        </TableCell>
                                    </TableRow>
                                ) : filteredProducts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            Nenhum produto encontrado.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    className="w-12 h-12 object-contain rounded-md border border-border bg-white"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <a
                                                    href={product.permalink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium hover:underline text-primary"
                                                >
                                                    {product.title}
                                                </a>
                                                <p className="text-xs text-muted-foreground mt-1">ID: {product.id}</p>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {formatCurrency(product.price)}
                                            </TableCell>
                                            <TableCell>
                                                <span className="capitalize">
                                                    {product.listing_type_id.replace(/_/g, " ")}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                {product.sold_quantity}
                                            </TableCell>
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

const Products = () => {
    return (
        <DateRangeProvider>
            <ProductsContent />
        </DateRangeProvider>
    );
};

export default Products;

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ProfitSimulator } from "@/components/dashboard/ProfitSimulator";

const Simulator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-0 md:ml-64">
        <Header />

        <main className="p-6 pt-24">
          {/* Title Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-1">Simulador de Lucro Real</h1>
            <p className="text-muted-foreground">
              Calcule o lucro real de uma venda considerando todos os custos e taxas
            </p>
          </div>

          {/* Simulator */}
          <div className="max-w-4xl">
            <ProfitSimulator />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Simulator;


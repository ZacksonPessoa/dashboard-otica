import { Plus, Upload } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProjectAnalytics } from "@/components/dashboard/ProjectAnalytics";
import { SalesReport } from "@/components/dashboard/SalesReport";
import { Transactions } from "@/components/dashboard/Transactions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64">
        <Header />
        
        <main className="p-6 pt-24">
          {/* Title Section */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Planeje, priorize e realize suas tarefas com facilidade.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-primary hover:bg-accent text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Adicionar Projeto
              </button>
              <button className="flex items-center gap-2 border border-border hover:border-primary text-foreground px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-secondary">
                <Upload className="w-4 h-4" />
                Importar Dados
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-4 mt-6">
            {/* Project Analytics */}
            <div className="col-span-4">
              <ProjectAnalytics />
            </div>

            {/* Sales Report */}
            <div className="col-span-8">
              <SalesReport />
            </div>

            {/* Transactions */}
            <div className="col-span-12">
              <Transactions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const team = [
  {
    name: "Alexandra Deff",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    task: "Repositório do Projeto Github",
    status: "Concluído",
  },
  {
    name: "Edwin Adenike",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    task: "Integrar Sistema de Autenticação",
    status: "Em Progresso",
  },
  {
    name: "Isaac Oluwatemilorum",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    task: "Desenvolver Busca e Filtros",
    status: "Pendente",
  },
  {
    name: "David Oshodi",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    task: "Layout Responsivo para Página Inicial",
    status: "Em Progresso",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Concluído":
      return "bg-success/10 text-success";
    case "Em Progresso":
      return "bg-primary/10 text-primary";
    case "Pendente":
      return "bg-warning/10 text-warning";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function TeamCollaboration() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Colaboração da Equipe</h3>
        <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary">
          <Plus className="w-4 h-4" />
          Adicionar Membro
        </button>
      </div>
      
      <div className="space-y-3">
        {team.map((member) => (
          <div 
            key={member.name}
            className="flex items-center gap-3"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                Trabalhando em: <span className="text-foreground font-medium">{member.task}</span>
              </p>
            </div>
            <span className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full",
              getStatusStyles(member.status)
            )}>
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

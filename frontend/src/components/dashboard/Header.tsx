import { Search, Mail, Bell, Command, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/use-notifications";
import { useMe } from "@/hooks/use-me";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";

export function Header() {
  const { data: notifications = [], isLoading } = useNotifications();
  const { data: userMe, isLoading: isLoadingMe, error: errorMe } = useMe();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Gerar iniciais do avatar
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "ML";
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case "questions":
        return "Nova Pergunta";
      case "messages":
        return "Nova Mensagem";
      case "orders_v2":
        return "Nova Venda";
      case "items":
        return "Anúncio Atualizado";
      case "shipments":
        return "Atualização de Envio";
      case "payments":
        return "Atualização de Pagamento";
      case "unknown":
        return "Nova Notificação";
      default:
        return type === "unknown" ? "Nova Notificação" : type;
    }
  };

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 z-30">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        {/* Search */}
        <div className="relative w-72 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar tarefa"
            className="w-full pl-10 pr-16 py-2 bg-background rounded-lg border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <Command className="w-3 h-3" />
            <span>F</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Mail className="w-5 h-5 text-muted-foreground" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>
              Notificações {unreadCount > 0 && `(${unreadCount})`}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isLoading ? (
              <DropdownMenuItem disabled>Carregando...</DropdownMenuItem>
            ) : notifications.length === 0 ? (
              <DropdownMenuItem disabled>Nenhuma notificação</DropdownMenuItem>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium">
                      {getNotificationTitle(notification.type)}
                    </span>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <Avatar className="w-10 h-10">
            <AvatarImage src={userMe?.picture} />
            <AvatarFallback>
              {isLoadingMe
                ? "..."
                : getInitials(
                  userMe?.first_name || userMe?.nickname,
                  userMe?.email
                )}
            </AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">
              {isLoadingMe
                ? "Carregando..."
                : errorMe
                  ? "Erro ao carregar"
                  : userMe?.nickname || "Usuário"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isLoadingMe
                ? "..."
                : errorMe
                  ? "Verifique o console"
                  : userMe?.email || "Email não disponível"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

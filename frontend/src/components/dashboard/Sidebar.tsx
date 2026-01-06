import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Geral", active: true },
  { icon: BarChart3, label: "Análises" },
  { icon: CheckSquare, label: "Transações" },
];

const generalItems = [
  { icon: LogOut, label: "Sair" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <span className="text-xl font-bold text-foreground">Oticas Conceição</span>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 px-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-3">
          Menu
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  item.active 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "ml-auto text-xs px-2 py-0.5 rounded-full",
                    item.active 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <ul className="space-y-1">
          {generalItems.map((item) => (
            <li key={item.label}>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

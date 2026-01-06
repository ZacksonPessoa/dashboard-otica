import { Search, Mail, Bell, Command } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search task"
          className="w-full pl-10 pr-16 py-2 bg-background rounded-lg border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
          <Command className="w-3 h-3" />
          <span>F</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Mail className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Totok Michael</p>
            <p className="text-xs text-muted-foreground">tmichael20@mail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

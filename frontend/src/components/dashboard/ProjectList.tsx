import { Plus, Zap, GitBranch, Layout, Gauge, Globe } from "lucide-react";

const projects = [
  { 
    icon: Zap, 
    title: "Develop API Endpoints", 
    date: "Nov 26, 2024",
    color: "bg-primary"
  },
  { 
    icon: GitBranch, 
    title: "Onboarding Flow", 
    date: "Nov 28, 2024",
    color: "bg-chart-2"
  },
  { 
    icon: Layout, 
    title: "Build Dashboard", 
    date: "Nov 30, 2024",
    color: "bg-chart-3"
  },
  { 
    icon: Gauge, 
    title: "Optimize Page Load", 
    date: "Dec 5, 2024",
    color: "bg-chart-4"
  },
  { 
    icon: Globe, 
    title: "Cross-Browser Testing", 
    date: "Dec 6, 2024",
    color: "bg-chart-5"
  },
];

export function ProjectList() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Project</h3>
        <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary">
          <Plus className="w-4 h-4" />
          New
        </button>
      </div>
      
      <div className="space-y-3">
        {projects.map((project, index) => (
          <div 
            key={project.title}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg ${project.color} flex items-center justify-center`}>
              <project.icon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{project.title}</p>
              <p className="text-xs text-muted-foreground">Due date: {project.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

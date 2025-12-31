import { Heart, BookOpen, Wind, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
function handleLogout() {
  localStorage.removeItem("nickname");
  window.location.reload();
}

export default function Navigation() {
  const [active, setActive] = useState('home');

  const navItems = [
    { id: 'home', label: 'Início', icon: Heart, path: '/' },
    { id: 'diary', label: 'Diário', icon: BookOpen, path: '/diary' },
    { id: 'breathing', label: 'Respiração', icon: Wind, path: '/breathing' },
    { id: 'affirmations', label: 'Afirmações', icon: Sparkles, path: '/affirmations' },
    { id: 'progress', label: 'Progresso', icon: TrendingUp, path: '/progress' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg md:relative md:border-t-0 md:border-r md:shadow-none md:w-64 md:h-screen md:flex md:flex-col">
      <div className="hidden md:flex md:flex-col md:items-center md:justify-start md:p-8 md:gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="display-title text-center text-2xl">Cura Coração</h1>
        <p className="text-sm text-muted-foreground text-center">Seu caminho para a renovação</p>
      </div>

      <div className="flex md:flex-col gap-2 p-4 md:p-4 md:flex-1 md:overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <Link key={item.id} href={item.path}>
              <button
                onClick={() => setActive(item.id)}
                className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>

      <div className="hidden md:block p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Sua jornada de cura começa aqui
        </p>
      </div>
    </nav>
  );
}

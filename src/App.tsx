import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Breathing from "./pages/Breathing";
import Affirmations from "./pages/Affirmations";
import Progress from "./pages/Progress";
import Login from "./pages/Login";

function Router() {
  const nickname = localStorage.getItem("nickname");

  if (!nickname) {
    return <Login />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/diary" component={Diary} />
          <Route path="/breathing" component={Breathing} />
          <Route path="/affirmations" component={Affirmations} />
          <Route path="/progress" component={Progress} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}


function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

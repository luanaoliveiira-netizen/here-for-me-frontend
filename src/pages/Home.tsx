import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, Wind, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';

/**
 * Design Philosophy: Therapeutic Minimalism
 * - Generous whitespace and breathing room
 * - Soft, rounded elements (radius: 1.2rem)
 * - Warm color palette: cream, beige, teal-water
 * - Slow, gentle animations (300-600ms)
 * - Typography: Poppins for titles, Inter for body
 */

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Diário de Sentimentos',
      description: 'Registre seus sentimentos diários e acompanhe sua jornada emocional com reflexões profundas.',
      path: '/diary',
      color: 'from-blue-100 to-blue-50',
    },
    {
      icon: Wind,
      title: 'Exercícios de Respiração',
      description: 'Técnicas guiadas de respiração para acalmar a mente e encontrar paz interior.',
      path: '/breathing',
      color: 'from-teal-100 to-teal-50',
    },
    {
      icon: Sparkles,
      title: 'Afirmações Positivas',
      description: 'Mensagens inspiradoras personalizadas para fortalecer sua autoestima e esperança.',
      path: '/affirmations',
      color: 'from-amber-100 to-amber-50',
    },
    {
      icon: TrendingUp,
      title: 'Linha do Tempo',
      description: 'Visualize seu progresso e celebre cada passo em direção à cura e renovação.',
      path: '/progress',
      color: 'from-emerald-100 to-emerald-50',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Hero Section */}
      <section className={`pt-12 md:pt-20 px-4 md:px-8 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="display-title text-4xl md:text-5xl text-foreground">
            Bem-vindo ao Here for Me
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
           Um espaço seguro para acolher emoções, atravessar fases difíceis e reconstruir o equilíbrio interno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/diary">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                Começar Jornada
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/breathing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8">
                Respirar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mt-20 md:mt-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="section-title text-3xl md:text-4xl text-foreground">
              Recursos para sua Cura
            </h2>
            <p className="text-muted-foreground text-lg">
              Ferramentas cuidadosamente desenvolvidas para apoiar sua jornada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} href={feature.path}>
                  <Card className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br ${feature.color} border-border/50`}>
                    <CardHeader className="space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                        <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary font-medium text-sm">
                        Explorar
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-20 md:mt-32 px-4 md:px-8 py-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl mx-4 md:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="section-title text-2xl md:text-3xl text-foreground">
            Sua Cura Começa Aqui
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sabemos que o fim de um relacionamento é um dos momentos mais desafiadores da vida. Este aplicativo foi criado com amor e cuidado para ajudá-lo a processar emoções, encontrar paz interior e reconstruir sua vida com esperança e força.
          </p>
          <p className="text-base text-muted-foreground italic">
            "A cura não é sobre esquecer. É sobre aprender, crescer e se amar novamente."
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-20 md:mt-32 px-4 md:px-8 pb-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="section-title text-2xl md:text-3xl text-foreground">
            Pronto para começar?
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha uma ferramenta abaixo e dê o primeiro passo em sua jornada de cura.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <Link href="/diary">
              <button className="w-full p-4 rounded-xl bg-card hover:bg-secondary transition-colors border border-border text-center space-y-2">
                <BookOpen className="w-6 h-6 text-primary mx-auto" />
                <span className="text-sm font-medium text-foreground block">Diário</span>
              </button>
            </Link>
            <Link href="/breathing">
              <button className="w-full p-4 rounded-xl bg-card hover:bg-secondary transition-colors border border-border text-center space-y-2">
                <Wind className="w-6 h-6 text-primary mx-auto" />
                <span className="text-sm font-medium text-foreground block">Respiração</span>
              </button>
            </Link>
            <Link href="/affirmations">
              <button className="w-full p-4 rounded-xl bg-card hover:bg-secondary transition-colors border border-border text-center space-y-2">
                <Sparkles className="w-6 h-6 text-primary mx-auto" />
                <span className="text-sm font-medium text-foreground block">Afirmações</span>
              </button>
            </Link>
            <Link href="/progress">
              <button className="w-full p-4 rounded-xl bg-card hover:bg-secondary transition-colors border border-border text-center space-y-2">
                <TrendingUp className="w-6 h-6 text-primary mx-auto" />
                <span className="text-sm font-medium text-foreground block">Progresso</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Therapeutic Minimalism
 * - Gentle, flowing animations that guide breathing
 * - Soft, calming visual feedback
 * - Large, easy-to-read instructions
 * - Focus on relaxation and peace
 */

interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  duration: string;
}

export default function Breathing() {
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [scale, setScale] = useState(1);

  const exercises: BreathingExercise[] = [
    {
      id: '4-7-8',
      name: 'Técnica 4-7-8',
      description: 'Respiração relaxante que acalma o sistema nervoso. Perfeita antes de dormir.',
      inhale: 4,
      hold: 7,
      exhale: 8,
      cycles: 4,
      duration: '~5 minutos',
    },
    {
      id: 'box',
      name: 'Respiração em Caixa',
      description: 'Técnica equilibrada que reduz ansiedade e aumenta foco. Ótima para qualquer hora.',
      inhale: 4,
      hold: 4,
      exhale: 4,
      cycles: 8,
      duration: '~4 minutos',
    },
    {
      id: 'coherent',
      name: 'Respiração Coerente',
      description: 'Respiração ritmada que sincroniza corpo e mente. Ideal para meditação.',
      inhale: 5,
      hold: 0,
      exhale: 5,
      cycles: 6,
      duration: '~3 minutos',
    },
    {
      id: 'energizing',
      name: 'Respiração Energizante',
      description: 'Técnica ativadora que aumenta energia e clareza mental.',
      inhale: 4,
      hold: 0,
      exhale: 2,
      cycles: 10,
      duration: '~2 minutos',
    },
  ];

  // Main breathing timer
  useEffect(() => {
    if (!isActive || !selectedExercise) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            setScale(1.2);
            return selectedExercise.hold || 1;
          } else if (phase === 'hold') {
            setPhase('exhale');
            setScale(0.8);
            return selectedExercise.exhale;
          } else if (phase === 'exhale') {
            setScale(1);
            setCycleCount(prev => prev + 1);
            
            if (cycleCount + 1 >= selectedExercise.cycles) {
              setIsActive(false);
              toast.success('Exercício concluído! Você fez um ótimo trabalho! 🌟');
              return 0;
            }
            
            setPhase('inhale');
            return selectedExercise.inhale;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, selectedExercise, cycleCount]);

  const startExercise = (exercise: BreathingExercise) => {
    setSelectedExercise(exercise);
    setIsActive(true);
    setPhase('inhale');
    setCycleCount(0);
    setTimeLeft(exercise.inhale);
    setScale(1.2);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setSelectedExercise(null);
    setPhase('inhale');
    setTimeLeft(0);
    setCycleCount(0);
    setScale(1);
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'inhale':
        return 'Inspire';
      case 'hold':
        return 'Segure';
      case 'exhale':
        return 'Expire';
      default:
        return '';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-blue-300 to-blue-100';
      case 'hold':
        return 'from-purple-300 to-purple-100';
      case 'exhale':
        return 'from-green-300 to-green-100';
      default:
        return 'from-gray-300 to-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <section className="pt-12 md:pt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wind className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Exercícios de Respiração</h1>
              <p className="text-muted-foreground">Técnicas guiadas para acalmar e centrar sua mente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Exercise */}
      {selectedExercise && (
        <section className="mt-8 px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle>{selectedExercise.name}</CardTitle>
                <CardDescription>
                  Ciclo {cycleCount + 1} de {selectedExercise.cycles}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Breathing Circle */}
                <div className="flex justify-center">
                  <div
                    className={`w-40 h-40 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center transition-transform duration-1000 ease-in-out shadow-lg`}
                    style={{ transform: `scale(${scale})` }}
                  >
                    <div className="text-center">
                      <p className="text-4xl font-bold text-foreground">{timeLeft}</p>
                      <p className="text-lg font-semibold text-foreground mt-2">{getPhaseLabel()}</p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-foreground">
                    {phase === 'inhale' && 'Inspire lentamente pelo nariz'}
                    {phase === 'hold' && 'Segure a respiração'}
                    {phase === 'exhale' && 'Expire lentamente pela boca'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Siga o ritmo do círculo. Você está fazendo um ótimo trabalho.
                  </p>
                </div>

                {/* Controls */}
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={togglePause}
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Retomar
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={resetExercise}
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reiniciar
                  </Button>
                </div>

                {/* Progress */}
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((cycleCount + 1) / selectedExercise.cycles) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Exercise Selection */}
      {!selectedExercise && (
        <section className="mt-12 px-4 md:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Escolha um Exercício</h2>
              <p className="text-muted-foreground">
                Selecione a técnica que melhor se adequa ao seu estado atual
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercises.map(exercise => (
                <Card
                  key={exercise.id}
                  className="border-border/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{exercise.name}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <p className="font-bold text-blue-700">{exercise.inhale}s</p>
                        <p className="text-xs text-blue-600">Inspire</p>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                        <p className="font-bold text-purple-700">{exercise.hold}s</p>
                        <p className="text-xs text-purple-600">Segure</p>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                        <p className="font-bold text-green-700">{exercise.exhale}s</p>
                        <p className="text-xs text-green-600">Expire</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {exercise.cycles} ciclos • {exercise.duration}
                      </span>
                    </div>
                    <Button
                      onClick={() => startExercise(exercise)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Começar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

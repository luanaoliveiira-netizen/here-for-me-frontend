import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, Heart, Award, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Design Philosophy: Therapeutic Minimalism
 * - Celebrate progress and growth
 * - Visual data representation that's easy to understand
 * - Encouraging milestones and achievements
 * - Focus on positive trajectory
 */

interface MoodData {
  date: string;
  mood: number;
}

export default function Progress() {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    diaryDays: 0,
    breathingExercises: 0,
    currentStreak: 0,
  });

  // Load data from localStorage
  useEffect(() => {
    const diaryEntries = localStorage.getItem('diaryEntries');
    const breathingCount = localStorage.getItem('breathingCount') || '0';

    if (diaryEntries) {
      const entries = JSON.parse(diaryEntries);
      const moodMap: { [key: string]: number } = {};

      entries.forEach((entry: any) => {
        const moodValues: { [key: string]: number } = {
          sad: 1,
          anxious: 2,
          neutral: 3,
          hopeful: 4,
          happy: 5,
        };
        const moodValue = moodValues[entry.mood] || 3;

        moodMap[entry.date] = moodValue;
      });

      const chartData = Object.entries(moodMap)
        .map(([date, mood]) => ({ date, mood: mood as number }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-30);

      setMoodData(chartData);
      setStats({
        totalEntries: entries.length,
        diaryDays: Object.keys(moodMap).length,
        breathingExercises: parseInt(breathingCount),
        currentStreak: calculateStreak(entries),
      });
    }
  }, []);

  const calculateStreak = (entries: any[]) => {
    if (entries.length === 0) return 0;

    const dates = entries.map(e => new Date(e.date).toDateString()).filter((v, i, a) => a.indexOf(v) === i);
    const today = new Date().toDateString();
    let streak = 0;

    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (currentDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const milestones = [
    { days: 7, icon: Heart, label: 'Uma Semana', description: 'Você começou sua jornada' },
    { days: 14, icon: Zap, label: 'Duas Semanas', description: 'Você está se comprometendo' },
    { days: 30, icon: Award, label: 'Um Mês', description: 'Você é um guerreiro' },
    { days: 60, icon: TrendingUp, label: 'Dois Meses', description: 'Você está transformando' },
  ];

  const unlockedMilestones = milestones.filter(m => stats.diaryDays >= m.days);
  const nextMilestone = milestones.find(m => stats.diaryDays < m.days);

  const averageMood = moodData.length > 0
    ? (moodData.reduce((sum, d) => sum + d.mood, 0) / moodData.length).toFixed(1)
    : '0';

  const moodTrend = moodData.length > 1
    ? moodData[moodData.length - 1].mood > moodData[0].mood
      ? 'positive'
      : 'negative'
    : 'neutral';

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <section className="pt-12 md:pt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Sua Jornada de Cura</h1>
              <p className="text-muted-foreground">Acompanhe seu progresso e celebre suas conquistas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-gradient-to-br from-blue-50 to-blue-50/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{stats.totalEntries}</p>
                <p className="text-sm text-muted-foreground mt-2">Entradas no Diário</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-green-50 to-green-50/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{stats.diaryDays}</p>
                <p className="text-sm text-muted-foreground mt-2">Dias Ativos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-purple-50 to-purple-50/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{stats.currentStreak}</p>
                <p className="text-sm text-muted-foreground mt-2">Sequência Atual</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-amber-50 to-amber-50/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">{averageMood}</p>
                <p className="text-sm text-muted-foreground mt-2">Humor Médio</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mood Chart */}
      {moodData.length > 0 && (
        <section className="mt-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Evolução do Seu Humor</CardTitle>
                <CardDescription>
                  Tendência {moodTrend === 'positive' ? '📈 Positiva' : moodTrend === 'negative' ? '📉 Negativa' : '➡️ Estável'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="date"
                      stroke="var(--muted-foreground)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      domain={[0, 5]}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => {
                        const moods = ['', 'Triste', 'Ansioso', 'Neutro', 'Esperancoso', 'Feliz'];
                        return moods[value as number] || 'Desconhecido';
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      dot={{ fill: 'var(--primary)', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Milestones */}
      <section className="mt-12 px-4 md:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Suas Conquistas</h2>

          {/* Unlocked Milestones */}
          {unlockedMilestones.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Desbloqueadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unlockedMilestones.map((milestone, idx) => {
                  const Icon = milestone.icon;
                  return (
                    <Card
                      key={idx}
                      className="border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{milestone.label}</p>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Next Milestone */}
          {nextMilestone && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Próxima Conquista</h3>
              <Card className="border-border/50 bg-gradient-to-br from-secondary to-secondary/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      {(() => {
                        const Icon = nextMilestone.icon;
                        return <Icon className="w-6 h-6 text-muted-foreground" />;
                      })()}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{nextMilestone.label}</p>
                      <p className="text-sm text-muted-foreground">{nextMilestone.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold text-foreground">
                        {stats.diaryDays} de {nextMilestone.days} dias
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((stats.diaryDays / nextMilestone.days) * 100).toFixed(0)}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* No milestones yet */}
          {unlockedMilestones.length === 0 && !nextMilestone && (
            <Card className="border-border/50 bg-gradient-to-br from-secondary to-secondary/50">
              <CardContent className="pt-12 pb-12 text-center">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Comece a registrar suas emoções para desbloquear conquistas!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Plus, Trash2, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Therapeutic Minimalism
 * - Generous spacing and breathing room
 * - Soft interactions with gentle animations
 * - Warm, welcoming color palette
 * - Focus on emotional expression
 */

interface DiaryEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  timestamp: number;
}

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newContent, setNewContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [isLoading, setIsLoading] = useState(false);

  const moods = [
    { id: 'sad', label: '😢 Triste', color: 'from-blue-100 to-blue-50' },
    { id: 'anxious', label: '😰 Ansioso', color: 'from-orange-100 to-orange-50' },
    { id: 'neutral', label: '😐 Neutro', color: 'from-gray-100 to-gray-50' },
    { id: 'hopeful', label: '🙂 Esperançoso', color: 'from-green-100 to-green-50' },
    { id: 'happy', label: '😊 Feliz', color: 'from-yellow-100 to-yellow-50' },
  ];

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('diaryEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (!newContent.trim()) {
      toast.error('Por favor, escreva algo no seu diário');
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      mood: selectedMood,
      content: newContent,
      timestamp: Date.now(),
    };

    setEntries([newEntry, ...entries]);
    setNewContent('');
    setSelectedMood('neutral');
    toast.success('Entrada salva com sucesso! 💫');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Entrada removida');
  };

  const getMoodLabel = (moodId: string) => {
    return moods.find(m => m.id === moodId)?.label || 'Neutro';
  };

  const getMoodColor = (moodId: string) => {
    return moods.find(m => m.id === moodId)?.color || 'from-gray-100 to-gray-50';
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <section className="pt-12 md:pt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Diário de Sentimentos</h1>
              <p className="text-muted-foreground">Expresse seus sentimentos e acompanhe sua jornada</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Entry Form */}
      <section className="mt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Nova Entrada</CardTitle>
              <CardDescription>Como você está se sentindo hoje?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Seu Sentimento Atual</label>
                <div className="grid grid-cols-5 gap-2">
                  {moods.map(mood => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-3 rounded-lg transition-all duration-300 text-sm font-medium border-2 ${
                        selectedMood === mood.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Area */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Seus Pensamentos</label>
                <Textarea
                  placeholder="Escreva livremente sobre seus sentimentos, pensamentos e reflexões. Não há julgamentos aqui..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="min-h-40 resize-none rounded-lg border-border focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">{newContent.length} caracteres</p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleAddEntry}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Salvar Entrada
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Entries List */}
      <section className="mt-12 px-4 md:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Suas Entradas ({entries.length})
            </h2>
            <p className="text-muted-foreground mt-1">
              {entries.length === 0 ? 'Comece a escrever seu primeiro diário' : 'Suas reflexões e sentimentos'}
            </p>
          </div>

          {entries.length === 0 ? (
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="pt-12 pb-12 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-primary/50 mx-auto" />
                <p className="text-muted-foreground">
                  Seu diário está vazio. Comece a escrever para processar seus sentimentos.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map(entry => (
                <Card
                  key={entry.id}
                  className={`border-border/50 overflow-hidden transition-all duration-300 hover:shadow-md bg-gradient-to-br ${getMoodColor(entry.mood)}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{entry.date}</span>
                          <span className="text-lg">{getMoodLabel(entry.mood)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, ChevronRight, ChevronLeft, Copy, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Therapeutic Minimalism
 * - Uplifting, positive visual language
 * - Large, readable typography
 * - Soft, encouraging interactions
 * - Focus on hope and renewal
 */

interface Affirmation {
  id: string;
  text: string;
  category: string;
  color: string;
}

export default function Affirmations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const affirmations: Affirmation[] = [
    {
      id: '1',
      text: 'Eu sou forte e capaz de superar qualquer desafio.',
      category: 'strength',
      color: 'from-red-100 to-red-50',
    },
    {
      id: '2',
      text: 'Meu valor não depende de ninguém. Eu sou suficiente.',
      category: 'self-worth',
      color: 'from-purple-100 to-purple-50',
    },
    {
      id: '3',
      text: 'Cada dia é uma nova oportunidade para crescer e me amar.',
      category: 'growth',
      color: 'from-green-100 to-green-50',
    },
    {
      id: '4',
      text: 'Eu mereço felicidade, amor e paz interior.',
      category: 'self-worth',
      color: 'from-pink-100 to-pink-50',
    },
    {
      id: '5',
      text: 'Meu coração está se curando e ficando mais forte a cada dia.',
      category: 'healing',
      color: 'from-blue-100 to-blue-50',
    },
    {
      id: '6',
      text: 'Eu escolho focar no que posso controlar e deixar ir o resto.',
      category: 'peace',
      color: 'from-teal-100 to-teal-50',
    },
    {
      id: '7',
      text: 'Minhas experiências me tornaram mais sábia e compassiva.',
      category: 'growth',
      color: 'from-amber-100 to-amber-50',
    },
    {
      id: '8',
      text: 'Eu sou digna de um amor que me respeita e valoriza.',
      category: 'self-worth',
      color: 'from-rose-100 to-rose-50',
    },
    {
      id: '9',
      text: 'A cura é um processo, e estou no caminho certo.',
      category: 'healing',
      color: 'from-cyan-100 to-cyan-50',
    },
    {
      id: '10',
      text: 'Eu sou resiliente e vou emergir desta situação mais forte.',
      category: 'strength',
      color: 'from-orange-100 to-orange-50',
    },
    {
      id: '11',
      text: 'Meu futuro é brilhante e cheio de possibilidades.',
      category: 'hope',
      color: 'from-indigo-100 to-indigo-50',
    },
    {
      id: '12',
      text: 'Eu libero o passado e abraço o presente com esperança.',
      category: 'peace',
      color: 'from-lime-100 to-lime-50',
    },
  ];

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'strength', label: 'Força' },
    { id: 'self-worth', label: 'Autovalor' },
    { id: 'healing', label: 'Cura' },
    { id: 'growth', label: 'Crescimento' },
    { id: 'hope', label: 'Esperança' },
    { id: 'peace', label: 'Paz' },
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favoriteAffirmations');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteAffirmations', JSON.stringify(favorites));
  }, [favorites]);

  const filteredAffirmations = selectedCategory === 'all'
    ? affirmations
    : affirmations.filter(a => a.category === selectedCategory);

  const currentAffirmation = filteredAffirmations[currentIndex % filteredAffirmations.length];
  const isFavorite = favorites.includes(currentAffirmation.id);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredAffirmations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredAffirmations.length - 1 : prev - 1
    );
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== currentAffirmation.id));
      toast.success('Removido dos favoritos');
    } else {
      setFavorites([...favorites, currentAffirmation.id]);
      toast.success('Adicionado aos favoritos!');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentAffirmation.text);
    toast.success('Copiado para a área de transferência!');
  };

  const shareAffirmation = () => {
    const text = `"${currentAffirmation.text}" - Cura Coração`;
    if (navigator.share) {
      navigator.share({
        title: 'Afirmação Positiva',
        text: text,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <section className="pt-12 md:pt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Afirmações Positivas</h1>
              <p className="text-muted-foreground">Mensagens inspiradoras para fortalecer sua jornada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mt-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:border-primary/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Affirmation Card */}
      <section className="mt-12 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <Card
            className={`border-border/50 overflow-hidden shadow-lg bg-gradient-to-br ${currentAffirmation.color}`}
          >
            <CardContent className="pt-16 pb-16 px-8 space-y-8">
              {/* Affirmation Text */}
              <div className="text-center space-y-4">
                <Sparkles className="w-8 h-8 text-primary mx-auto" />
                <p className="text-3xl md:text-4xl font-bold text-foreground leading-relaxed">
                  {currentAffirmation.text}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isFavorite
                      ? 'bg-red-100 text-red-600'
                      : 'bg-card border border-border hover:bg-secondary'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-3 rounded-lg bg-card border border-border hover:bg-secondary transition-all duration-300"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={shareAffirmation}
                  className="p-3 rounded-lg bg-card border border-border hover:bg-secondary transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-lg bg-card border border-border hover:bg-secondary transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-muted-foreground font-medium">
                  {currentIndex + 1} de {filteredAffirmations.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-lg bg-card border border-border hover:bg-secondary transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <section className="mt-16 px-4 md:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Seus Favoritos ({favorites.length})</h2>
            <div className="space-y-3">
              {affirmations
                .filter(a => favorites.includes(a.id))
                .map(affirmation => (
                  <Card key={affirmation.id} className="border-border/50 bg-gradient-to-br from-red-50 to-red-50/50">
                    <CardContent className="pt-4 pb-4">
                      <p className="text-foreground">{affirmation.text}</p>
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

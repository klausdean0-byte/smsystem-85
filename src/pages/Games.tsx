import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Play, 
  Star,
  Timer,
  Target,
  Brain,
  Zap
} from "lucide-react";

const games = [
  {
    id: 1,
    title: "Math Quiz Challenge",
    description: "Test your mathematical skills with this engaging quiz game",
    category: "Educational",
    difficulty: "Medium",
    players: "1-4",
    duration: "15 min",
    rating: 4.5,
    icon: Brain,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Word Puzzle Master",
    description: "Solve word puzzles and expand your vocabulary",
    category: "Language",
    difficulty: "Easy",
    players: "1-2",
    duration: "10 min",
    rating: 4.8,
    icon: Target,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Science Trivia",
    description: "Explore the wonders of science through fun trivia",
    category: "Science",
    difficulty: "Hard",
    players: "1-6",
    duration: "20 min",
    rating: 4.6,
    icon: Zap,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Speed Memory",
    description: "Challenge your memory with this fast-paced game",
    category: "Memory",
    difficulty: "Medium",
    players: "1",
    duration: "5 min",
    rating: 4.3,
    icon: Timer,
    color: "bg-orange-500"
  }
];

const categories = ["All", "Educational", "Language", "Science", "Memory"];

export default function Games() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const filteredGames = selectedCategory === "All" 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Gamepad2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Educational Games</h1>
          <p className="text-muted-foreground">Learn while having fun with our interactive games</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Gamepad2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Total Games</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Trophy className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Games Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8.7</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => {
          const IconComponent = game.icon;
          return (
            <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${game.color} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{game.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{game.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{game.players} players</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span>{game.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{game.rating}/5</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedGame(game.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Now
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trophy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Game Modal Placeholder */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Starting Game...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Game functionality will be implemented here. This is a preview of the games interface.
              </p>
              <Button 
                onClick={() => setSelectedGame(null)}
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
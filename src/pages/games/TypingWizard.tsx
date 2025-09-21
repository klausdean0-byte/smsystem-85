import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  Play, 
  RotateCcw, 
  Trophy, 
  Clock, 
  Target,
  Zap,
  Star,
  ArrowLeft,
  Volume2,
  VolumeX
} from "lucide-react";
import { toast } from "sonner";

// Sample sentences for different levels
const sentences = {
  easy: [
    "The cat sat on the mat.",
    "I like to play games.",
    "The sun is bright today.",
    "We can learn new things.",
    "Books are fun to read."
  ],
  medium: [
    "Learning to type quickly takes practice.",
    "The wizard cast a magical spell on the keyboard.",
    "Children love playing educational games online.",
    "Practice makes perfect when learning new skills.",
    "Typing games help improve finger coordination."
  ],
  hard: [
    "The magnificent wizard demonstrated extraordinary typing abilities.",
    "Proficient typists can achieve remarkable speeds with consistent practice.",
    "Advanced typing techniques require dedication and systematic training.",
    "Exceptional keyboard skills develop through persistent daily exercises.",
    "Mastering touch typing transforms written communication efficiency."
  ]
};

type GameState = 'menu' | 'instructions' | 'playing' | 'results';
type Difficulty = 'easy' | 'medium' | 'hard';

export default function TypingWizard() {
  const { userRole, userName, photoUrl, signOut } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Game state
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentSentence, setCurrentSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && startTime && !isComplete) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, startTime, isComplete]);

  // Sound effects
  const playSound = useCallback((frequency: number, duration: number = 100) => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration / 1000);
    } catch (error) {
      // Fallback: no sound
    }
  }, [soundEnabled]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.info("You have been logged out");
      navigate("/login");
    } catch (error: any) {
      toast.error("Failed to log out");
    }
  };

  const startGame = () => {
    const sentencesList = sentences[difficulty];
    const randomSentence = sentencesList[Math.floor(Math.random() * sentencesList.length)];
    setCurrentSentence(randomSentence);
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setIsComplete(false);
    setStartTime(Date.now());
    setEndTime(null);
    setTimeElapsed(0);
    setGameState('playing');
    
    // Focus input after a short delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const resetGame = () => {
    setGameState('menu');
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setIsComplete(false);
    setStartTime(null);
    setEndTime(null);
    setTimeElapsed(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentChar = currentSentence[currentIndex];
    const inputChar = value[currentIndex];

    if (value.length > currentSentence.length) return;

    setUserInput(value);

    if (inputChar !== undefined) {
      if (inputChar === currentChar) {
        // Correct character
        playSound(800, 50);
        setCurrentIndex(currentIndex + 1);
        
        // Check if sentence is complete
        if (value === currentSentence) {
          setIsComplete(true);
          setEndTime(Date.now());
          setGameState('results');
          playSound(1000, 200); // Success sound
          toast.success("🎉 Congratulations! You completed the sentence!");
        }
      } else {
        // Incorrect character
        playSound(200, 150);
        setErrors(errors + 1);
      }
    }
  };

  const calculateResults = () => {
    if (!startTime || !endTime) return { wpm: 0, accuracy: 0, grade: 'F' };
    
    const timeInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = currentSentence.split(' ').length;
    const wpm = Math.round(wordsTyped / timeInMinutes);
    const accuracy = Math.round(((currentSentence.length - errors) / currentSentence.length) * 100);
    
    let grade = 'F';
    if (accuracy >= 95 && wpm >= 40) grade = 'A+';
    else if (accuracy >= 90 && wpm >= 35) grade = 'A';
    else if (accuracy >= 85 && wpm >= 30) grade = 'B';
    else if (accuracy >= 80 && wpm >= 25) grade = 'C';
    else if (accuracy >= 70 && wpm >= 20) grade = 'D';
    
    return { wpm, accuracy, grade };
  };

  const renderCharacter = (char: string, index: number) => {
    let className = "text-lg font-mono ";
    
    if (index < userInput.length) {
      if (userInput[index] === char) {
        className += "text-green-600 bg-green-100 dark:bg-green-900/30";
      } else {
        className += "text-red-600 bg-red-100 dark:bg-red-900/30";
      }
    } else if (index === currentIndex) {
      className += "bg-primary/20 animate-pulse";
    } else {
      className += "text-muted-foreground";
    }
    
    return (
      <span key={index} className={className}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  };

  return (
    <DashboardLayout userRole={userRole || "student"} userName={userName} photoUrl={photoUrl} onLogout={handleLogout}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/games')}
              className="hover-scale"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Typing Wizard</h1>
                <p className="text-muted-foreground">Master the magical art of typing!</p>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="hover-scale"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>

        {/* Game Menu */}
        {gameState === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Select Difficulty
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {[
                    { level: 'easy', label: 'Beginner', desc: 'Simple words and short sentences' },
                    { level: 'medium', label: 'Intermediate', desc: 'Longer sentences with common words' },
                    { level: 'hard', label: 'Advanced', desc: 'Complex sentences and vocabulary' }
                  ].map(({ level, label, desc }) => (
                    <Button
                      key={level}
                      variant={difficulty === level ? "default" : "outline"}
                      className="h-auto p-4 text-left justify-start"
                      onClick={() => setDifficulty(level as Difficulty)}
                    >
                      <div>
                        <div className="font-semibold">{label}</div>
                        <div className="text-sm text-muted-foreground">{desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => setGameState('instructions')} className="flex-1 hover-scale">
                    How to Play
                  </Button>
                  <Button onClick={startGame} className="flex-1 hover-scale">
                    <Play className="h-4 w-4 mr-2" />
                    Start Game
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Game Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sound Effects</h4>
                      <p className="text-sm text-muted-foreground">Fun typing sounds for correct and incorrect keys</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Real-time Feedback</h4>
                      <p className="text-sm text-muted-foreground">Instant visual feedback as you type</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Trophy className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Performance Tracking</h4>
                      <p className="text-sm text-muted-foreground">Track your WPM, accuracy, and grade</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions */}
        {gameState === 'instructions' && (
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                How to Play Typing Wizard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Game Rules:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-blue-500/10 text-blue-600">1</Badge>
                      <p className="text-sm">Type the sentence exactly as shown on screen</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="bg-green-500/10 text-green-600">2</Badge>
                      <p className="text-sm">Green highlights show correct letters</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="bg-red-500/10 text-red-600">3</Badge>
                      <p className="text-sm">Red highlights show mistakes</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="bg-purple-500/10 text-purple-600">4</Badge>
                      <p className="text-sm">Complete the sentence to see your results</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Grading System:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">A+ Grade:</span>
                      <span className="text-sm font-semibold">95%+ accuracy, 40+ WPM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">A Grade:</span>
                      <span className="text-sm font-semibold">90%+ accuracy, 35+ WPM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">B Grade:</span>
                      <span className="text-sm font-semibold">85%+ accuracy, 30+ WPM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">C Grade:</span>
                      <span className="text-sm font-semibold">80%+ accuracy, 25+ WPM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setGameState('menu')} className="hover-scale">
                  Back to Menu
                </Button>
                <Button onClick={startGame} className="flex-1 hover-scale">
                  <Play className="h-4 w-4 mr-2" />
                  Start Playing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Playing */}
        {gameState === 'playing' && (
          <div className="space-y-6">
            {/* Game Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="text-lg font-bold">{timeElapsed}s</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="text-lg font-bold">{Math.round((currentIndex / currentSentence.length) * 100)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Errors</p>
                      <p className="text-lg font-bold">{errors}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Difficulty</p>
                      <p className="text-lg font-bold capitalize">{difficulty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardContent className="p-6">
                <Progress value={(currentIndex / currentSentence.length) * 100} className="mb-4" />
                <p className="text-center text-sm text-muted-foreground">
                  {currentIndex} of {currentSentence.length} characters typed
                </p>
              </CardContent>
            </Card>

            {/* Typing Area */}
            <Card>
              <CardHeader>
                <CardTitle>Type the sentence below:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center leading-relaxed">
                    {currentSentence.split('').map((char, index) => renderCharacter(char, index))}
                  </div>
                </div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-full p-4 text-lg font-mono bg-background border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Start typing here..."
                  disabled={isComplete}
                />
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetGame} className="hover-scale">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {gameState === 'results' && (
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Typing Wizard Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-white text-2xl font-bold mb-4">
                  {calculateResults().grade}
                </div>
                <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                <p className="text-muted-foreground">You've completed the typing challenge!</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{calculateResults().wpm}</p>
                    <p className="text-sm text-muted-foreground">Words Per Minute</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{calculateResults().accuracy}%</p>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{timeElapsed}s</p>
                    <p className="text-sm text-muted-foreground">Time Taken</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={startGame} className="flex-1 hover-scale">
                  <Play className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                <Button variant="outline" onClick={resetGame} className="hover-scale">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Main Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
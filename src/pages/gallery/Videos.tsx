import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Heart, Share2, Clock } from "lucide-react";
import { useState } from "react";

const Videos = () => {
  const { userRole, userName, photoUrl, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleLogout = async () => {
    try {
      await signOut();
      toast.info("You have been logged out");
      navigate("/login");
    } catch (error: any) {
      toast.error("Failed to log out");
    }
  };

  const categories = [
    { id: "all", name: "All Videos" },
    { id: "events", name: "School Events" },
    { id: "sports", name: "Sports" },
    { id: "performances", name: "Performances" },
    { id: "tutorials", name: "Educational" },
  ];

  // Placeholder videos data
  const videos = [
    { id: 1, title: "Annual Day Performance", category: "performances", duration: "12:35", likes: 45, views: 234 },
    { id: 2, title: "Football Final Match", category: "sports", duration: "25:40", likes: 33, views: 187 },
    { id: 3, title: "Science Experiment Demo", category: "tutorials", duration: "8:15", likes: 28, views: 156 },
    { id: 4, title: "Cultural Festival Highlights", category: "events", duration: "15:20", likes: 52, views: 298 },
    { id: 5, title: "Math Problem Solving", category: "tutorials", duration: "6:45", likes: 19, views: 89 },
    { id: 6, title: "School Choir Concert", category: "performances", duration: "18:30", likes: 41, views: 203 },
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <DashboardLayout userRole={userRole || "student"} userName={userName} photoUrl={photoUrl} onLogout={handleLogout}>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/gallery")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Video Gallery</h1>
              <p className="text-muted-foreground">Watch exciting moments from our school</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <Card key={video.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-0 relative">
                {/* Video Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground px-4">Video thumbnail</p>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold truncate mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="capitalize">{video.category}</span>
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Heart className="h-4 w-4 mr-1" />
                        {video.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No videos found in this category.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Videos;
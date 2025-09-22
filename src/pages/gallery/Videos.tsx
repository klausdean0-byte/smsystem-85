import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Heart, Share2, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { VideoViewer } from "@/components/gallery/VideoViewer";

const Videos = () => {
  const { userRole, userName, photoUrl, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const videosPerPage = 20;

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

  // Generate sample videos data (thousands of videos)
  const videos = useMemo(() => {
    const sampleVideos = [];
    for (let i = 1; i <= 1500; i++) {
      const categories = ["events", "sports", "performances", "tutorials"];
      const titles = [
        "Annual Day Performance", "Football Final Match", "Science Experiment Demo", 
        "Cultural Festival Highlights", "Math Problem Solving", "School Choir Concert",
        "Drama Performance", "Basketball Game", "Art Workshop", "Music Recital"
      ];
      const durations = ["3:45", "8:12", "12:30", "6:15", "15:40", "9:25", "18:30", "5:55"];
      sampleVideos.push({
        id: i,
        title: `${titles[Math.floor(Math.random() * titles.length)]} ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        duration: durations[Math.floor(Math.random() * durations.length)],
        likes: Math.floor(Math.random() * 100) + 1,
        views: Math.floor(Math.random() * 500) + 50
      });
    }
    return sampleVideos;
  }, []);

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  const handleVideoClick = (videoIndex: number) => {
    setSelectedVideoIndex(startIndex + videoIndex);
    setIsViewerOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

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
              <p className="text-muted-foreground">Watch exciting moments from our school ({filteredVideos.length} videos)</p>
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
              onClick={() => handleCategoryChange(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video, index) => (
            <Card 
              key={video.id} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer" 
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleVideoClick(index)}
            >
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
                  <Button size="lg" className="rounded-full w-16 h-16" onClick={(e) => e.stopPropagation()}>
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
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={(e) => e.stopPropagation()}>
                        <Heart className="h-4 w-4 mr-1" />
                        {video.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={(e) => e.stopPropagation()}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {currentVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No videos found in this category.</p>
          </div>
        )}

        {/* Video Viewer */}
        <VideoViewer
          videos={filteredVideos}
          selectedVideoIndex={selectedVideoIndex}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Videos;
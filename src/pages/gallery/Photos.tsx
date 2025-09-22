import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Heart, Share2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PhotoViewer } from "@/components/gallery/PhotoViewer";

const Photos = () => {
  const { userRole, userName, photoUrl, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const photosPerPage = 20;

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
    { id: "all", name: "All Photos" },
    { id: "events", name: "School Events" },
    { id: "sports", name: "Sports" },
    { id: "academics", name: "Academic Activities" },
    { id: "celebrations", name: "Celebrations" },
  ];

  // Generate sample photos data (thousands of photos)
  const photos = useMemo(() => {
    const samplePhotos = [];
    for (let i = 1; i <= 2000; i++) {
      const categories = ["events", "sports", "academics", "celebrations"];
      const titles = [
        "Science Fair", "Football Championship", "Math Olympiad", "Cultural Day", 
        "Art Exhibition", "Basketball Tournament", "Drama Performance", "Music Concert",
        "Field Trip", "Graduation Day", "Awards Ceremony", "Sports Day"
      ];
      samplePhotos.push({
        id: i,
        title: `${titles[Math.floor(Math.random() * titles.length)]} ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        likes: Math.floor(Math.random() * 50) + 1
      });
    }
    return samplePhotos;
  }, []);

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;
  const currentPhotos = filteredPhotos.slice(startIndex, endIndex);

  const handlePhotoClick = (photoIndex: number) => {
    setSelectedPhotoIndex(startIndex + photoIndex);
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
              <h1 className="text-3xl font-bold text-primary">Photo Gallery</h1>
              <p className="text-muted-foreground">Browse and enjoy our school memories ({filteredPhotos.length} photos)</p>
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

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPhotos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer" 
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handlePhotoClick(index)}
            >
              <CardContent className="p-0 relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{photo.id}</span>
                    </div>
                    <p className="text-sm text-muted-foreground px-4">Photo placeholder</p>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={(e) => e.stopPropagation()}>
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={(e) => e.stopPropagation()}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={(e) => e.stopPropagation()}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Photo Info */}
                <div className="p-4">
                  <h3 className="font-semibold truncate">{photo.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground capitalize">{photo.category}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      {photo.likes}
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

        {currentPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No photos found in this category.</p>
          </div>
        )}

        {/* Photo Viewer */}
        <PhotoViewer
          photos={filteredPhotos}
          selectedPhotoIndex={selectedPhotoIndex}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Photos;
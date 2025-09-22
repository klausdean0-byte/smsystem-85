import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Heart, Share2 } from "lucide-react";
import { useState } from "react";

const Photos = () => {
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
    { id: "all", name: "All Photos" },
    { id: "events", name: "School Events" },
    { id: "sports", name: "Sports" },
    { id: "academics", name: "Academic Activities" },
    { id: "celebrations", name: "Celebrations" },
  ];

  // Placeholder photos data
  const photos = [
    { id: 1, title: "Science Fair 2024", category: "events", likes: 24 },
    { id: 2, title: "Football Championship", category: "sports", likes: 18 },
    { id: 3, title: "Math Olympiad", category: "academics", likes: 15 },
    { id: 4, title: "Cultural Day", category: "celebrations", likes: 32 },
    { id: 5, title: "Art Exhibition", category: "events", likes: 21 },
    { id: 6, title: "Basketball Tournament", category: "sports", likes: 27 },
  ];

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

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
              <p className="text-muted-foreground">Browse and enjoy our school memories</p>
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

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <Card key={photo.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
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
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full">
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

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No photos found in this category.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Photos;
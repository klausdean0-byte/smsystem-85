import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";

const Gallery = () => {
  const { userRole, userName, photoUrl, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.info("You have been logged out");
      navigate("/login");
    } catch (error: any) {
      toast.error("Failed to log out");
    }
  };

  return (
    <DashboardLayout userRole={userRole || "student"} userName={userName} photoUrl={photoUrl} onLogout={handleLogout}>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary animate-slide-in-left">
            School Gallery
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-in-right">
            Explore our collection of photos and videos from school events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedCard hoverAnimation="zoom" delay={0}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Photo Gallery</CardTitle>
              <CardDescription className="text-base">
                Browse through beautiful photos from school events, activities, and memorable moments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/gallery/photos")} 
                className="w-full h-12 text-lg"
                size="lg"
              >
                View Photos
              </Button>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard hoverAnimation="zoom" delay={200}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-secondary/60 rounded-full flex items-center justify-center mb-4">
                <Video className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Video Gallery</CardTitle>
              <CardDescription className="text-base">
                Watch exciting videos from school performances, sports events, and special occasions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/gallery/videos")} 
                className="w-full h-12 text-lg"
                size="lg"
                variant="secondary"
              >
                Watch Videos
              </Button>
            </CardContent>
          </AnimatedCard>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="px-8 py-2"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Gallery;
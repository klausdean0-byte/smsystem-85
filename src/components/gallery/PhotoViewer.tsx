import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Download, Heart, Share2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";

interface Photo {
  id: number;
  title: string;
  category: string;
  likes: number;
  url?: string;
}

interface PhotoViewerProps {
  photos: Photo[];
  selectedPhotoIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoViewer({ photos, selectedPhotoIndex, isOpen, onClose }: PhotoViewerProps) {
  const [api, setApi] = useState<CarouselApi>();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowLeft") {
      api?.scrollPrev();
    } else if (e.key === "ArrowRight") {
      api?.scrollNext();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold">{photos[selectedPhotoIndex]?.title}</h3>
                <p className="text-sm text-white/70 capitalize">{photos[selectedPhotoIndex]?.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-[95vh]">
              {photos.map((photo, index) => (
                <CarouselItem key={photo.id} className="flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="max-w-full max-h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center aspect-square min-h-[300px]">
                      <div className="text-center space-y-4 text-white">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto flex items-center justify-center">
                          <span className="text-white font-bold text-2xl">{photo.id}</span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{photo.title}</p>
                          <p className="text-sm opacity-70">High resolution photo placeholder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-white/20 hover:bg-white/20" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-white/20 hover:bg-white/20" />
          </Carousel>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4">
            <div className="flex items-center justify-center text-white">
              <span className="text-sm">
                {selectedPhotoIndex + 1} of {photos.length}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
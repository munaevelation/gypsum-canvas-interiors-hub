import { useState, useRef } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  X,
  MoveHorizontal,
  Upload,
  Video,
  Save,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateProductGallery, getProductGalleryImages } from "@/services/dataService";

interface ProductGalleryProps {
  productId: string;
}

const ProductGallery = ({ productId }: ProductGalleryProps) => {
  const [galleryImages, setGalleryImages] = useState<string[]>(
    getProductGalleryImages(productId) || []
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 10MB");
      return;
    }
    
    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setGalleryImages(prevImages => [...prevImages, result]);
      toast.success("Image added to gallery");
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Check file size (max 100MB for videos)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video is too large. Maximum size is 100MB");
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('video/')) {
      toast.error("Please upload a valid video file");
      return;
    }
    
    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setGalleryImages(prevImages => [...prevImages, result]);
      toast.success("Video added to gallery");
      
      // Reset input
      if (videoInputRef.current) videoInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedGallery = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedGallery);
    toast.success("Item removed from gallery");
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(galleryImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setGalleryImages(items);
  };
  
  const handleUpdateGallery = () => {
    if (!productId) {
      toast.error("No product selected");
      return;
    }

    if (galleryImages.length === 0) {
      toast.error("Please add at least one image to the gallery");
      return;
    }

    setIsUpdating(true);
    try {
      updateProductGallery(productId, galleryImages);
      toast.success("Gallery updated successfully");
    } catch (error) {
      console.error("Gallery update error:", error);
      if (error instanceof Error) {
        if (error.message.includes('Storage quota exceeded')) {
          toast.error("Storage limit reached. Please try with fewer images.");
        } else if (error.message.includes('localStorage is not available')) {
          toast.error("Browser storage is not available. Please check your browser settings.");
        } else {
          toast.error("Failed to update gallery. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };
  
  const isVideo = (src: string) => {
    if (src.startsWith('data:video/')) return true;
    return false;
  };
  
  return (
    <Card className="border-black/20 shadow-md bg-white">
      <CardHeader className="bg-black/5 border-b border-black/20">
        <CardTitle className="text-black">Product Gallery</CardTitle>
        <CardDescription>
          Manage additional images and videos for this product. Add up to 6 media items for the product carousel.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              {/* Image Upload Button */}
              <div className="flex-1">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-white hover:opacity-90 transition-all duration-300 w-full"
                  disabled={galleryImages.length >= 6}
                >
                  <ImageIcon className="h-4 w-4 mr-2" /> Upload Image
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              
              {/* Video Upload Button */}
              <div className="flex-1">
                <Button 
                  onClick={() => videoInputRef.current?.click()}
                  className="bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-white hover:opacity-90 transition-all duration-300 w-full"
                  disabled={galleryImages.length >= 6}
                >
                  <Video className="h-4 w-4 mr-2" /> Upload Video
                </Button>
                <input 
                  type="file" 
                  ref={videoInputRef}
                  onChange={handleVideoUpload}
                  className="hidden"
                  accept="video/*"
                />
              </div>
            </div>
            
            {galleryImages.length >= 6 && (
              <p className="text-xs text-red-500 mt-1">
                Maximum of 6 media items allowed
              </p>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <MoveHorizontal className="h-4 w-4 mr-2 text-gray-500" />
              Gallery Items (Drag to reorder)
            </h3>
            
            {galleryImages.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-md p-6 text-center">
                <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No gallery items added yet</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="gallery-images">
                  {(provided) => (
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {galleryImages.map((media, index) => (
                        <Draggable key={`${index}-item`} draggableId={`${index}-item`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-2"
                            >
                              <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-3">
                                {isVideo(media) ? (
                                  <div className="relative h-full w-full bg-gray-800">
                                    <video 
                                      className="h-full w-full object-cover"
                                      muted
                                      loop
                                      playsInline
                                    >
                                      <source src={media} type="video/mp4" />
                                      Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Video className="h-6 w-6 text-white/80" />
                                    </div>
                                  </div>
                                ) : (
                                  <img 
                                    src={media} 
                                    alt={`Gallery item ${index + 1}`}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Error";
                                    }}
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-black">
                                  {isVideo(media) ? 'Video' : 'Image'} {index + 1}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveImage(index)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-black/20 bg-black/5 py-3 px-6 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          {galleryImages.length} of 6 media items used
        </p>
        <Button 
          onClick={handleUpdateGallery} 
          className="bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-white hover:opacity-90 transition-all duration-300"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Updating...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" /> Update Gallery
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductGallery;

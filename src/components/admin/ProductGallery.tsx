
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
  Video
} from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateProductGallery, getProductGalleryImages } from "@/services/dataService";

interface ProductGalleryProps {
  productId: number;
}

const ProductGallery = ({ productId }: ProductGalleryProps) => {
  const [galleryImages, setGalleryImages] = useState<string[]>(
    getProductGalleryImages(productId) || []
  );
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
      const updatedGallery = [...galleryImages, result];
      setGalleryImages(updatedGallery);
      updateProductGallery(productId, updatedGallery);
      toast.success("Image added to gallery");
    };
    reader.readAsDataURL(file);
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Check file size (max 50MB for videos)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video is too large. Maximum size is 50MB");
      return;
    }
    
    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const updatedGallery = [...galleryImages, result];
      setGalleryImages(updatedGallery);
      updateProductGallery(productId, updatedGallery);
      toast.success("Video added to gallery");
    };
    reader.readAsDataURL(file);
    
    // Reset input
    if (videoInputRef.current) videoInputRef.current.value = '';
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedGallery = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedGallery);
    updateProductGallery(productId, updatedGallery);
    toast.success("Item removed from gallery");
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(galleryImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setGalleryImages(items);
    updateProductGallery(productId, items);
  };
  
  const isVideo = (src: string) => {
    if (src.startsWith('data:video/')) return true;
    return false;
  };
  
  return (
    <Card className="border-black/20 shadow-md bg-white">
      <CardHeader className="bg-black/5 border-b border-black/20">
        <CardTitle className="text-black">Product Gallery Images</CardTitle>
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
                  className="bg-black hover:bg-black/80 text-white w-full"
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
                  className="bg-black hover:bg-black/80 text-white w-full"
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
                                  <video 
                                    className="h-full w-full object-cover"
                                    muted
                                  >
                                    <source src={media} />
                                    Your browser does not support the video tag.
                                  </video>
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
                              <div className="flex-grow">
                                <p className="text-sm text-gray-600">
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
      
      <CardFooter className="border-t border-black/20 bg-black/5 py-3 px-6 flex justify-between">
        <p className="text-xs text-gray-500">
          {galleryImages.length} of 6 media items used
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductGallery;

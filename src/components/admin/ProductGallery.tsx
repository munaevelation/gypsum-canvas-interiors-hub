
import { useState } from "react";
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
  MoveHorizontal
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
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  
  const handleAddImage = () => {
    if (!newImageUrl) {
      toast.error("Please enter an image URL");
      return;
    }
    
    // Basic URL validation
    try {
      new URL(newImageUrl);
    } catch (e) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    const updatedGallery = [...galleryImages, newImageUrl];
    setGalleryImages(updatedGallery);
    updateProductGallery(productId, updatedGallery);
    setNewImageUrl("");
    toast.success("Image added to gallery");
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedGallery = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedGallery);
    updateProductGallery(productId, updatedGallery);
    toast.success("Image removed from gallery");
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(galleryImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setGalleryImages(items);
    updateProductGallery(productId, items);
  };
  
  return (
    <Card className="border-black/20 shadow-md bg-white">
      <CardHeader className="bg-black/5 border-b border-black/20">
        <CardTitle className="text-black">Product Gallery Images</CardTitle>
        <CardDescription>
          Manage additional images for this product. Add up to 6 images for the product carousel.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="imageUrl" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-black" />
              Add Image URL
            </Label>
            <div className="flex gap-2">
              <Input 
                id="imageUrl" 
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="border-black/30 focus-visible:ring-black"
              />
              <Button 
                onClick={handleAddImage}
                className="bg-black hover:bg-black/80 text-white"
                disabled={galleryImages.length >= 6}
              >
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
            {galleryImages.length >= 6 && (
              <p className="text-xs text-red-500 mt-1">
                Maximum of 6 images allowed
              </p>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <MoveHorizontal className="h-4 w-4 mr-2 text-gray-500" />
              Gallery Images (Drag to reorder)
            </h3>
            
            {galleryImages.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-md p-6 text-center">
                <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No gallery images added yet</p>
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
                      {galleryImages.map((image, index) => (
                        <Draggable key={`${image}-${index}`} draggableId={`${image}-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-2"
                            >
                              <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-3">
                                <img 
                                  src={image} 
                                  alt={`Gallery image ${index + 1}`}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Error";
                                  }}
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="text-sm text-gray-600 truncate max-w-xs">{image}</p>
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
          {galleryImages.length} of 6 images used
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductGallery;

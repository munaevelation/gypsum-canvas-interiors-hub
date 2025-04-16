import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Save, X, MoveUp, MoveDown } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { 
  fetchCarouselImages,
  createCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
  updateCarouselImageOrder
} from "@/services/carousel/carouselService";
import { CarouselImage } from "@/services/dataService";
import { getCategoryNames } from "@/services/dataService";

const CarouselManagement = () => {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  
  const [newImage, setNewImage] = useState<Omit<CarouselImage, "id">>({
    image: "",
    title: "",
    subtitle: "",
    buttonText: "Shop Now",
    buttonLink: "/?category=Ceiling Cornices"
  });
  
  // Load images and categories on component mount
  useEffect(() => {
    loadImages();
    loadCategories();
  }, []);
  
  const loadImages = async () => {
    const imageData = await fetchCarouselImages();
    setCarouselImages(imageData);
  };

  const loadCategories = () => {
    const categoryNames = getCategoryNames();
    setCategories(categoryNames);
  };
  
  const handleAddImage = () => {
    setIsAdding(true);
    setNewImage({
      image: "",
      title: "",
      subtitle: "",
      buttonText: "Shop Now",
      buttonLink: "/?category=Ceiling Cornices"
    });
  };
  
  const handleSaveImage = async () => {
    // Basic validation
    if (!newImage.image) {
      toast.error("Please upload an image");
      return;
    }
    
    const result = await createCarouselImage(newImage);
    if (result) {
      await loadImages(); // Reload the images list
      setIsAdding(false);
      toast.success("Carousel image saved successfully!");
    }
  };
  
  const handleEditImage = (id: string) => {
    setEditingImage(id);
    const imageToEdit = carouselImages.find(c => c.id === id);
    if (imageToEdit) {
      setNewImage({
        image: imageToEdit.image,
        title: imageToEdit.title,
        subtitle: imageToEdit.subtitle,
        buttonText: imageToEdit.buttonText,
        buttonLink: imageToEdit.buttonLink,
        displayOrder: imageToEdit.displayOrder
      });
    }
  };
  
  const handleUpdateImage = async () => {
    // Basic validation
    if (!newImage.image) {
      toast.error("Please upload an image");
      return;
    }
    
    if (editingImage !== null) {
      const result = await updateCarouselImage(editingImage, newImage);
      if (result) {
        await loadImages(); // Reload the images list
        setEditingImage(null);
        toast.success("Carousel image updated successfully!");
      }
    }
  };
  
  const handleDeleteImage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      const result = await deleteCarouselImage(id);
      if (result) {
        await loadImages(); // Reload the images list
        toast.success("Carousel image deleted successfully!");
      }
    }
  };
  
  const handleMoveUp = async (id: string, currentOrder: number) => {
    const result = await updateCarouselImageOrder(id, currentOrder - 1);
    if (result) {
      await loadImages();
      toast.success("Image moved up");
    }
  };
  
  const handleMoveDown = async (id: string, currentOrder: number) => {
    const result = await updateCarouselImageOrder(id, currentOrder + 1);
    if (result) {
      await loadImages();
      toast.success("Image moved down");
    }
  };
  
  const handleCancelEdit = () => {
    setEditingImage(null);
    setIsAdding(false);
  };

  const handleCategoryChange = (category: string) => {
    setNewImage({
      ...newImage,
      buttonLink: `/?category=${encodeURIComponent(category)}`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Carousel Management</h2>
        <Button 
          onClick={handleAddImage} 
          disabled={isAdding || editingImage !== null}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Carousel Image
        </Button>
      </div>
      
      {/* Add/Edit Image Form */}
      {(isAdding || editingImage !== null) && (
        <Card className="border-gray-200 shadow-lg bg-white">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-black">{isAdding ? "Add New Carousel Image" : "Edit Carousel Image"}</CardTitle>
            <CardDescription>
              Upload an image and enter the details for the carousel slide.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <ImageUpload 
                  value={newImage.image}
                  onChange={(value) => setNewImage({...newImage, image: value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title" className="font-medium text-gray-700">Title</Label>
                <Input 
                  id="title" 
                  value={newImage.title}
                  onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                  placeholder="e.g. New Collection"
                  className="border-gray-300 focus-visible:ring-black"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle" className="font-medium text-gray-700">Subtitle</Label>
                <Textarea 
                  id="subtitle" 
                  value={newImage.subtitle}
                  onChange={(e) => setNewImage({...newImage, subtitle: e.target.value})}
                  placeholder="Enter a short description..."
                  className="border-gray-300 focus-visible:ring-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonText" className="font-medium text-gray-700">Button Text</Label>
                <Input 
                  id="buttonText" 
                  value={newImage.buttonText}
                  onChange={(e) => setNewImage({...newImage, buttonText: e.target.value})}
                  placeholder="e.g. Shop Now"
                  className="border-gray-300 focus-visible:ring-black"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium text-gray-700">Category Link</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        value={category}
                        checked={newImage.buttonLink === `/?category=${encodeURIComponent(category)}`}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                      />
                      <Label htmlFor={`category-${category}`} className="text-gray-700">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-200 py-4">
            <Button variant="outline" onClick={handleCancelEdit} className="border-gray-300">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button 
              onClick={isAdding ? handleSaveImage : handleUpdateImage}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Save className="mr-2 h-4 w-4" /> {isAdding ? "Save Image" : "Update Image"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Images Table */}
      <Card className="border-gray-200 shadow-lg bg-white">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-black">Carousel Images</CardTitle>
          <CardDescription>
            Manage your carousel images here. The order determines the display sequence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px]">Order</TableHead>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Subtitle</TableHead>
                <TableHead className="hidden md:table-cell">Button</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carouselImages.map((image, index) => (
                <TableRow key={image.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleMoveUp(image.id, image.displayOrder)}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleMoveDown(image.id, image.displayOrder)}
                        disabled={index === carouselImages.length - 1}
                        className="h-8 w-8 p-0"
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-16 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                      {image.image ? (
                        <img 
                          src={image.image} 
                          alt={image.title || 'Carousel image'} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          ?
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{image.title || '-'}</TableCell>
                  <TableCell className="hidden md:table-cell">{image.subtitle || '-'}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{image.buttonText}</span>
                      <span className="text-xs text-gray-500">→</span>
                      <span className="text-sm text-gray-600">
                        {image.buttonLink.split('=')[1]?.replace(/%20/g, ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditImage(image.id)}
                        disabled={isAdding || editingImage !== null}
                        className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        disabled={isAdding || editingImage !== null}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {carouselImages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p>No carousel images found. Add your first image.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselManagement;

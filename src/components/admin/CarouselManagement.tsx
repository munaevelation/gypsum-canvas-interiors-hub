import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { CarouselItem } from "@/types/carousel";
import { getCarouselItems, addCarouselItem, updateCarouselItem, deleteCarouselItem } from "@/services/dataService";
import ImageUpload from "./ImageUpload";

interface CarouselManagementProps {
  buttonClassName?: string;
}

const CarouselManagement = ({ buttonClassName }: CarouselManagementProps) => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<CarouselItem>>({
    title: "",
    description: "",
    imageUrl: "",
    link: ""
  });

  useEffect(() => {
    loadCarouselItems();
  }, []);

  const loadCarouselItems = () => {
    const items = getCarouselItems();
    setCarouselItems(items);
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.imageUrl) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await addCarouselItem(newItem as CarouselItem);
      toast.success("Carousel item added successfully");
      setNewItem({
        title: "",
        description: "",
        imageUrl: "",
        link: ""
      });
      loadCarouselItems();
    } catch (error) {
      toast.error("Failed to add carousel item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;

    setIsLoading(true);
    try {
      await updateCarouselItem(editingItem);
      toast.success("Carousel item updated successfully");
      setEditingItem(null);
      loadCarouselItems();
    } catch (error) {
      toast.error("Failed to update carousel item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCarouselItem(id);
      toast.success("Carousel item deleted successfully");
      loadCarouselItems();
    } catch (error) {
      toast.error("Failed to delete carousel item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, imageUrl: url });
    } else {
      setNewItem({ ...newItem, imageUrl: url });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Carousel Management</h2>
        <Button
          onClick={() => setEditingItem(null)}
          className={buttonClassName}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <Card className="border-black/20 shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Add/Edit Carousel Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={editingItem?.title || newItem.title}
                onChange={(e) => {
                  if (editingItem) {
                    setEditingItem({ ...editingItem, title: e.target.value });
                  } else {
                    setNewItem({ ...newItem, title: e.target.value });
                  }
                }}
                placeholder="Enter item title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editingItem?.description || newItem.description}
                onChange={(e) => {
                  if (editingItem) {
                    setEditingItem({ ...editingItem, description: e.target.value });
                  } else {
                    setNewItem({ ...newItem, description: e.target.value });
                  }
                }}
                placeholder="Enter item description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={editingItem?.link || newItem.link}
                onChange={(e) => {
                  if (editingItem) {
                    setEditingItem({ ...editingItem, link: e.target.value });
                  } else {
                    setNewItem({ ...newItem, link: e.target.value });
                  }
                }}
                placeholder="Enter item link"
              />
            </div>
            <div className="space-y-2">
              <Label>Image *</Label>
              <ImageUpload
                onUpload={handleImageUpload}
                currentImage={editingItem?.imageUrl || newItem.imageUrl}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {editingItem ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                  className="border-black/20"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateItem}
                  disabled={isLoading}
                  className={buttonClassName}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleAddItem}
                disabled={isLoading}
                className={buttonClassName}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isLoading ? "Adding..." : "Add Item"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carouselItems.map((item) => (
          <Card key={item.id} className="border-black/20 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Link
                    </a>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarouselManagement; 
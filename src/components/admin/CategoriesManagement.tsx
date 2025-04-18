import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Category } from "@/types/category";
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/services/dataService";

interface CategoriesManagementProps {
  buttonClassName?: string;
}

const CategoriesManagement = ({ buttonClassName }: CategoriesManagementProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: ""
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const allCategories = getCategories();
    setCategories(allCategories);
  };

  const handleAddCategory = async () => {
    if (!newCategory.name) {
      toast.error("Please enter a category name");
      return;
    }

    setIsLoading(true);
    try {
      await addCategory(newCategory as Category);
      toast.success("Category added successfully");
      setNewCategory({
        name: "",
        description: ""
      });
      loadCategories();
    } catch (error) {
      toast.error("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;

    setIsLoading(true);
    try {
      await updateCategory(editingCategory);
      toast.success("Category updated successfully");
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
      loadCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Categories Management</h2>
        <Button
          onClick={() => setEditingCategory(null)}
          className={buttonClassName}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>

      <Card className="border-black/20 shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Add/Edit Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={editingCategory?.name || newCategory.name}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, name: e.target.value });
                  } else {
                    setNewCategory({ ...newCategory, name: e.target.value });
                  }
                }}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editingCategory?.description || newCategory.description}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, description: e.target.value });
                  } else {
                    setNewCategory({ ...newCategory, description: e.target.value });
                  }
                }}
                placeholder="Enter category description"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {editingCategory ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setEditingCategory(null)}
                  className="border-black/20"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateCategory}
                  disabled={isLoading}
                  className={buttonClassName}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleAddCategory}
                disabled={isLoading}
                className={buttonClassName}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isLoading ? "Adding..." : "Add Category"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="border-black/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingCategory(category)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
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

export default CategoriesManagement; 
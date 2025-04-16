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
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { 
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "@/services/categories/categoriesService";
import { Category } from "@/services/dataService";

interface CategoriesManagementProps {
  buttonClassName?: string;
}

const CategoriesManagement = ({ buttonClassName }: CategoriesManagementProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    description: "",
    image: ""
  });
  
  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);
  
  const loadCategories = async () => {
    const categoryData = await fetchCategories();
    setCategories(categoryData);
  };
  
  const handleAddCategory = () => {
    setIsAdding(true);
    setNewCategory({
      name: "",
      description: "",
      image: ""
    });
  };
  
  const handleSaveCategory = async () => {
    // Basic validation
    if (!newCategory.name) {
      toast.error("Please enter a category name");
      return;
    }
    
    const result = await createCategory(newCategory);
    if (result) {
      await loadCategories(); // Reload the categories list
      setIsAdding(false);
      toast.success("Category saved successfully!");
    }
  };
  
  const handleEditCategory = (id: string) => {
    setEditingCategory(id);
    const categoryToEdit = categories.find(c => c.id === id);
    if (categoryToEdit) {
      setNewCategory({
        name: categoryToEdit.name,
        description: categoryToEdit.description,
        image: categoryToEdit.image
      });
    }
  };
  
  const handleUpdateCategory = async () => {
    // Basic validation
    if (!newCategory.name) {
      toast.error("Please enter a category name");
      return;
    }
    
    if (editingCategory !== null) {
      const result = await updateCategory(editingCategory, newCategory);
      if (result) {
        await loadCategories(); // Reload the categories list
        setEditingCategory(null);
        toast.success("Category updated successfully!");
      }
    }
  };
  
  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const result = await deleteCategory(id);
      if (result) {
        await loadCategories(); // Reload the categories list
        toast.success("Category deleted successfully!");
      }
    }
  };
  
  const handleCancelEdit = () => {
    setEditingCategory(null);
    setIsAdding(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Categories Management</h2>
        <Button 
          onClick={handleAddCategory} 
          disabled={isAdding || editingCategory !== null}
          className="bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-white hover:opacity-90 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      
      {/* Add/Edit Category Form */}
      {(isAdding || editingCategory !== null) && (
        <Card className="border-black/20 shadow-lg bg-white">
          <CardHeader className="bg-black/5 border-b border-black/20">
            <CardTitle className="text-black">
              {isAdding ? "Add New Category" : "Edit Category"}
            </CardTitle>
            <CardDescription className="text-black/70">
              Enter the details for the category below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium text-black">Category Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g. Wall Panels"
                  className="border-black/30 focus-visible:ring-black"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium text-black">Description</Label>
                <Textarea 
                  id="description" 
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Enter category description here..."
                  className="border-black/30 focus-visible:ring-black"
                />
              </div>
              
              <div className="space-y-2">
                <ImageUpload 
                  value={newCategory.image}
                  onChange={(value) => setNewCategory({...newCategory, image: value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-black/20 py-4">
            <Button 
              variant="outline" 
              onClick={handleCancelEdit} 
              className="border-black/30 text-black hover:bg-black/5"
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button 
              onClick={isAdding ? handleSaveCategory : handleUpdateCategory}
              className="bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-white hover:opacity-90 transition-all duration-300"
            >
              <Save className="mr-2 h-4 w-4" /> {isAdding ? "Save Category" : "Update Category"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Categories Table */}
      <Card className="border-black/20 shadow-md bg-white">
        <CardHeader className="bg-black/5 border-b border-black/20">
          <CardTitle className="text-black">Categories</CardTitle>
          <CardDescription className="text-black/70">
            Manage your product categories here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px] text-black">Image</TableHead>
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="hidden md:table-cell text-black">Description</TableHead>
                <TableHead className="text-right text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="hover:bg-black/5">
                  <TableCell>
                    <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={category.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          ?
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-black">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-black">{category.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditCategory(category.id)}
                        disabled={isAdding || editingCategory !== null}
                        className="text-black hover:bg-black/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={isAdding || editingCategory !== null}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-black/70">
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p>No categories found. Add your first category.</p>
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

export default CategoriesManagement;

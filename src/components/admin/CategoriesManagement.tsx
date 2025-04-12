
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
  getCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  Category
} from "@/services/dataService";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    description: "",
    image: ""
  });
  
  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);
  
  const loadCategories = () => {
    const categoryData = getCategories();
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
  
  const handleSaveCategory = () => {
    // Basic validation
    if (!newCategory.name) {
      toast.error("Please enter a category name");
      return;
    }
    
    addCategory(newCategory);
    loadCategories(); // Reload the categories list
    setIsAdding(false);
    
    toast.success("Category saved successfully!");
  };
  
  const handleEditCategory = (id: number) => {
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
  
  const handleUpdateCategory = () => {
    // Basic validation
    if (!newCategory.name) {
      toast.error("Please enter a category name");
      return;
    }
    
    if (editingCategory !== null) {
      const updatedCategory = {
        id: editingCategory,
        ...newCategory
      };
      
      updateCategory(updatedCategory);
      loadCategories(); // Reload the categories list
      setEditingCategory(null);
      
      toast.success("Category updated successfully!");
    }
  };
  
  const handleDeleteCategory = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
      loadCategories(); // Reload the categories list
      
      toast.success("Category deleted successfully!");
    }
  };
  
  const handleCancelEdit = () => {
    setEditingCategory(null);
    setIsAdding(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#8B5CF6]">Categories Management</h2>
        <Button 
          onClick={handleAddCategory} 
          disabled={isAdding || editingCategory !== null}
          className="bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      
      {/* Add/Edit Category Form */}
      {(isAdding || editingCategory !== null) && (
        <Card className="border-[#9b87f5]/20 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-[#8B5CF6]/10 border-b border-[#9b87f5]/20">
            <CardTitle className="text-[#8B5CF6]">{isAdding ? "Add New Category" : "Edit Category"}</CardTitle>
            <CardDescription>
              Enter the details for the category below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium text-gray-700">Category Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g. Wall Panels"
                  className="border-[#9b87f5]/30 focus-visible:ring-[#9b87f5]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium text-gray-700">Description</Label>
                <Textarea 
                  id="description" 
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Enter category description here..."
                  className="border-[#9b87f5]/30 focus-visible:ring-[#9b87f5]"
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
          <CardFooter className="flex justify-between border-t border-[#9b87f5]/20 py-4">
            <Button variant="outline" onClick={handleCancelEdit} className="border-[#9b87f5]/30">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button 
              onClick={isAdding ? handleSaveCategory : handleUpdateCategory}
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              <Save className="mr-2 h-4 w-4" /> {isAdding ? "Save Category" : "Update Category"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Categories Table */}
      <Card className="border-[#9b87f5]/20 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-[#8B5CF6]/10 border-b border-[#9b87f5]/20">
          <CardTitle className="text-[#8B5CF6]">Categories</CardTitle>
          <CardDescription>
            Manage your product categories here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="hover:bg-[#9b87f5]/5">
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
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditCategory(category.id)}
                        disabled={isAdding || editingCategory !== null}
                        className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={isAdding || editingCategory !== null}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
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


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

// Sample data - would come from an API in a real app
const initialCategories = [
  {
    id: 1,
    name: "Ceiling Cornices",
    description: "Elegant ceiling trim designs to enhance your room's perimeter.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
  },
  {
    id: 2,
    name: "Wall Panels",
    description: "Add texture and dimension to your walls with decorative panels.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea"
  },
  {
    id: 3,
    name: "Light Troughs",
    description: "Create ambient lighting with our recessed ceiling designs.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
  },
  {
    id: 4,
    name: "Columns & Pillars",
    description: "Classic and modern column designs for architectural accents.",
    image: "https://images.unsplash.com/photo-1505796149773-5d216eb9ac6d"
  }
];

const CategoriesManagement = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: ""
  });
  
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
      alert("Please enter a category name");
      return;
    }
    
    const updatedCategories = [...categories, {
      id: categories.length + 1,
      ...newCategory
    }];
    
    setCategories(updatedCategories);
    setIsAdding(false);
    
    // Here you would also make an API call to save the category
    console.log("Category saved:", newCategory);
  };
  
  const handleEditCategory = (id: number) => {
    setEditingCategory(id);
    const categoryToEdit = categories.find(c => c.id === id);
    if (categoryToEdit) {
      setNewCategory({ ...categoryToEdit });
    }
  };
  
  const handleUpdateCategory = () => {
    // Basic validation
    if (!newCategory.name) {
      alert("Please enter a category name");
      return;
    }
    
    const updatedCategories = categories.map(category => 
      category.id === editingCategory ? { ...category, ...newCategory } : category
    );
    
    setCategories(updatedCategories);
    setEditingCategory(null);
    
    // Here you would also make an API call to update the category
    console.log("Category updated:", newCategory);
  };
  
  const handleDeleteCategory = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter(category => category.id !== id);
      setCategories(updatedCategories);
      
      // Here you would also make an API call to delete the category
      console.log("Category deleted, ID:", id);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingCategory(null);
    setIsAdding(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories Management</h2>
        <Button onClick={handleAddCategory} disabled={isAdding}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      
      {/* Add/Edit Category Form */}
      {(isAdding || editingCategory !== null) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Category" : "Edit Category"}</CardTitle>
            <CardDescription>
              Enter the details for the category below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input 
                  id="name" 
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g. Wall Panels"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Enter category description here..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={newCategory.image}
                  onChange={(e) => setNewCategory({...newCategory, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
                {/* In a real app, you'd likely have an image upload component here */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button onClick={isAdding ? handleSaveCategory : handleUpdateCategory}>
              <Save className="mr-2 h-4 w-4" /> {isAdding ? "Save Category" : "Update Category"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage your product categories here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditCategory(category.id)}
                        disabled={isAdding || editingCategory !== null}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={isAdding || editingCategory !== null}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No categories found. Add your first category.
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

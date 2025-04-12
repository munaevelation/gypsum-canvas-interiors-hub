
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

// Sample data - would come from an API in a real app
const initialProducts = [
  {
    id: 1,
    name: "Royal Crown Cornice",
    description: "Elegant cornice design with intricate detailing.",
    dimensions: "12cm height x 15cm projection",
    category: "Ceiling Cornices",
    useCase: "Living Rooms, Dining Rooms",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
  },
  {
    id: 2,
    name: "Geometric 3D Wall Panel",
    description: "Modern geometric pattern that creates a stunning visual effect.",
    dimensions: "50cm x 50cm panels",
    category: "3D Panels",
    useCase: "Feature Walls, Office Spaces",
    image: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c"
  },
  {
    id: 3,
    name: "Classic Ceiling Medallion",
    description: "Traditional ceiling medallion with floral motif.",
    dimensions: "60cm diameter",
    category: "Ceiling Medallions",
    useCase: "Dining Rooms, Entryways",
    image: "https://images.unsplash.com/photo-1603203040289-611d79cb1fe7"
  }
];

// Sample categories - would come from an API in a real app
const categories = [
  "Ceiling Cornices",
  "Wall Panels",
  "Light Troughs",
  "Columns & Pillars",
  "Ceiling Medallions",
  "Decorative Mouldings",
  "3D Panels",
  "Modern Trims"
];

const ProductsManagement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    dimensions: "",
    category: "",
    useCase: "",
    image: ""
  });
  
  const handleAddProduct = () => {
    setIsAdding(true);
    setNewProduct({
      name: "",
      description: "",
      dimensions: "",
      category: "",
      useCase: "",
      image: ""
    });
  };
  
  const handleSaveProduct = () => {
    // Basic validation
    if (!newProduct.name || !newProduct.category) {
      alert("Please fill in all required fields");
      return;
    }
    
    const updatedProducts = [...products, {
      id: products.length + 1,
      ...newProduct
    }];
    
    setProducts(updatedProducts);
    setIsAdding(false);
    
    // Here you would also make an API call to save the product
    console.log("Product saved:", newProduct);
  };
  
  const handleEditProduct = (id: number) => {
    setEditingProduct(id);
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setNewProduct({ ...productToEdit });
    }
  };
  
  const handleUpdateProduct = () => {
    // Basic validation
    if (!newProduct.name || !newProduct.category) {
      alert("Please fill in all required fields");
      return;
    }
    
    const updatedProducts = products.map(product => 
      product.id === editingProduct ? { ...product, ...newProduct } : product
    );
    
    setProducts(updatedProducts);
    setEditingProduct(null);
    
    // Here you would also make an API call to update the product
    console.log("Product updated:", newProduct);
  };
  
  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      
      // Here you would also make an API call to delete the product
      console.log("Product deleted, ID:", id);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Button onClick={handleAddProduct} disabled={isAdding}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      {/* Add/Edit Product Form */}
      {(isAdding || editingProduct !== null) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Product" : "Edit Product"}</CardTitle>
            <CardDescription>
              Enter the details for the product below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input 
                  id="name" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g. Classic Ceiling Medallion"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input 
                  id="dimensions" 
                  value={newProduct.dimensions}
                  onChange={(e) => setNewProduct({...newProduct, dimensions: e.target.value})}
                  placeholder="e.g. 60cm diameter"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="useCase">Use Cases</Label>
                <Input 
                  id="useCase" 
                  value={newProduct.useCase}
                  onChange={(e) => setNewProduct({...newProduct, useCase: e.target.value})}
                  placeholder="e.g. Living Rooms, Dining Rooms"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description here..."
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
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
            <Button onClick={isAdding ? handleSaveProduct : handleUpdateProduct}>
              <Save className="mr-2 h-4 w-4" /> {isAdding ? "Save Product" : "Update Product"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your product catalog here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead className="hidden md:table-cell">Use Cases</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.dimensions}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.useCase}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                        disabled={isAdding || editingProduct !== null}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={isAdding || editingProduct !== null}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No products found. Add your first product.
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

export default ProductsManagement;

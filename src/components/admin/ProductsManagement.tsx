
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon,
  Tag,
  Ruler,
  Info,
  FileText,
  Star,
  Clock,
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getCategoryNames,
  Product
} from "@/services/dataService";

const ProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    dimensions: "",
    category: "",
    useCase: "",
    image: "",
    isFeatured: false,
    isNewArrival: false
  });
  
  // Load products and categories on component mount
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);
  
  const loadProducts = () => {
    const productData = getProducts();
    setProducts(productData);
  };
  
  const loadCategories = () => {
    const categoryNames = getCategoryNames();
    setCategories(categoryNames);
  };
  
  const handleAddProduct = () => {
    setIsAdding(true);
    setNewProduct({
      name: "",
      description: "",
      dimensions: "",
      category: "",
      useCase: "",
      image: "",
      isFeatured: false,
      isNewArrival: false
    });
  };
  
  const handleSaveProduct = () => {
    // Basic validation
    if (!newProduct.name || !newProduct.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    addProduct(newProduct);
    loadProducts(); // Reload the products list
    setIsAdding(false);
    
    toast.success("Product added successfully!");
  };
  
  const handleEditProduct = (id: number) => {
    setEditingProduct(id);
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setNewProduct({ 
        name: productToEdit.name,
        description: productToEdit.description,
        dimensions: productToEdit.dimensions,
        category: productToEdit.category,
        useCase: productToEdit.useCase,
        image: productToEdit.image,
        isFeatured: productToEdit.isFeatured || false,
        isNewArrival: productToEdit.isNewArrival || false
      });
    }
  };
  
  const handleUpdateProduct = () => {
    // Basic validation
    if (!newProduct.name || !newProduct.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (editingProduct !== null) {
      const updatedProduct = {
        id: editingProduct,
        ...newProduct
      };
      
      updateProduct(updatedProduct);
      loadProducts(); // Reload the products list
      setEditingProduct(null);
      
      toast.success("Product updated successfully!");
    }
  };
  
  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      loadProducts(); // Reload the products list
      
      toast.success("Product deleted successfully!");
    }
  };
  
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleViewProduct = (id: number) => {
    setSelectedProduct(id);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#8B5CF6]">Products Management</h2>
        <Button 
          onClick={handleAddProduct} 
          disabled={isAdding}
          className="bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      {/* Add/Edit Product Form */}
      {(isAdding || editingProduct !== null) && (
        <Card className="border-[#9b87f5]/20 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-[#8B5CF6]/10 border-b border-[#9b87f5]/20">
            <CardTitle className="text-[#8B5CF6]">
              {isAdding ? "Add New Product" : "Edit Product"}
            </CardTitle>
            <CardDescription>
              Enter the details for the product below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#9b87f5]" />
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="name" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g. Classic Ceiling Medallion"
                  className="border-[#9b87f5]/30 focus-visible:ring-[#9b87f5]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#9b87f5]" />
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger 
                    id="category"
                    className="border-[#9b87f5]/30 focus-visible:ring-[#9b87f5]"
                  >
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
                <Label htmlFor="dimensions" className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-[#9b87f5]" />
                  Dimensions
                </Label>
                <Input 
                  id="dimensions" 
                  value={newProduct.dimensions}
                  onChange={(e) => setNewProduct({...newProduct, dimensions: e.target.value})}
                  placeholder="e.g. 60cm diameter"
                  className="border-[#9b87f5]/30 focus-visible:ring-[#9b87f5]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="useCase" className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#9b87f5]" />
                  Use Cases
                </Label>
                <Input 
                  id="useCase" 
                  value={newProduct.useCase}
                  onChange={(e) => setNewProduct({...newProduct, useCase: e.target.value})}
                  placeholder="e.g. Living Rooms, Dining Rooms"
                  className="border-[#9b87f5]/30 focus-visible:ring-[#9b87f5]"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#9b87f5]" />
                  Description
                </Label>
                <Textarea 
                  id="description" 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description here..."
                  className="border-[#9b87f5]/30 focus-visible:ring-[#9b87f5]"
                />
              </div>
              
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#9b87f5]" />
                  Product Status
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isFeatured"
                    checked={newProduct.isFeatured}
                    onCheckedChange={(checked) => setNewProduct({...newProduct, isFeatured: checked === true})}
                    className="border-[#9b87f5]/30 data-[state=checked]:bg-[#9b87f5]"
                  />
                  <Label htmlFor="isFeatured" className="text-sm cursor-pointer">
                    Featured Product
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isNewArrival"
                    checked={newProduct.isNewArrival}
                    onCheckedChange={(checked) => setNewProduct({...newProduct, isNewArrival: checked === true})}
                    className="border-[#9b87f5]/30 data-[state=checked]:bg-[#9b87f5]"
                  />
                  <Label htmlFor="isNewArrival" className="text-sm cursor-pointer">
                    New Arrival
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <ImageUpload 
                  value={newProduct.image}
                  onChange={(value) => setNewProduct({...newProduct, image: value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-[#9b87f5]/20 py-4">
            <Button variant="outline" onClick={handleCancelEdit} className="border-[#9b87f5]/30">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button 
              onClick={isAdding ? handleSaveProduct : handleUpdateProduct}
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              <Save className="mr-2 h-4 w-4" /> {isAdding ? "Save Product" : "Update Product"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Products Table */}
      <Card className="border-[#9b87f5]/20 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-[#8B5CF6]/10 border-b border-[#9b87f5]/20">
          <CardTitle className="text-[#8B5CF6]">Products</CardTitle>
          <CardDescription>
            Manage your product catalog here.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Dimensions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-[#9b87f5]/5">
                  <TableCell>
                    <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-[#9b87f5]/10 px-2 py-1 text-xs font-medium text-[#8B5CF6]">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {product.isFeatured && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                          <Star className="h-3 w-3 mr-1" /> Featured
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                          <Clock className="h-3 w-3 mr-1" /> New Arrival
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.dimensions}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-[#8B5CF6] hover:text-[#7E69AB] hover:bg-[#9b87f5]/10"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-[#8B5CF6]">{product.name}</DialogTitle>
                            <DialogDescription>Product Details</DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            {product.image && (
                              <div className="aspect-video w-full overflow-hidden rounded-md border">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {product.isFeatured && (
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                                  <Star className="h-3 w-3 mr-1" /> Featured
                                </span>
                              )}
                              {product.isNewArrival && (
                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                                  <Clock className="h-3 w-3 mr-1" /> New Arrival
                                </span>
                              )}
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <Tag className="h-4 w-4 text-[#9b87f5]" /> Category
                              </p>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4 text-[#9b87f5]" /> Description
                              </p>
                              <p className="text-sm text-gray-500">{product.description}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <Ruler className="h-4 w-4 text-[#9b87f5]" /> Dimensions
                              </p>
                              <p className="text-sm text-gray-500">{product.dimensions}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <Info className="h-4 w-4 text-[#9b87f5]" /> Use Cases
                              </p>
                              <p className="text-sm text-gray-500">{product.useCase}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                        disabled={isAdding || editingProduct !== null}
                        className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={isAdding || editingProduct !== null}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-gray-300 mb-2" />
                      <p>No products found. Add your first product.</p>
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

export default ProductsManagement;

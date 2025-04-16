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
import ProductGallery from "./ProductGallery";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "@/services/products/productsService";
import { getCategoryNames, Product } from "@/services/dataService";

interface ProductsManagementProps {
  buttonClassName?: string;
}

const ProductsManagement = ({ buttonClassName }: ProductsManagementProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  
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
  
  const loadProducts = async () => {
    const productData = await fetchProducts();
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
  
  const handleSaveProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.category) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      const result = await createProduct(newProduct);
      if (result) {
        await loadProducts();
        setIsAdding(false);
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
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  
  const handleEditProduct = (id: string) => {
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
  
  const handleUpdateProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.category) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (editingProduct !== null) {
        const result = await updateProduct(editingProduct, newProduct);
        if (result) {
          await loadProducts();
          setEditingProduct(null);
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
        }
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(id);
      if (result) {
        await loadProducts();
        toast.success("Product deleted successfully!");
      }
    }
  };
  
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleViewProduct = (id: string) => {
    setSelectedProduct(id);
  };
  
  const handleStatusChange = (statusType: 'isFeatured' | 'isNewArrival', checked: boolean) => {
    if (checked) {
      if (statusType === 'isFeatured') {
        setNewProduct({
          ...newProduct, 
          isFeatured: true,
          isNewArrival: false
        });
      } else {
        setNewProduct({
          ...newProduct, 
          isFeatured: false,
          isNewArrival: true
        });
      }
    } else {
      setNewProduct({
        ...newProduct,
        [statusType]: false
      });
    }
  };

  const handleManageGallery = (productId: string) => {
    setSelectedProduct(productId);
    setShowGallery(true);
  };

  const toggleFeatured = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updatedProduct = { 
        ...product, 
        isFeatured: !product.isFeatured 
      };
      try {
        await updateProduct(productId, updatedProduct);
        setProducts(
          products.map((p) => (p.id === productId ? updatedProduct : p))
        );
        toast.success(`Product ${product.isFeatured ? "removed from" : "added to"} featured products`);
      } catch (error) {
        console.error("Error toggling featured status:", error);
        toast.error("Failed to update featured status");
      }
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Products Management</h2>
        <Button 
          onClick={handleAddProduct} 
          disabled={isAdding}
          className={buttonClassName}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      {(isAdding || editingProduct !== null) && (
        <Card className="border-black/20 shadow-lg bg-white">
          <CardHeader className="bg-black/5 border-b border-black/20">
            <CardTitle className="text-black">
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
                  <Tag className="h-4 w-4 text-black" />
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="name" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g. Classic Ceiling Medallion"
                  className="border-black/30 focus-visible:ring-black"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-black" />
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger 
                    id="category"
                    className="border-black/30 focus-visible:ring-black"
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
                  <Ruler className="h-4 w-4 text-black" />
                  Dimensions
                </Label>
                <Input 
                  id="dimensions" 
                  value={newProduct.dimensions}
                  onChange={(e) => setNewProduct({...newProduct, dimensions: e.target.value})}
                  placeholder="e.g. 60cm diameter"
                  className="border-black/30 focus-visible:ring-black"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="useCase" className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-black" />
                  Use Cases
                </Label>
                <Input 
                  id="useCase" 
                  value={newProduct.useCase}
                  onChange={(e) => setNewProduct({...newProduct, useCase: e.target.value})}
                  placeholder="e.g. Living Rooms, Dining Rooms"
                  className="border-black/30 focus-visible:ring-black"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-black" />
                  Description
                </Label>
                <Textarea 
                  id="description" 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description here..."
                  className="border-black/30 focus-visible:ring-black"
                />
              </div>
              
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-black" />
                  Product Status
                </Label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isFeatured"
                      checked={newProduct.isFeatured}
                      onCheckedChange={(checked) => handleStatusChange('isFeatured', checked === true)}
                      className="border-black/30 data-[state=checked]:bg-black"
                    />
                    <Label htmlFor="isFeatured" className="text-sm cursor-pointer">
                      Featured Product
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isNewArrival"
                      checked={newProduct.isNewArrival}
                      onCheckedChange={(checked) => handleStatusChange('isNewArrival', checked === true)}
                      className="border-black/30 data-[state=checked]:bg-black"
                    />
                    <Label htmlFor="isNewArrival" className="text-sm cursor-pointer">
                      New Arrival
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-1">
                    Note: A product can be either Featured or New Arrival, not both at the same time.
                  </p>
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
          <CardFooter className="flex justify-between border-t border-black/20 py-4">
            <Button variant="outline" onClick={handleCancelEdit} className="border-black/30">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button 
              onClick={isAdding ? handleSaveProduct : handleUpdateProduct}
              className="bg-black hover:bg-black/80 text-white"
            >
              <Save className="mr-2 h-4 w-4" /> {isAdding ? "Save Product" : "Update Product"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Product Gallery Manager Dialog */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-black">Product Gallery Manager</DialogTitle>
            <DialogDescription>
              Add or remove additional images for this product.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct !== null && (
            <div className="py-4">
              <ProductGallery productId={selectedProduct} />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Card className="border-black/20 shadow-md bg-white">
        <CardHeader className="bg-black/5 border-b border-black/20">
          <CardTitle className="text-black">Products</CardTitle>
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
                <TableRow key={product.id} className="hover:bg-black/5">
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
                    <span className="inline-flex items-center rounded-full bg-black/10 px-2 py-1 text-xs font-medium text-black">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {product.isFeatured && (
                        <span className="inline-flex items-center rounded-full bg-black/10 px-2 py-1 text-xs font-medium text-black">
                          <Star className="h-3 w-3 mr-1" /> Featured
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="inline-flex items-center rounded-full bg-black/10 px-2 py-1 text-xs font-medium text-black">
                          <Clock className="h-3 w-3 mr-1" /> New Arrival
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.dimensions}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-black hover:text-black hover:bg-black/10"
                        onClick={() => handleManageGallery(product.id)}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-black hover:text-black hover:bg-black/10"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-black">{product.name}</DialogTitle>
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
                                <span className="inline-flex items-center rounded-full bg-black/10 px-2 py-1 text-xs font-medium text-black">
                                  <Star className="h-3 w-3 mr-1" /> Featured
                                </span>
                              )}
                              {product.isNewArrival && (
                                <span className="inline-flex items-center rounded-full bg-black/10 px-2 py-1 text-xs font-medium text-black">
                                  <Clock className="h-3 w-3 mr-1" /> New Arrival
                                </span>
                              )}
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <Tag className="h-4 w-4 text-black" /> Category
                              </p>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4 text-black" /> Description
                              </p>
                              <p className="text-sm text-gray-500">{product.description}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <Ruler className="h-4 w-4 text-black" /> Dimensions
                              </p>
                              <p className="text-sm text-gray-500">{product.dimensions}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-semibold flex items-center gap-2">
                                <Info className="h-4 w-4 text-black" /> Use Cases
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

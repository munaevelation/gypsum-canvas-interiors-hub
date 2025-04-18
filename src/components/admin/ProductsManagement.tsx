import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/services/dataService";

interface ProductsManagementProps {
  buttonClassName?: string;
}

const ProductsManagement = ({ buttonClassName }: ProductsManagementProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    images: []
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await addProduct(newProduct as Product);
      toast.success("Product added successfully");
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        images: []
      });
      loadProducts();
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    setIsLoading(true);
    try {
      await updateProduct(editingProduct);
      toast.success("Product updated successfully");
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Products Management</h2>
        <Button
          onClick={() => setEditingProduct(null)}
          className={buttonClassName}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <Card className="border-black/20 shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Add/Edit Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={editingProduct?.name || newProduct.name}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, name: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }
                }}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={editingProduct?.category || newProduct.category}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, category: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, category: e.target.value });
                  }
                }}
                placeholder="Enter category"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={editingProduct?.price || newProduct.price}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, price: Number(e.target.value) });
                  } else {
                    setNewProduct({ ...newProduct, price: Number(e.target.value) });
                  }
                }}
                placeholder="Enter price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingProduct?.description || newProduct.description}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, description: e.target.value });
                  } else {
                    setNewProduct({ ...newProduct, description: e.target.value });
                  }
                }}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {editingProduct ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                  className="border-black/20"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateProduct}
                  disabled={isLoading}
                  className={buttonClassName}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleAddProduct}
                disabled={isLoading}
                className={buttonClassName}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isLoading ? "Adding..." : "Add Product"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="border-black/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-sm">{product.description}</p>
              <p className="mt-2 font-bold">₹{product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement; 

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductsManagement from "@/components/admin/ProductsManagement";
import CategoriesManagement from "@/components/admin/CategoriesManagement";
import CarouselManagement from "@/components/admin/CarouselManagement";
import { PanelTop, Layers, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { getProducts, getCategories, getCarouselImages } from "@/services/dataService";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [carouselCount, setCarouselCount] = useState(0);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminAuthenticated");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Load counts on initial render
  useEffect(() => {
    updateCounts();
  }, []);

  const updateCounts = () => {
    const products = getProducts();
    const categories = getCategories();
    const carouselImages = getCarouselImages();
    setProductCount(products.length);
    setCategoryCount(categories.length);
    setCarouselCount(carouselImages.length);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    updateCounts();
    
    if (value === "products") {
      toast.info(`You have ${productCount} products in your catalog`);
    } else if (value === "categories") {
      toast.info(`You have ${categoryCount} categories configured`);
    } else if (value === "carousel") {
      toast.info(`You have ${carouselCount} carousel images configured`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AdminHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>
        
        <Tabs 
          defaultValue="products" 
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full md:w-[600px] grid-cols-3 bg-gray-100 border border-gray-200">
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <PanelTop className="mr-2 h-4 w-4" />
              Products {productCount > 0 && `(${productCount})`}
            </TabsTrigger>
            <TabsTrigger 
              value="categories"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <Layers className="mr-2 h-4 w-4" />
              Categories {categoryCount > 0 && `(${categoryCount})`}
            </TabsTrigger>
            <TabsTrigger 
              value="carousel"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Carousel {carouselCount > 0 && `(${carouselCount})`}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductsManagement />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesManagement />
          </TabsContent>
          <TabsContent value="carousel">
            <CarouselManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

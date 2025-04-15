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

// Add a custom style for buttons
const buttonStyles = "bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-white hover:opacity-90 transition-all duration-300";

// Add tab styles
const tabStyles = "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--color-imperial-blue)] data-[state=active]:to-[var(--color-ruby)] data-[state=active]:text-white text-black hover:bg-[var(--color-imperial-blue)]/10 transition-all duration-300";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-[var(--color-skin-light)]">
      <AdminHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-transparent bg-clip-text mb-6">
            Admin Dashboard
          </h1>
        
          <Tabs 
            defaultValue="products" 
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full md:w-[600px] grid-cols-3 bg-white/50 border-2 border-[var(--color-imperial-blue)]/20 rounded-xl p-1">
              <TabsTrigger 
                value="products" 
                className={tabStyles}
              >
                <PanelTop className="mr-2 h-4 w-4" />
                Products {productCount > 0 && `(${productCount})`}
              </TabsTrigger>
              <TabsTrigger 
                value="categories"
                className={tabStyles}
              >
                <Layers className="mr-2 h-4 w-4" />
                Categories {categoryCount > 0 && `(${categoryCount})`}
              </TabsTrigger>
              <TabsTrigger 
                value="carousel"
                className={tabStyles}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Carousel {carouselCount > 0 && `(${carouselCount})`}
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
              <TabsContent value="products">
                <ProductsManagement buttonClassName={buttonStyles} />
              </TabsContent>
              <TabsContent value="categories">
                <CategoriesManagement buttonClassName={buttonStyles} />
              </TabsContent>
              <TabsContent value="carousel">
                <CarouselManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;

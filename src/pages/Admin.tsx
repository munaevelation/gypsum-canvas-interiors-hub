import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductsManagement from "@/components/admin/ProductsManagement";
import CategoriesManagement from "@/components/admin/CategoriesManagement";
import CarouselManagement from "@/components/admin/CarouselManagement";
import FooterManagement from "@/components/admin/FooterManagement";
import { PanelTop, Layers, ImageIcon, Copyright } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-[var(--color-skin-light)] to-[var(--color-skin-warm)]">
      <AdminHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-[var(--color-imperial-blue)]/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-transparent bg-clip-text">
              Admin Dashboard
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <div className="bg-white/80 p-3 rounded-xl border border-[var(--color-imperial-blue)]/20 shadow-sm">
                <p className="text-sm text-gray-600">Products</p>
                <p className="text-2xl font-bold text-[var(--color-imperial-blue)]">{productCount}</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-[var(--color-imperial-blue)]/20 shadow-sm">
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-[var(--color-ruby)]">{categoryCount}</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-[var(--color-imperial-blue)]/20 shadow-sm">
                <p className="text-sm text-gray-600">Carousel</p>
                <p className="text-2xl font-bold text-[var(--color-skin-warm)]">{carouselCount}</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-[var(--color-imperial-blue)]/20 shadow-sm">
                <p className="text-sm text-gray-600">Footer</p>
                <p className="text-2xl font-bold text-[var(--color-imperial-blue)]">1</p>
              </div>
            </div>
          </div>
        
          <Tabs 
            defaultValue="products" 
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full md:w-[800px] grid-cols-2 md:grid-cols-4 bg-white/50 border-2 border-[var(--color-imperial-blue)]/20 rounded-xl p-1 shadow-sm">
              <TabsTrigger 
                value="products" 
                className={`${tabStyles} flex items-center justify-center gap-2`}
              >
                <PanelTop className="h-4 w-4" />
                <span className="hidden sm:inline">Products</span>
                {productCount > 0 && <span className="bg-[var(--color-imperial-blue)]/10 text-[var(--color-imperial-blue)] px-2 py-0.5 rounded-full text-xs">{productCount}</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="categories"
                className={`${tabStyles} flex items-center justify-center gap-2`}
              >
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">Categories</span>
                {categoryCount > 0 && <span className="bg-[var(--color-ruby)]/10 text-[var(--color-ruby)] px-2 py-0.5 rounded-full text-xs">{categoryCount}</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="carousel"
                className={`${tabStyles} flex items-center justify-center gap-2`}
              >
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Carousel</span>
                {carouselCount > 0 && <span className="bg-[var(--color-skin-warm)]/10 text-[var(--color-skin-warm)] px-2 py-0.5 rounded-full text-xs">{carouselCount}</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="footer"
                className={`${tabStyles} flex items-center justify-center gap-2`}
              >
                <Copyright className="h-4 w-4" />
                <span className="hidden sm:inline">Footer</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="products" className="focus-visible:outline-none">
                <ProductsManagement buttonClassName={buttonStyles} />
              </TabsContent>
              <TabsContent value="categories" className="focus-visible:outline-none">
                <CategoriesManagement buttonClassName={buttonStyles} />
              </TabsContent>
              <TabsContent value="carousel" className="focus-visible:outline-none">
                <CarouselManagement />
              </TabsContent>
              <TabsContent value="footer" className="focus-visible:outline-none">
                <FooterManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin; 
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewArrivals from "@/components/NewArrivals";
import Categories from "@/components/Categories";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { getProducts, getProductById, Product } from "@/services/dataService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Tag, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Letter Animation Component
const AnimatedText = ({ text, className = "", onAnimationComplete }: { text: string; className?: string; onAnimationComplete: () => void }) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    },
    hold: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };

  // Animation variants for each letter
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateY: 90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    },
    hold: {
      opacity: 1,
      y: 0,
      rotateY: 0
    }
  };

  return (
    <motion.h1
      className={`text-center text-5xl font-bold mb-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || null;
  const productParam = searchParams.get("product") || null;
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for direct product navigation
  useEffect(() => {
    if (productParam) {
      const product = getProductById(parseInt(productParam, 10));
      if (product) {
        navigate(`/product/${productParam}`);
      }
    }
  }, [productParam, navigate]);
  
  useEffect(() => {
    if (activeCategory) {
      const allProducts = getProducts();
      const filtered = allProducts.filter(
        product => product.category === activeCategory
      );
      setCategoryProducts(filtered);
    }
  }, [activeCategory]);
  
  // Handle section scroll from URL parameters
  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [searchParams]);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      
      <main className="flex-grow">
        {!activeCategory && (
          <>
            {isLoading ? (
              <div className="h-screen flex items-center justify-center">
                <AnimatedText 
                  text="Premium Interior Solutions" 
                  className="text-black"
                  onAnimationComplete={() => {
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 1000);
                  }}
                />
              </div>
            ) : (
              <>
                <Hero />
                <div className="py-16 px-4 bg-white">
                  <div className="container mx-auto">
                    <h1 className="text-center text-5xl font-bold mb-8 text-black">
                      Premium Interior Solutions
                    </h1>
                    <motion.p 
                      className="text-center text-lg text-gray-600 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Discover our exquisite collection of gypsum designs that transform ordinary spaces into extraordinary experiences.
                    </motion.p>
                  </div>
                </div>
                <Categories />
                <FeaturedProducts />
                <NewArrivals />
              </>
            )}
          </>
        )}
        
        {activeCategory && (
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-3 text-black">{activeCategory}</h2>
              <p className="text-gray-600">Browse our collection of {activeCategory.toLowerCase()}</p>
            </div>
            
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product) => (
                  <Card 
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border-black/10"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="h-48 overflow-hidden relative cursor-pointer">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {product.isFeatured && (
                        <Badge className="absolute top-2 right-2 bg-black text-white">
                          Featured
                        </Badge>
                      )}
                      {product.isNewArrival && (
                        <Badge className="absolute top-2 right-2 bg-black text-white">
                          New
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <div className="mb-2 flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs border-black text-black">
                          {product.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                      <div className="text-sm text-gray-500 space-y-1 mt-auto">
                        <div className="flex items-center">
                          <Ruler className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{product.dimensions}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2 text-gray-400" />
                          <span>Use: {product.useCase}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">There are currently no products in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
              className="fixed right-6 bottom-6 bg-black text-white rounded-full p-3 shadow-lg hover:bg-black/80 focus:outline-none z-30"
              aria-label="Back to top"
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewArrivals from "@/components/NewArrivals";
import Categories from "@/components/Categories";
import { useSearchParams } from "react-router-dom";
import { getProducts, Product } from "@/services/dataService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Tag } from "lucide-react";

const Index = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || null;
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (activeCategory) {
      const allProducts = getProducts();
      const filtered = allProducts.filter(
        product => product.category === activeCategory
      );
      setCategoryProducts(filtered);
    }
  }, [activeCategory]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {!activeCategory && (
          <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <NewArrivals />
          </>
        )}
        
        {activeCategory && (
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-3 text-[#8B5CF6]">{activeCategory}</h2>
              <p className="text-gray-600">Browse our collection of {activeCategory.toLowerCase()}</p>
            </div>
            
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product) => (
                  <Card 
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <div className="mb-2 flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

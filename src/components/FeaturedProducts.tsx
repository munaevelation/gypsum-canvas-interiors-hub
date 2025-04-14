import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Tag, Star } from "lucide-react";
import { getFeaturedProducts, Product } from "@/services/dataService";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const products = getFeaturedProducts();
    setFeaturedProducts(products);
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Featured Products</h2>
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col bg-white border-gray-200 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 bg-black text-white">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <div className="mb-2 flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs border-black text-black">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-black">{product.name}</h3>
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
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No featured products found</h3>
            <p className="text-gray-500">Mark products as featured in the admin panel to display them here.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;

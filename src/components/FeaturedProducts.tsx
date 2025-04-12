
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Tag } from "lucide-react";

// Sample data - this would come from an API in a real application
const featuredProducts = [
  {
    id: 1,
    name: "Royal Crown Cornice",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Elegant cornice design with intricate detailing, perfect for formal living rooms and dining areas.",
    dimensions: "12cm height x 15cm projection",
    category: "Ceiling Cornices",
    useCase: "Living Rooms, Dining Rooms"
  },
  {
    id: 2,
    name: "Geometric 3D Wall Panel",
    image: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Modern geometric pattern that creates a stunning visual effect, adding depth and texture to any wall.",
    dimensions: "50cm x 50cm panels",
    category: "3D Panels",
    useCase: "Feature Walls, Office Spaces"
  },
  {
    id: 3,
    name: "Classic Ceiling Medallion",
    image: "https://images.unsplash.com/photo-1603203040289-611d79cb1fe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Traditional ceiling medallion with floral motif, ideal for chandeliers and pendant lighting fixtures.",
    dimensions: "60cm diameter",
    category: "Ceiling Medallions",
    useCase: "Dining Rooms, Entryways"
  },
  {
    id: 4,
    name: "Modern Light Trough",
    image: "https://images.unsplash.com/photo-1594126415003-9ded1a4f3f62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Clean, contemporary light trough design for elegant indirect lighting solutions.",
    dimensions: "15cm width x 10cm depth",
    category: "Light Troughs",
    useCase: "Living Rooms, Bedrooms, Home Theaters"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
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
                <Badge className="absolute top-2 right-2 bg-primary">
                  Featured
                </Badge>
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
      </div>
    </section>
  );
};

export default FeaturedProducts;

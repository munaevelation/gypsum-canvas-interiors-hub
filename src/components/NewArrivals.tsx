
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Tag, Star } from "lucide-react";

// Sample data - this would come from an API in a real application
const newArrivals = [
  {
    id: 1,
    name: "Minimalist Column Cover",
    image: "https://images.unsplash.com/photo-1505796149773-5d216eb9ac6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Clean, contemporary column cover with subtle linear detailing.",
    dimensions: "30cm diameter, 240cm height",
    category: "Columns & Pillars",
    useCase: "Modern Homes, Office Spaces"
  },
  {
    id: 2,
    name: "Art Deco Wall Panel Set",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Geometric Art Deco inspired panel design for statement walls.",
    dimensions: "60cm x 60cm panels (set of 4)",
    category: "Wall Panels",
    useCase: "Feature Walls, Restaurants, Hotels"
  },
  {
    id: 3,
    name: "Contemporary Crown Moulding",
    image: "https://images.unsplash.com/photo-1595428774932-8b4ae3496ea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Sleek crown moulding with a twist on traditional design.",
    dimensions: "10cm height x 12cm projection",
    category: "Decorative Mouldings",
    useCase: "Living Rooms, Bedrooms, Offices"
  }
];

const NewArrivals = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
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
                <Badge className="absolute top-2 right-2 bg-emerald-500">
                  New
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

export default NewArrivals;

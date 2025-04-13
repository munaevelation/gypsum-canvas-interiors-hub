
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Tag, Clock } from "lucide-react";
import { getNewArrivals, Product } from "@/services/dataService";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  
  useEffect(() => {
    const products = getNewArrivals();
    setNewArrivals(products);
  }, []);

  return (
    <section id="new-arrivals" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
        
        {newArrivals.length > 0 ? (
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
                    <Clock className="h-3 w-3 mr-1" />
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
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No new arrivals found</h3>
            <p className="text-gray-500">Mark products as new arrivals in the admin panel to display them here.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;

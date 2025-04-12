
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Ceiling Cornices",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Elegant ceiling trim designs to enhance your room's perimeter."
  },
  {
    id: 2,
    name: "Wall Panels",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Add texture and dimension to your walls with decorative panels."
  },
  {
    id: 3,
    name: "Light Troughs",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Create ambient lighting with our recessed ceiling designs."
  },
  {
    id: 4,
    name: "Columns & Pillars",
    image: "https://images.unsplash.com/photo-1505796149773-5d216eb9ac6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Classic and modern column designs for architectural accents."
  },
  {
    id: 5,
    name: "Ceiling Medallions",
    image: "https://images.unsplash.com/photo-1603203040289-611d79cb1fe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Ornate centerpieces for chandeliers and ceiling fixtures."
  },
  {
    id: 6,
    name: "Decorative Mouldings",
    image: "https://images.unsplash.com/photo-1595428774932-8b4ae3496ea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Versatile trim options for walls, ceilings, and transitions."
  },
  {
    id: 7,
    name: "3D Panels",
    image: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Contemporary wall designs with striking three-dimensional patterns."
  },
  {
    id: 8,
    name: "Modern Trims",
    image: "https://images.unsplash.com/photo-1594126415003-9ded1a4f3f62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Sleek and minimal trim options for modern interiors."
  }
];

const Categories = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryName: string) => {
    navigate(`/?category=${encodeURIComponent(categoryName)}`);
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

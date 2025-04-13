
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, Product } from "@/services/dataService";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>("");
  const navigate = useNavigate();
  
  // Sample additional images for demonstration
  const additionalImages = [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    "https://images.unsplash.com/photo-1603203040289-611d79cb1fe7",
    "https://images.unsplash.com/photo-1531835551805-16d864c8d311",
    "https://images.unsplash.com/photo-1505796149773-5d216eb9ac6d"
  ];
  
  useEffect(() => {
    if (id) {
      const productData = getProductById(parseInt(id, 10));
      setProduct(productData);
      if (productData) {
        setMainImage(productData.image);
      }
      setLoading(false);
    }
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center flex-col p-8">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleGoBack} variant="outline">
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6 text-black hover:bg-black/5"
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Additional Images */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Gallery</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {/* Include the main product image */}
                  <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                    <div 
                      className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === product.image ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setMainImage(product.image)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                  {/* Additional sample images */}
                  {additionalImages.map((img, index) => (
                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                      <div 
                        className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                        onClick={() => setMainImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} view ${index + 1}`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 bg-black text-white hover:bg-black/80" />
                <CarouselNext className="right-0 bg-black text-white hover:bg-black/80" />
              </Carousel>
            </div>
          </div>
          
          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex space-x-2 mb-2">
                <Badge variant="outline" className="text-black border-black">
                  {product.category}
                </Badge>
                {product.isFeatured && (
                  <Badge className="bg-black text-white">Featured</Badge>
                )}
                {product.isNewArrival && (
                  <Badge className="bg-black text-white">New Arrival</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <Card className="border-black/10 p-4">
              <h2 className="text-xl font-semibold mb-3">Product Specifications</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                  <p className="font-medium">Dimensions</p>
                  <p className="text-gray-600">{product.dimensions}</p>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                  <p className="font-medium">Use Cases</p>
                  <p className="text-gray-600">{product.useCase}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-medium">Type</p>
                  <p className="text-gray-600">{product.category}</p>
                </div>
              </div>
            </Card>
            
            <div className="pt-4">
              <Button className="w-full bg-black text-white hover:bg-black/80">
                Contact for Quote
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

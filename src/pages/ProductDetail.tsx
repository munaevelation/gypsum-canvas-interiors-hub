
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Share2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, getProductGalleryImages, Product } from "@/services/dataService";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>("");
  const navigate = useNavigate();
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (id) {
      const productData = getProductById(parseInt(id, 10));
      setProduct(productData);
      if (productData) {
        setMainImage(productData.image);
        
        const galleryImages = getProductGalleryImages(parseInt(id, 10)) || [];
        setAdditionalImages(galleryImages);
      }
      setLoading(false);
    }
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleShareToWhatsapp = () => {
    const productUrl = window.location.href;
    const whatsappMessage = `Check out this product: ${product?.name} - ${productUrl}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Sharing link to WhatsApp");
  };
  
  const isVideo = (src: string) => {
    return src && (src.startsWith('data:video/') || src.includes('video/mp4'));
  };
  
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Video play error:", error);
          toast.error("Could not play video. Please try again.");
        });
      }
      setIsPlaying(!isPlaying);
    }
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
  
  const allImages = [product.image, ...additionalImages];
  
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
          <div className="space-y-6">
            <div className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50 relative">
              {isVideo(mainImage) ? (
                <div className="relative h-full w-full">
                  <video
                    ref={videoRef}
                    src={mainImage}
                    className="h-full w-full object-cover"
                    onClick={handleVideoClick}
                    playsInline
                    muted
                  />
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                    onClick={handleVideoClick}
                  >
                    <div className="bg-black/60 p-4 rounded-full">
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Gallery</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {allImages.map((img, index) => (
                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                      <div 
                        className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                        onClick={() => setMainImage(img)}
                      >
                        {isVideo(img) ? (
                          <div className="relative h-full w-full bg-gray-800 flex items-center justify-center">
                            <video 
                              src={img} 
                              className="h-full w-full object-cover"
                              muted
                            />
                            <Play className="absolute h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <img 
                            src={img} 
                            alt={`${product.name} view ${index}`} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 bg-black text-white hover:bg-black/80" />
                <CarouselNext className="right-0 bg-black text-white hover:bg-black/80" />
              </Carousel>
            </div>
          </div>
          
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
            
            <div className="pt-4 space-y-4">
              <Button 
                className="w-full bg-black text-white hover:bg-black/80"
                onClick={handleShareToWhatsapp}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Contact for Quote
              </Button>
              
              <p className="text-sm text-gray-500 text-center">
                Click the button above to share this product on WhatsApp and request a quote
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCarouselImages } from "@/services/carousel/carouselService";
import { CarouselImage } from "@/services/dataService";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Load carousel images from our data service
    const loadCarouselImages = async () => {
      const images = await fetchCarouselImages();
      
      // If there are no carousel images, use default ones
      if (images.length === 0) {
        setCarouselImages([
          {
            id: "1", // Changed to string
            image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
            title: "Elegant Interior Solutions",
            subtitle: "Transform your space with our premium collection of decorative elements",
            buttonText: "Explore Collection",
            buttonLink: "/?category=Ceiling Cornices"
          }
        ]);
      } else {
        setCarouselImages(images);
      }
    };
    
    loadCarouselImages();
  }, []);
  
  useEffect(() => {
    if (carouselImages.length <= 1) return;
    
    // Auto-rotate carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselImages]);
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % carouselImages.length;
    setCurrentIndex(newIndex);
  };
  
  if (carouselImages.length === 0) return null;
  
  return (
    <div className="relative w-full h-[500px] md:h-[500px] bg-gray-100 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${carouselImages[currentIndex].image})`,
              backgroundPosition: isMobile ? 'center' : 'center',
              backgroundSize: isMobile ? 'cover' : 'cover'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {carouselImages[currentIndex].title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {carouselImages[currentIndex].subtitle}
                </p>
                <Link to={carouselImages[currentIndex].buttonLink}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    {carouselImages[currentIndex].buttonText}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation arrows */}
      {carouselImages.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Elegant Gypsum Designs for Modern Interiors",
      description: "Transform your space with our premium quality gypsum carnis and interior decor products.",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Explore Collection"
    },
    {
      id: 2,
      title: "Ceiling Designs That Inspire",
      description: "Our ceiling medallions and cornices add elegance to any room.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "View Ceiling Collection"
    },
    {
      id: 3,
      title: "Wall Panels for Character & Style",
      description: "Add dimension and texture to your walls with our designer panels.",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Discover Wall Panels"
    }
  ];
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slider */}
      <div 
        className="w-full h-full transition-transform duration-700 ease-in-out flex"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  {slide.cta} <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider Controls */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

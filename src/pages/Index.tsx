
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewArrivals from "@/components/NewArrivals";
import Categories from "@/components/Categories";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || null;
  
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
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">{activeCategory}</h2>
            {/* Category products will be loaded dynamically */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <p>Products for this category will be displayed here.</p>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

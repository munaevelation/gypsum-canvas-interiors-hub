import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Admin from "./pages/Admin"; 
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Loader from "./components/Loader";

const queryClient = new QueryClient();

// Move all routing-related components inside the BrowserRouter
const AnimatedRoutes = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reset loading state when location changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Scroll to the top whenever location changes
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading && <Loader />}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Display loader for 1 second on initial load only
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton richColors />
        <AnimatePresence>
          {loading && <Loader />}
        </AnimatePresence>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

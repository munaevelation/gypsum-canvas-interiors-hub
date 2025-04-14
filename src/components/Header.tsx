import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ChevronRight, Home, Info, Star, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";
import { searchProducts, Product } from "@/services/dataService";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  "Ceiling Cornices",
  "Wall Panels",
  "Light Troughs",
  "Columns & Pillars",
  "Ceiling Medallions",
  "Decorative Mouldings",
  "3D Panels",
  "Modern Trims"
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      if (results.length === 0) {
        toast.info("No products found matching your search");
      }
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navigateToCategory = (category: string) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
    setIsMenuOpen(false);
  };

  const navigateToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };
  
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== "/") {
      navigate(`/?section=${sectionId}`);
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };
  
  const reloadPage = () => {
    window.location.reload();
  };
  
  useEffect(() => {
    if (location.pathname === "/" && location.search) {
      const section = new URLSearchParams(location.search).get('section');
      if (section) {
        setTimeout(() => {
          const sectionElement = document.getElementById(section);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [location]);

  const handleProductSelect = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const NavLink = ({ to, onClick, children }: { to?: string; onClick?: () => void; children: React.ReactNode }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {to ? (
        <Link 
          to={to} 
          className="text-gray-700 hover:text-black font-medium"
        >
          {children}
        </Link>
      ) : (
        <button 
          onClick={onClick}
          className="text-gray-700 hover:text-black font-medium"
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  const CircularNavButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center"
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-1 shadow-md">
        {icon}
      </div>
      <span className="text-xs text-black">{label}</span>
    </motion.button>
  );
  
  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            onClick={navigateToHome} 
            className="text-2xl font-bold text-black cursor-pointer"
          >
            Gypsum<span className="text-black">Carnis</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink onClick={navigateToHome}>Home</NavLink>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  className="flex items-center text-gray-700 hover:text-black font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuItem 
                      onClick={() => navigateToCategory(category)}
                      className="cursor-pointer text-black"
                    >
                      {category}
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <NavLink onClick={() => scrollToSection("featured")}>Featured</NavLink>
            
            <NavLink onClick={() => scrollToSection("new-arrivals")}>New Arrivals</NavLink>
            
            <NavLink to="/about">About</NavLink>
            
            <motion.a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.a>
          </nav>
          
          <div className="hidden md:flex items-center">
            <Button 
              variant="outline" 
              className="relative h-9 px-4 text-sm border-black text-black hover:bg-black/10"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search products...</span>
              <kbd className="ml-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-black/20 px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          
          <div className="flex md:hidden items-center space-x-4">
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="text-black hover:text-gray-700 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={toggleMenu}
              className="text-black hover:text-gray-700 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 py-4 bg-white border-t border-black/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobile && (
                <div className="flex justify-between px-4 pb-4 mb-4 border-b border-black/10">
                  <CircularNavButton 
                    icon={<Home className="h-5 w-5" />} 
                    label="Home" 
                    onClick={navigateToHome} 
                  />
                  <CircularNavButton 
                    icon={<Star className="h-5 w-5" />} 
                    label="Featured" 
                    onClick={() => scrollToSection("featured")} 
                  />
                  <CircularNavButton 
                    icon={<Clock className="h-5 w-5" />} 
                    label="New" 
                    onClick={() => scrollToSection("new-arrivals")} 
                  />
                  <CircularNavButton 
                    icon={<Info className="h-5 w-5" />} 
                    label="About" 
                    onClick={() => navigate("/about")} 
                  />
                  <CircularNavButton 
                    icon={<MessageSquare className="h-5 w-5" />} 
                    label="Contact" 
                    onClick={() => window.open("https://wa.me/1234567890", "_blank")} 
                  />
                </div>
              )}
              
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={navigateToHome} 
                  className="text-left text-black hover:text-gray-700 font-medium px-4 py-2"
                >
                  Home
                </button>
                
                <div className="px-4">
                  <p className="font-medium text-black mb-2">Categories</p>
                  <div className="ml-4 flex flex-col space-y-2">
                    {categories.map((category) => (
                      <motion.button 
                        key={category}
                        onClick={() => navigateToCategory(category)}
                        className="text-left text-gray-700 hover:text-black flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-4 w-4 mr-1" />
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => scrollToSection("featured")} 
                  className="text-left text-black hover:text-gray-700 font-medium px-4 py-2"
                >
                  Featured
                </button>
                
                <button 
                  onClick={() => scrollToSection("new-arrivals")}
                  className="text-left text-black hover:text-gray-700 font-medium px-4 py-2"
                >
                  New Arrivals
                </button>
                
                <Link
                  to="/about"
                  className="text-left text-black hover:text-gray-700 font-medium px-4 py-2"
                >
                  About
                </Link>
                
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 font-medium px-4 py-2 flex items-center"
                >
                  Contact
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <form onSubmit={handleSearch}>
          <CommandInput 
            placeholder="Search products..." 
            value={searchQuery}
            onValueChange={(value) => {
              setSearchQuery(value);
              if (value.trim()) {
                const results = searchProducts(value);
                setSearchResults(results);
              } else {
                setSearchResults([]);
              }
            }}
            ref={searchInputRef}
            className="border-none focus:ring-0"
          />
        </form>
        <CommandList>
          <CommandEmpty>
            {searchQuery.length > 0 ? (
              <div className="py-6 text-center text-sm">
                <p>No products found matching '{searchQuery}'</p>
              </div>
            ) : (
              <div className="py-6 text-center text-sm">
                <p>Type to search products...</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Search by product name, category, or description
                </p>
              </div>
            )}
          </CommandEmpty>
          {searchResults.length > 0 && (
            <CommandGroup heading="Products">
              {searchResults.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleProductSelect(product.id)}
                  className="flex items-center py-2 cursor-pointer"
                >
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-10 w-10 rounded object-cover mr-3"
                    />
                  )}
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;

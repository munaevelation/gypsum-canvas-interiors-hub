
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
import { searchProducts, Product, getCategoryNames } from "@/services/dataService";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const categories = getCategoryNames();
  
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
  
  const navigateTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
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
    // Always scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const handleProductSelect = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  
  const navigateToAbout = () => {
    navigate('/about');
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo on left */}
          <div 
            onClick={navigateToHome} 
            className="text-xl md:text-2xl font-bold text-black cursor-pointer whitespace-nowrap flex-shrink-0 mr-4"
          >
            Gypsum<span className="text-black">Carnis</span>
          </div>
          
          {/* Navigation in middle - desktop only */}
          <nav className="hidden md:flex items-center justify-center space-x-6 flex-grow">
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
            <NavLink onClick={navigateToAbout}>About</NavLink>
            <NavLink onClick={() => scrollToSection("contact")}>Contact</NavLink>
          </nav>
          
          {/* Search bar on right */}
          <div className="flex-shrink-0 ml-4 w-full max-w-xs">
            <Button 
              variant="outline" 
              className="relative w-full h-9 px-4 text-sm border-black text-black hover:bg-black/10"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span className="text-sm hidden md:inline">Search products...</span>
              <kbd className="hidden md:inline-flex ml-3 pointer-events-none h-5 select-none items-center gap-1 rounded border bg-black/20 px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMobile && (
          <div className="flex justify-between w-full max-w-xs mx-auto mt-4">
            <CircularNavButton 
              icon={<Home className="h-5 w-5" />} 
              label="Home" 
              onClick={navigateToHome} 
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircularNavButton 
                  icon={<Menu className="h-5 w-5" />} 
                  label="Categories" 
                  onClick={() => {}} 
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-white mt-2 border border-gray-200 shadow-lg z-50"
                align="center"
              >
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => navigateToCategory(category)}
                    className="cursor-pointer text-black hover:bg-gray-100 py-2 px-4"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
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
              icon={<MessageSquare className="h-5 w-5" />} 
              label="Contact" 
              onClick={() => scrollToSection("contact")} 
            />
            
            <CircularNavButton 
              icon={<Info className="h-5 w-5" />} 
              label="About" 
              onClick={() => navigateToAbout()} 
            />
          </div>
        )}
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

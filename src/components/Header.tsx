
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
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
  
  // Handle search command dialog
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
  
  // Close search dialog when route changes
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
    
    // If we're not on the home page, navigate there first then scroll
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
    // Check if we have a section to scroll to after navigation
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
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={navigateToHome} 
            className="text-2xl font-bold text-gray-800 cursor-pointer"
          >
            Gypsum<span className="text-black">Carnis</span>
          </div>
          
          {/* Desktop Navigation */}
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
                      className="cursor-pointer"
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
          
          {/* Search Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Button 
              variant="outline" 
              className="relative h-9 px-4 text-sm text-muted-foreground border-gray-200 hover:bg-gray-100"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search products...</span>
              <kbd className="ml-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-black focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 py-4 bg-white border-t"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={navigateToHome} 
                  className="text-left text-gray-700 hover:text-black font-medium px-4 py-2"
                >
                  Home
                </button>
                
                <div className="px-4">
                  <p className="font-medium text-gray-700 mb-2">Categories</p>
                  <div className="ml-4 flex flex-col space-y-2">
                    {categories.map((category) => (
                      <motion.button 
                        key={category}
                        onClick={() => navigateToCategory(category)}
                        className="text-left text-gray-600 hover:text-black flex items-center"
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
                  className="text-left text-gray-700 hover:text-black font-medium px-4 py-2"
                >
                  Featured
                </button>
                
                <button 
                  onClick={() => scrollToSection("new-arrivals")}
                  className="text-left text-gray-700 hover:text-black font-medium px-4 py-2"
                >
                  New Arrivals
                </button>
                
                <Link
                  to="/about"
                  className="text-left text-gray-700 hover:text-black font-medium px-4 py-2"
                >
                  About
                </Link>
                
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black font-medium px-4 py-2 flex items-center"
                >
                  Contact
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Search Command Dialog */}
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
                  onSelect={() => {
                    navigate(`/?product=${product.id}`);
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex items-center py-2"
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

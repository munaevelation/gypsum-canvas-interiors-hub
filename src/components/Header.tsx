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
  const [categories, setCategories] = useState<string[]>([]);
  
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
  
  useEffect(() => {
    const loadCategories = () => {
      const categoryNames = getCategoryNames();
      setCategories(categoryNames);
    };
    
    loadCategories();
  }, []);
  
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
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80;
      const sectionPosition = section.getBoundingClientRect().top;
      const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
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
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerHeight = 80;
          const sectionPosition = section.getBoundingClientRect().top;
          const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerHeight = 80;
          const sectionPosition = section.getBoundingClientRect().top;
          const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleProductSelect = (productId: string) => {
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
          className="text-[var(--color-text)] hover:text-[var(--color-hover)] font-bold transition-colors"
        >
          {children}
        </Link>
      ) : (
        <button 
          onClick={onClick}
          className="text-[var(--color-text)] hover:text-[var(--color-hover)] font-bold transition-colors"
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
      <div className="w-12 h-12 rounded-full bg-[#FF3D7F] text-white flex items-center justify-center mb-1 shadow-md">
        {icon}
      </div>
      <span className="text-xs font-bold text-black">{label}</span>
    </motion.button>
  );
  
  const navigateToAbout = () => {
    navigate('/about');
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    const whatsappMessage = "Hello! I would like to get in touch with Shekhar Sailesh Decoration.";
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white text-black shadow-[var(--box-shadow)] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        {/* Desktop View */}
        <div className="flex items-center justify-between">
          {/* Logo on left */}
          <div 
            onClick={navigateToHome} 
            className="cursor-pointer whitespace-nowrap flex-shrink-0 mr-4"
          >
            <img 
              src="/src/assets/company-logo.png" 
              alt="Shekhar Sailesh Decoration" 
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
          
          {/* Navigation in middle - desktop only */}
          <nav className="hidden md:flex items-center justify-center space-x-6 flex-grow">
            <NavLink onClick={navigateToHome}>Home</NavLink>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  className="flex items-center text-black hover:text-[var(--color-primary)] font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-100 shadow-lg">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuItem 
                      onClick={() => navigateToCategory(category)}
                      className="cursor-pointer text-black hover:text-[var(--color-primary)] font-medium"
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
            <NavLink onClick={handleContactClick}>Contact</NavLink>
          </nav>
          
          {/* Search bar on right */}
          <div className="flex-shrink-0 ml-4 flex items-center">
            <div className="search_wrap search_wrap_3">
              <div className="search_box">
                <div 
                  className="searchButton w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center cursor-pointer transition-all duration-400 hover:bg-gray-100" 
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMobile && (
          <div className="flex justify-between w-full px-2 space-x-2">
            <CircularNavButton 
              icon={<Home className="h-5 w-5 text-white" />} 
              label="Home" 
              onClick={navigateToHome} 
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FF3D7F] text-white flex items-center justify-center mb-1 shadow-md">
                    <Menu className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-black">Categories</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-white border border-gray-100 shadow-lg z-50 mt-2"
                align="center"
                sideOffset={5}
              >
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => navigateToCategory(category)}
                    className="cursor-pointer text-black hover:text-[var(--color-primary)] font-bold py-2 px-4"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <CircularNavButton 
              icon={<Star className="h-5 w-5 text-white" />} 
              label="Featured" 
              onClick={() => scrollToSection("featured")} 
            />
            
            <CircularNavButton 
              icon={<Clock className="h-5 w-5 text-white" />} 
              label="New" 
              onClick={() => scrollToSection("new-arrivals")} 
            />
              
            <CircularNavButton 
              icon={<Info className="h-5 w-5 text-white" />} 
              label="About" 
              onClick={() => navigateToAbout()} 
            />
            
            <CircularNavButton 
              icon={<MessageSquare className="h-5 w-5 text-white" />} 
              label="Contact" 
              onClick={handleContactClick} 
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

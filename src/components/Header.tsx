
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here we would handle search functionality
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navigateToCategory = (category: string) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={to} 
        className="text-gray-700 hover:text-primary font-medium"
      >
        {children}
      </Link>
    </motion.div>
  );
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Gypsum<span className="text-primary">Carnis</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  className="flex items-center text-gray-700 hover:text-primary font-medium"
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
            
            <NavLink to="/?section=featured">Featured</NavLink>
            
            <NavLink to="/?section=new-arrivals">New Arrivals</NavLink>
            
            <motion.a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.a>
          </nav>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative max-w-md mx-4 flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
        
        {/* Mobile Menu */}
        <motion.div 
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 py-4 bg-white border-t`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
              Home
            </Link>
            
            <div className="px-4">
              <p className="font-medium text-gray-700 mb-2">Categories</p>
              <div className="ml-4 flex flex-col space-y-2">
                {categories.map((category) => (
                  <motion.button 
                    key={category}
                    onClick={() => navigateToCategory(category)}
                    className="text-left text-gray-600 hover:text-primary"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <Link to="/?section=featured" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
              Featured
            </Link>
            
            <Link to="/?section=new-arrivals" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
              New Arrivals
            </Link>
            
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary font-medium px-4 py-2 flex items-center"
            >
              Contact
            </a>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;

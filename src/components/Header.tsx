
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-gray-700 hover:text-primary font-medium">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => navigateToCategory(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/?section=featured" className="text-gray-700 hover:text-primary font-medium">
              Featured
            </Link>
            
            <Link to="/?section=new-arrivals" className="text-gray-700 hover:text-primary font-medium">
              New Arrivals
            </Link>
            
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Contact
            </a>
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
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
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
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
                Home
              </Link>
              
              <div className="px-4">
                <p className="font-medium text-gray-700 mb-2">Categories</p>
                <div className="ml-4 flex flex-col space-y-2">
                  {categories.map((category) => (
                    <button 
                      key={category}
                      onClick={() => navigateToCategory(category)}
                      className="text-left text-gray-600 hover:text-primary"
                    >
                      {category}
                    </button>
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

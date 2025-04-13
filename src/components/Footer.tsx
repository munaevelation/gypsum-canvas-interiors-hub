
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first then scroll
    if (window.location.pathname !== "/") {
      navigate(`/?section=${sectionId}`);
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Our Story */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Story</h3>
            <p className="text-gray-300 mb-4">
              We've been creating elegant gypsum designs since 2010. Our passion for detail and quality craftsmanship makes us the preferred choice for interior designers and homeowners.
            </p>
            <Link to="/about" className="text-white hover:underline inline-flex items-center">
              Read more <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="text-gray-300 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("featured")} 
                  className="text-gray-300 hover:text-white bg-transparent border-none p-0 text-left cursor-pointer"
                >
                  Featured Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("new-arrivals")} 
                  className="text-gray-300 hover:text-white bg-transparent border-none p-0 text-left cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <span className="text-gray-300">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <a href="mailto:info@gypsumcarnis.com" className="text-gray-300 hover:text-white">
                  info@gypsumcarnis.com
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Design Street, Creative District, City, Country
                </span>
              </li>
            </ul>
          </div>
          
          {/* Shop Map Location */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Find Us</h3>
            <div className="h-48 bg-gray-800 rounded-md overflow-hidden">
              {/* This would be replaced with an actual Google Map */}
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white mr-2" />
                <span className="text-gray-300">Map loading...</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} Gypsum Carnis Interiors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

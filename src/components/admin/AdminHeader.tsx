import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const AdminHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="flex items-center">
              <img 
                src="/src/assets/company-logo.png" 
                alt="Company Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-sm text-gray-600 hover:text-[var(--color-imperial-blue)] flex items-center gap-1 transition-all duration-300"
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">View Site</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] hover:opacity-90 text-white">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-gray-100 shadow-lg">
                <DropdownMenuLabel className="text-gray-700">Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                  <User className="mr-2 h-4 w-4 text-[var(--color-imperial-blue)]" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                  <Settings className="mr-2 h-4 w-4 text-[var(--color-imperial-blue)]" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-[var(--color-ruby)] hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

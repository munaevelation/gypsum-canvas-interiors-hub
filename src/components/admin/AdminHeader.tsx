
import { Link } from "react-router-dom";
import { LogOut, Settings, User, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminHeader = () => {
  return (
    <header className="bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-2xl font-bold text-white">
              Gypsum<span className="text-[#D946EF] font-extrabold">CMS</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-white/90 hover:text-white flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">View Site</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 text-white">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-purple-100">
                <DropdownMenuLabel className="text-[#8B5CF6]">Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-[#9b87f5]" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4 text-[#9b87f5]" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500">
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

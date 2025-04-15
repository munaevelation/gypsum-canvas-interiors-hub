import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple login validation - in a real app, this would be server-side
    // For demo purposes, we're using a hardcoded superadmin credentials
    setTimeout(() => {
      if (username === "superadmin@shekhar" && password === "shekhardon2059") {
        localStorage.setItem("isAdminAuthenticated", "true");
        toast.success("Logged in successfully");
        navigate("/admin");
      } else {
        toast.error("Invalid username or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-imperial-blue)] via-[var(--color-ruby)] to-[var(--color-skin-warm)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-md bg-white/90 shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center pb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-transparent bg-clip-text">
                Welcome Back
              </CardTitle>
            </motion.div>
            <CardDescription className="text-gray-500 font-medium">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 px-4 border-2 border-gray-200 focus:border-[var(--color-imperial-blue)] focus:ring-[var(--color-imperial-blue)] transition-colors"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 px-4 border-2 border-gray-200 focus:border-[var(--color-imperial-blue)] focus:ring-[var(--color-imperial-blue)] transition-colors"
                />
              </motion.div>
              
            </CardContent>
            <CardFooter>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className={`w-full h-12 text-lg font-semibold transition-all duration-300 bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] hover:from-[var(--color-ruby)] hover:to-[var(--color-imperial-blue)] text-white shadow-lg hover:shadow-xl ${
                    isLoading ? 'opacity-90 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductsManagement from "@/components/admin/ProductsManagement";
import CategoriesManagement from "@/components/admin/CategoriesManagement";
import { PanelTop, Layers } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
      <AdminHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-[#8B5CF6]">Admin Dashboard</h1>
        
        <Tabs 
          defaultValue="products" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 bg-white/80 border border-purple-200">
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              <PanelTop className="mr-2 h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="categories"
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              <Layers className="mr-2 h-4 w-4" />
              Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductsManagement />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

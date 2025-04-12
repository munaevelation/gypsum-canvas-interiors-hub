
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductsManagement from "@/components/admin/ProductsManagement";
import CategoriesManagement from "@/components/admin/CategoriesManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs 
          defaultValue="products" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
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

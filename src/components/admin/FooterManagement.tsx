import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { 
  fetchFooterContent,
  updateFooterContent
} from "@/services/footer/footerService";

const FooterManagement = () => {
  const [footerContent, setFooterContent] = useState({
    copyright: "",
    address: "",
    phone: "",
    email: "",
    whatsapp: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFooterContent();
  }, []);

  const loadFooterContent = async () => {
    const content = await fetchFooterContent();
    setFooterContent(content);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateFooterContent(footerContent);
      toast.success("Footer content updated successfully!");
    } catch (error) {
      toast.error("Failed to update footer content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Footer Content</h2>
      </div>
      
      <Card className="border-black/20 shadow-lg bg-white">
        <CardHeader className="bg-black/5 border-b border-black/20">
          <CardTitle className="text-black">Edit Footer Content</CardTitle>
          <CardDescription>
            Update the footer content that appears on the website.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="copyright">Copyright Text</Label>
              <Input
                id="copyright"
                value={footerContent.copyright}
                onChange={(e) => setFooterContent({ ...footerContent, copyright: e.target.value })}
                placeholder="© 2024 Shekhar Sailesh Decoration. All rights reserved."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={footerContent.address}
                onChange={(e) => setFooterContent({ ...footerContent, address: e.target.value })}
                placeholder="Enter company address"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={footerContent.phone}
                onChange={(e) => setFooterContent({ ...footerContent, phone: e.target.value })}
                placeholder="+91 1234567890"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={footerContent.email}
                onChange={(e) => setFooterContent({ ...footerContent, email: e.target.value })}
                placeholder="contact@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                value={footerContent.whatsapp}
                onChange={(e) => setFooterContent({ ...footerContent, whatsapp: e.target.value })}
                placeholder="+91 1234567890"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end pt-6">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-to-r from-[var(--color-imperial-blue)] to-[var(--color-ruby)] text-white hover:opacity-90 transition-all duration-300"
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FooterManagement; 
import { FooterContent } from "@/types/footer";

// Mock data for footer content
const mockFooterContent: FooterContent = {
  copyright: "© 2024 Shekhar Sailesh Decoration. All rights reserved.",
  address: "123 Main Street, City, State, Country",
  phone: "+91 1234567890",
  email: "contact@shekharsailesh.com",
  whatsapp: "+91 1234567890"
};

export const fetchFooterContent = async (): Promise<FooterContent> => {
  // In a real application, this would fetch from an API
  return mockFooterContent;
};

export const updateFooterContent = async (content: FooterContent): Promise<boolean> => {
  // In a real application, this would update the API
  console.log("Updating footer content:", content);
  return true;
}; 
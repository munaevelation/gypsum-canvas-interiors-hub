
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, Upload, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Create a URL for preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
        Product Image
      </Label>
      
      {preview ? (
        <div className="relative rounded-md overflow-hidden border border-gray-200 w-full aspect-video bg-gray-50">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-contain"
          />
          <Button 
            variant="destructive" 
            size="sm" 
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-8 transition-colors duration-200 ${
            isDragging ? 'border-[#9b87f5] bg-purple-50' : 'border-gray-300 hover:border-[#9b87f5]'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center text-center cursor-pointer">
            <Image className="w-12 h-12 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or WEBP (Max 10MB)</p>
          </div>
          <input
            id="image-upload"
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

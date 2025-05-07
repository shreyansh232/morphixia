// VideoUploadCard.tsx
"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import ParametersCard from "./ParametersCard";

interface VideoUploadCardProps {
  file: File | null;
  setFile: (file: File | null) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  negativePrompt: string;
  setNegativePrompt: (negativePrompt: string) => void;
  strength: number;
  setStrength: (strength: number) => void;
  steps: number;
  setSteps: (steps: number) => void;
  seed: number;
  setSeed: (seed: number) => void;
  upscale: boolean;
  setUpscale: (upscale: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const VideoUploadCard: React.FC<VideoUploadCardProps> = ({
  file,
  setFile,
  handleFileChange,
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  strength,
  setStrength,
  steps,
  setSteps,
  seed,
  setSeed,
  upscale,
  setUpscale,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Tabs defaultValue="upload" className="mb-6">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="upload">Upload Video</TabsTrigger>
        <TabsTrigger value="parameters">Parameters</TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="pt-4">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => document.getElementById("video-upload")?.click()}
        >
          <Upload size={36} className="text-gray-400 mb-2" />
          <p className="text-gray-500 mb-2">{file ? file.name : "Upload your video"}</p>
          <p className="text-xs text-gray-400 mb-4">MP4, MOV, AVI, WEBM (max 100MB)</p>
          <Button variant="outline" className="text-gray-600">
            Browse Files
          </Button>
          <input
            id="video-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
          />
        </div>
      </TabsContent>

      <TabsContent value="parameters" className="space-y-4 pt-4">
        <ParametersCard
          prompt={prompt}
          setPrompt={setPrompt}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
          strength={strength}
          setStrength={setStrength}
          steps={steps}
          setSteps={setSteps}
          seed={seed}
          setSeed={setSeed}
          upscale={upscale}
          setUpscale={setUpscale}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </TabsContent>
    </Tabs>
  );
};

export default VideoUploadCard;
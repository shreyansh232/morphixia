"use client";

import { useState } from "react";
import { History, Sparkles } from "lucide-react";
import { Card } from "components/ui/card";
import { Button } from "components/ui/button";

import VideoUploadCard from "./components/VideoUploadCard";
import VideoPreviewCard from "./components/VideoPreviewCard";
import HistoryDialog from "./components/HistoryDialog";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transformedVideo, setTransformedVideo] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Transformation parameters
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [strength, setStrength] = useState(0.75);
  const [steps, setSteps] = useState(30);
  const [seed, setSeed] = useState(-1);
  const [upscale, setUpscale] = useState(false);

  // Mock history data - in a real app, this would come from your API
  const mockHistory = [
    {
      id: "1",
      sourceVideoName: "beach_sunset.mp4",
      sourceVideoUrl: "https://example.com/videos/beach_sunset.mp4",
      transformedVideoUrl:
        "https://example.com/videos/transformed_beach_sunset.mp4",
      parameters: {
        prompt: "Cinematic sunset with golden hour lighting",
        strength: 0.8,
        steps: 30,
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      sourceVideoName: "city_walk.mp4",
      sourceVideoUrl: "https://example.com/videos/city_walk.mp4",
      transformedVideoUrl:
        "https://example.com/videos/transformed_city_walk.mp4",
      parameters: {
        prompt: "Cyberpunk neon city with rain",
        strength: 0.7,
        steps: 25,
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file type
      const validTypes = [
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
        "video/webm",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Please select a valid video file (MP4, MOV, AVI, WEBM)");
        return;
      }

      // Validate file size (limit to 100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        alert("File size exceeds 100MB limit");
        return;
      }

      setFile(selectedFile);
      setTransformedVideo(null);
    }
  };

  const handleTransform = async () => {
    if (!file) {
      alert("Please upload a video first");
      return;
    }

    if (!prompt.trim()) {
      alert("Please enter a prompt for the transformation");
      return;
    }

    setIsProcessing(true);

    // In a real implementation, you would:
    // 1. Upload the file to Cloudinary
    // 2. Call your API to start the Fal API job
    // 3. Handle the response

    try {
      // Mock API call with timeout to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock successful response
      setTransformedVideo("https://example.com/transformed-video.mp4");
    } catch (error) {
      console.error("Error transforming video:", error);
      alert("An error occurred during video transformation");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTransformedVideo(null);
    setPrompt("");
    setNegativePrompt("");
    setStrength(0.75);
    setSteps(30);
    setSeed(-1);
    setUpscale(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-full">
        <h1 className="text-2xl font-bold mb-8 text-left  border-b border-gray-100 py-3">Morphixia</h1>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">AI Video Transformation</h1>
          <p className="text-xl text-gray-600">
            Transform your videos with advanced AI models
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column - Upload Controls */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Video</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHistoryOpen(true)}
                className="flex items-center gap-1"
              >
                <History size={16} />
                <span>History</span>
              </Button>
            </div>

            <VideoUploadCard
              file={file}
              setFile={setFile}
              handleFileChange={handleFileChange}
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

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleTransform}
                disabled={!file || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Transform Video
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                disabled={isProcessing}
              >
                Reset
              </Button>
            </div>
          </Card>

          {/* Right Column - Preview */}
          <Card className="p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Video Preview</h2>
            <VideoPreviewCard file={file} transformedVideo={transformedVideo} />
          </Card>
        </div>

        {/* History Dialog */}
        <HistoryDialog
          open={historyOpen}
          onOpenChange={setHistoryOpen}
          mockHistory={mockHistory}
        />
      </div>
    </div>
  );
}

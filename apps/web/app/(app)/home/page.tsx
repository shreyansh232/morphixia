"use client";

import { useState } from "react";
import { Upload, ChevronDown, Video, History, Download, Sparkles } from "lucide-react";
import { Card } from "components/ui/card";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Slider } from "components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Textarea } from "components/ui/textarea";
import { Switch } from "components/ui/switch";

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
      transformedVideoUrl: "https://example.com/videos/transformed_beach_sunset.mp4",
      parameters: {
        prompt: "Cinematic sunset with golden hour lighting",
        strength: 0.8,
        steps: 30
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      sourceVideoName: "city_walk.mp4",
      sourceVideoUrl: "https://example.com/videos/city_walk.mp4",
      transformedVideoUrl: "https://example.com/videos/transformed_city_walk.mp4",
      parameters: {
        prompt: "Cyberpunk neon city with rain",
        strength: 0.7,
        steps: 25
      },
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please select a valid video file (MP4, MOV, AVI, WEBM)');
        return;
      }
      
      // Validate file size (limit to 100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        alert('File size exceeds 100MB limit');
        return;
      }
      
      setFile(selectedFile);
      setTransformedVideo(null);
    }
  };

  const handleTransform = async () => {
    if (!file) {
      alert('Please upload a video first');
      return;
    }
    
    if (!prompt.trim()) {
      alert('Please enter a prompt for the transformation');
      return;
    }
    
    setIsProcessing(true);
    
    // In a real implementation, you would:
    // 1. Upload the file to Cloudinary
    // 2. Call your API to start the Fal API job
    // 3. Handle the response
    
    try {
      // Mock API call with timeout to simulate processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
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
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">AI Video Transformation</h1>
          <p className="text-xl text-gray-600">Transform your videos with advanced AI models</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <Tabs defaultValue="upload" className="mb-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="upload">Upload Video</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="pt-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => document.getElementById('video-upload')?.click()}
                >
                  <Upload size={36} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-2">
                    {file ? file.name : "Upload your video"}
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    MP4, MOV, AVI, WEBM (max 100MB)
                  </p>
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
                <div className="space-y-2">
                  <Label htmlFor="prompt">Transformation Prompt</Label>
                  <Textarea 
                    id="prompt" 
                    placeholder="Describe the style you want to apply to your video..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
                  <Textarea 
                    id="negative-prompt" 
                    placeholder="Elements to avoid in the transformation..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                  />
                </div>
                
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-between w-full"
                    >
                      <span>Advanced Settings</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="strength">Transformation Strength: {strength}</Label>
                      </div>
                      <Slider 
                        id="strength"
                        min={0.1} 
                        max={1} 
                        step={0.05} 
                        value={[strength]} 
                        onValueChange={(value) => setStrength(value[0] ?? strength)}
                      />
                      <p className="text-xs text-gray-500">
                        Higher values create more dramatic changes
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="steps">Diffusion Steps: {steps}</Label>
                      </div>
                      <Slider 
                        id="steps"
                        min={10} 
                        max={50} 
                        step={1} 
                        value={[steps]} 
                        onValueChange={(value) => setSteps(value[0] ?? steps)}
                      />
                      <p className="text-xs text-gray-500">
                        More steps generally produce higher quality results but take longer
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seed">Random Seed</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="seed"
                          type="number" 
                          value={seed} 
                          onChange={(e) => setSeed(parseInt(e.target.value) || -1)}
                          placeholder="-1 for random"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
                          className="whitespace-nowrap"
                        >
                          Generate
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Use the same seed to get reproducible results (-1 for random)
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="upscale" 
                        checked={upscale} 
                        onCheckedChange={setUpscale} 
                      />
                      <Label htmlFor="upscale">Upscale Result</Label>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleTransform}
                disabled={!file || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-gray-100 rounded-lg bg-gray-50 overflow-hidden">
              {transformedVideo ? (
                <div className="w-full h-full flex flex-col">
                  <div className="flex-1 relative">
                    <video
                      className="w-full h-full object-contain"
                      controls
                      src={transformedVideo}
                    />
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <Download size={16} />
                      Download Transformed Video
                    </Button>
                  </div>
                </div>
              ) : file ? (
                <div className="w-full h-full flex flex-col">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src={URL.createObjectURL(file)}
                  />
                  <div className="p-4 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
                    Source Video: {file.name}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <Video size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Ready to Transform Your Video
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Upload a video and set your transformation parameters
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* History Dialog */}
        <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Transformation History</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {mockHistory.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 bg-gray-100 rounded-md overflow-hidden">
                      <video 
                        className="w-full h-auto" 
                        controls 
                        src={item.transformedVideoUrl}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.sourceVideoName}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                      <div className="text-sm">
                        <p><span className="font-medium">Prompt:</span> {item.parameters.prompt}</p>
                        <p><span className="font-medium">Strength:</span> {item.parameters.strength}</p>
                        <p><span className="font-medium">Steps:</span> {item.parameters.steps}</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Download size={14} />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Upload, ChevronDown, Video } from "lucide-react";
import { Card } from "components/ui/card";
import { Button } from "components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "components/ui/collapsible";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [subtitlePosition, setSubtitlePosition] = useState("bottom");

  const handleFileChange = (e : any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">Transform your videos</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Upload Controls */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Video</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center justify-center">
              <Upload size={36} className="text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Upload files</p>
              <Button variant="outline" className="text-gray-600">
                Browse Files
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="video/*"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Subtitles Position
              </label>
              <Select
                value={subtitlePosition}
                onValueChange={setSubtitlePosition}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top (25%)</SelectItem>
                  <SelectItem value="middle">Middle (50%)</SelectItem>
                  <SelectItem value="bottom">Bottom (75%)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-2">
                Choose where to position the subtitles in the video
              </p>
            </div>

            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full mb-6"
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
              <CollapsibleContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Font Style
                    </label>
                    <Select defaultValue="arial">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Font Size
                    </label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Caption Style
                    </label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="shadow">With Shadow</SelectItem>
                        <SelectItem value="background">
                          With Background
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button className="w-full bg-indigo-400 hover:bg-indigo-500 text-white">
              <Video className="mr-2 h-4 w-4" /> Generate Captions
            </Button>
          </Card>

          {/* Right Column - Preview */}
          <Card className="p-6 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-gray-100 rounded-lg">
              {file ? (
                <video
                  className="max-w-full max-h-full"
                  controls
                  src={URL.createObjectURL(file)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <Video size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Ready to Create Your Video
                  </h3>
                  <p className="text-gray-500">
                    Enter details of the video you want to create
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Example Captions Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Example Video Captions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <Video size={36} className="text-gray-400" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">
                    Example Caption Style {item}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Professional captions with{" "}
                    {item === 1
                      ? "standard style"
                      : item === 2
                        ? "shadow effects"
                        : "background highlight"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-500">
              Our advanced AI accurately transcribes speech in multiple
              languages
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
            <p className="text-gray-500">
              Customize font, style, size, and position to match your video
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
            <p className="text-gray-500">
              Download as SRT, VTT or directly embed captions in your video
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

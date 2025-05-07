// VideoPreviewCard.tsx
"use client";

import { Download, Video } from "lucide-react";
import { Button } from "components/ui/button";

interface VideoPreviewCardProps {
  file: File | null;
  transformedVideo: string | null;
}

const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({ file, transformedVideo }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center border-2 border-gray-100 rounded-lg bg-gray-50 overflow-hidden">
      {transformedVideo ? (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 relative">
            <video className="w-full h-full object-contain" controls src={transformedVideo} />
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
          <video className="w-full h-full object-contain" controls src={URL.createObjectURL(file)} />
          <div className="p-4 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
            Source Video: {file.name}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Video size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ready to Transform Your Video</h3>
          <p className="text-gray-500 max-w-md">Upload a video and set your transformation parameters</p>
        </div>
      )}
    </div>
  );
};

export default VideoPreviewCard;
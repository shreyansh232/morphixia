// HistoryDialog.tsx
"use client";

import { Download } from "lucide-react";
import { Card } from "components/ui/card";
import { Button } from "components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/ui/dialog";

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mockHistory: {
    id: string;
    sourceVideoName: string;
    sourceVideoUrl: string;
    transformedVideoUrl: string;
    parameters: {
      prompt: string;
      strength: number;
      steps: number;
    };
    createdAt: string;
  }[];
}

const HistoryDialog: React.FC<HistoryDialogProps> = ({ open, onOpenChange, mockHistory }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transformation History</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {mockHistory.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3 bg-gray-100 rounded-md overflow-hidden">
                  <video className="w-full h-auto" controls src={item.transformedVideoUrl} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.sourceVideoName}</h3>
                  <p className="text-sm text-gray-500 mb-2">{new Date(item.createdAt).toLocaleString()}</p>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Prompt:</span> {item.parameters.prompt}
                    </p>
                    <p>
                      <span className="font-medium">Strength:</span> {item.parameters.strength}
                    </p>
                    <p>
                      <span className="font-medium">Steps:</span> {item.parameters.steps}
                    </p>
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
  );
};

export default HistoryDialog;
// ParametersCard.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { Slider } from "components/ui/slider";
import { Textarea } from "components/ui/textarea";
import { Switch } from "components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "components/ui/collapsible";
import { Input } from "components/ui/input";

interface ParametersCardProps {
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

const ParametersCard: React.FC<ParametersCardProps> = ({
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
    <>
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

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between w-full">
            <span>Advanced Settings</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
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
            <p className="text-xs text-gray-500">Higher values create more dramatic changes</p>
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
            <p className="text-xs text-gray-500">More steps generally produce higher quality results but take longer</p>
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
            <p className="text-xs text-gray-500">Use the same seed to get reproducible results (-1 for random)</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="upscale" checked={upscale} onCheckedChange={setUpscale} />
            <Label htmlFor="upscale">Upscale Result</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ParametersCard;
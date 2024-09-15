"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { submitGenReq } from "@/app/actions";
import Image from "next/image";

export default function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Calculate width and height based on aspect ratio
    try {
      const genUrl = await submitGenReq(prompt, aspectRatio);
      console.log("Generated image URL: ", genUrl);

      toast({
        title: "Success",
        description: "Image generated successfully",
      });

      setGeneratedImage(genUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (format: "jpg" | "png") => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `generated-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Image Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image description"
              required
            />
          </div>
          <div>
            <Label htmlFor="aspectRatio">Aspect Ratio</Label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger id="aspectRatio">
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="9:16">9:16</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="font-semibold shadow-lg"
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </Button>
        </form>
      </CardContent>
      {generatedImage && (
        <CardFooter className="flex flex-col items-center space-y-4">
          <Image
            src={generatedImage}
            alt="Generated"
            className="max-w-full h-auto"
            width={512}
            height={512}
          />
          <div className="flex space-x-2 [&>button]:font-semibold [&>button]:shadow-lg">
            <Button onClick={() => handleDownload("jpg")}>Download JPG</Button>
            <Button onClick={() => handleDownload("png")}>Download PNG</Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

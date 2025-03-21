import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Gift, Download, Share2, Palette, Image, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

interface BirthdayCardGeneratorProps {
  recipientName?: string;
  onGenerate?: (cardData: BirthdayCardData) => void;
}

interface BirthdayCardData {
  recipientName: string;
  message: string;
  template: string;
  color: string;
  backgroundImage?: string;
}

interface TemplateStyle {
  backgroundPosition: "center" | "left" | "right" | "top" | "bottom";
  backgroundSize: "cover" | "contain" | "auto";
  textAlign: "left" | "center" | "right";
  padding: string;
}

interface TemplateTextStyle {
  fontSize: string;
  fontWeight: string;
  textShadow: string;
}

interface Template {
  id: string;
  name: string;
  preview: string;
  style: TemplateStyle;
  textStyle: TemplateTextStyle;
}

const BirthdayCardGenerator = ({
  recipientName = "",
  onGenerate = () => { },
}: BirthdayCardGeneratorProps) => {
  const [cardData, setCardData] = useState<BirthdayCardData>({
    recipientName: recipientName,
    message: "Wishing you a fantastic birthday filled with joy and laughter!",
    template: "template1",
    color: "#FF5C8D",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const templates: Template[] = [
    {
      id: "template1",
      name: "Confetti Celebration",
      preview: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
      style: {
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "center",
        padding: "2rem",
      },
      textStyle: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      }
    },
    {
      id: "template2",
      name: "Balloon Party",
      preview: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80",
      style: {
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "left",
        padding: "3rem",
      },
      textStyle: {
        fontSize: "3rem",
        fontWeight: "800",
        textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
      }
    },
    {
      id: "template3",
      name: "Cake Delight",
      preview: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
      style: {
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "right",
        padding: "2.5rem",
      },
      textStyle: {
        fontSize: "2.8rem",
        fontWeight: "700",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      }
    },
    {
      id: "template4",
      name: "Birthday Wishes",
      preview: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80",
      style: {
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "center",
        padding: "2rem",
      },
      textStyle: {
        fontSize: "3.2rem",
        fontWeight: "900",
        textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
      }
    },
    // {
    //   id: "template5",
    //   name: "Party Time",
    //   preview: "https://images.unsplash.com/photo-1511795409834-432f7d1fdda5?w=400&q=80",
    //   style: {
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     textAlign: "left",
    //     padding: "2.5rem",
    //   },
    //   textStyle: {
    //     fontSize: "2.6rem",
    //     fontWeight: "700",
    //     textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    //   }
    // },
    {
      id: "template6",
      name: "Sweet Celebration",
      preview: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80",
      style: {
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "right",
        padding: "3rem",
      },
      textStyle: {
        fontSize: "2.9rem",
        fontWeight: "800",
        textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
      }
    }
  ];

  const colorSchemes = [
    { id: "pink", color: "#FF5C8D", name: "Festive Pink" },
    { id: "blue", color: "#5C9DFF", name: "Celebration Blue" },
    { id: "purple", color: "#9D5CFF", name: "Party Purple" },
    { id: "green", color: "#5CFF9D", name: "Joyful Green" },
  ];

  const handleInputChange = (key: keyof BirthdayCardData, value: string) => {
    setCardData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenerate = () => {
    onGenerate(cardData);
    setPreviewMode(true);
  };

  const handleShare = async () => {
    try {
      const cardElement = document.querySelector('.card-preview');
      if (!cardElement) return;

      const canvas = await html2canvas(cardElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      const file = new File([blob], 'birthday-card.png', { type: 'image/png' });

      if (navigator.share) {
        await navigator.share({
          title: 'Birthday Card',
          text: `Birthday card for ${cardData.recipientName}`,
          files: [file],
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = shareUrl;
        link.download = 'birthday-card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Sharing failed",
        description: "Could not share the birthday card. Please try downloading it instead.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async () => {
    try {
      const cardElement = document.querySelector('.card-preview');
      if (!cardElement) return;

      const canvas = await html2canvas(cardElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `birthday-card-${cardData.recipientName || 'generated'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download started",
        description: "Your birthday card is being downloaded.",
      });
    } catch (error) {
      console.error('Error downloading:', error);
      toast({
        title: "Download failed",
        description: "Could not download the birthday card. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
        <CardTitle className="text-xl font-bold flex items-center">
          <Gift className="h-5 w-5 mr-2 text-pink-500" />
          Birthday Card Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Editor */}
          <div className={`space-y-6 ${previewMode ? "hidden md:block" : ""}`}>
            <div className="space-y-4">
              <Label htmlFor="recipient">Recipient Name</Label>
              <Input
                id="recipient"
                value={cardData.recipientName}
                onChange={(e) =>
                  handleInputChange("recipientName", e.target.value)
                }
                placeholder="Enter recipient's name"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="message">Birthday Message</Label>
              <Textarea
                id="message"
                value={cardData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Write your birthday message"
                rows={4}
              />
            </div>

            <Tabs defaultValue="templates" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="templates" className="text-xs">
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="text-xs">
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="background" className="text-xs">
                    Background
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="templates" className="pt-4">
                  <div className="grid grid-cols-3 gap-3">
                    {templates.map((template) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${cardData.template === template.id ? "border-pink-500" : "border-transparent"}`}
                        onClick={() => handleInputChange("template", template.id)}
                      >
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition-all">
                          <p className="text-white text-xs font-medium text-center px-2">
                            {template.name}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Palette className="h-5 w-5 text-gray-500" />
                      <Label>Select Color Scheme</Label>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {colorSchemes.map((scheme) => (
                        <motion.div
                          key={scheme.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`h-12 rounded-md cursor-pointer border-2 ${cardData.color === scheme.color ? "border-gray-800" : "border-transparent"}`}
                          style={{ backgroundColor: scheme.color }}
                          onClick={() => handleInputChange("color", scheme.color)}
                        >
                          <div className="h-full flex items-end justify-center pb-1">
                            <p className="text-white text-xs font-medium text-center">
                              {scheme.name}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                      <Label htmlFor="custom-color">Custom Color:</Label>
                      <Input
                        id="custom-color"
                        type="color"
                        value={cardData.color}
                        onChange={(e) =>
                          handleInputChange("color", e.target.value)
                        }
                        className="w-16 h-8 p-0"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="background" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Image className="h-5 w-5 text-gray-500" />
                      <Label>Background Image URL</Label>
                    </div>
                    <Input
                      value={cardData.backgroundImage || ""}
                      onChange={(e) =>
                        handleInputChange("backgroundImage", e.target.value)
                      }
                      placeholder="Enter image URL"
                    />
                    <p className="text-xs text-gray-500">
                      Enter a URL for a custom background image, or leave empty
                      for a solid color background.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="pt-4">
                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Birthday Card
                </Button>
              </div>
          </div>

          {/* Card Preview */}
          <div className={previewMode ? "block" : "hidden md:block"}>
            <div className={`${previewMode ? "block" : "hidden md:block"}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg card-preview"
                style={{
                  backgroundColor: cardData.color,
                  backgroundImage: cardData.backgroundImage
                    ? `url(${cardData.backgroundImage})`
                    : `url(${templates.find(t => t.id === cardData.template)?.preview})`,
                  ...templates.find(t => t.id === cardData.template)?.style
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-between p-6">
                  <div className="text-center mt-8">
                    <motion.h2
                      className="text-white font-bold mb-2"
                      style={templates.find(t => t.id === cardData.template)?.textStyle}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Happy Birthday!
                    </motion.h2>
                    {cardData.recipientName && (
                      <motion.h3
                        className="text-white text-xl"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {cardData.recipientName}
                      </motion.h3>
                    )}
                  </div>

                  <motion.div
                    className="bg-white/90 p-4 rounded-lg mt-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <p className="text-gray-800 text-center">
                      {cardData.message}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {previewMode && (
                <div className="flex justify-center space-x-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setPreviewMode(false)}
                    className="flex-1"
                  >
                    Edit Card
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleDownload}
                    className="flex-1 bg-pink-500 hover:bg-pink-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthdayCardGenerator;
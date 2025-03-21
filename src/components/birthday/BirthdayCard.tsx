import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import BirthdayCardGenerator from "./BirthdayCardGenerator";
import { Button } from "@/components/ui/button";
import { Gift, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface BirthdayCardProps {
  name: string;
  birthdate: Date;
  isTodayBirthday: boolean;
  avatarUrl?: string;
  age: number;
}

const BirthdayCard = ({
  name,
  birthdate,
  isTodayBirthday,
  avatarUrl,
  age,
}: BirthdayCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleGenerate = () => {
    setIsGenerating(true);
  };

  return (
    <Card
      className={`relative p-3 sm:p-4 transition-colors ${
        isTodayBirthday
          ? "border-pink-500 dark:border-pink-400 bg-pink-50 dark:bg-pink-950/20"
          : "hover:bg-muted/50 dark:hover:bg-muted/20"
      }`}
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-primary/20 dark:ring-primary/40">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-sm sm:text-base">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground dark:text-foreground truncate">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {format(birthdate, "MMMM d, yyyy")}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">Age: {age}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-primary/10 dark:hover:bg-primary/20"
            >
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] p-0 gap-0">
            <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b dark:border-border">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg sm:text-xl font-semibold">
                  Generate Birthday Card for {name}
                </DialogTitle>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-muted dark:hover:bg-muted/50"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
            <div className="p-4 sm:p-6">
              <BirthdayCardGenerator
                recipientName={name}
                onGenerate={handleGenerate}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {isTodayBirthday && (
        <div className="absolute -top-2 -right-2 bg-pink-500 dark:bg-pink-400 text-white text-xs px-2 py-1 rounded-full">
          Today!
        </div>
      )}
    </Card>
  );
};

export default BirthdayCard;

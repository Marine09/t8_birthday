import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Cake, Gift, Calendar } from "lucide-react";
import { format } from "date-fns";

interface BirthdayCardProps {
  name: string;
  birthdate: Date;
  age: number;
  avatarUrl?: string;
  isTodayBirthday?: boolean;
}

const BirthdayCard = ({ name, birthdate, age, avatarUrl, isTodayBirthday }: BirthdayCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth()
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className={`h-full ${isTodayBirthday ? "border-pink-500 dark:border-pink-400 border-2" : ""}`}>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-20 w-20">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : (
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">{name}</h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
                <Calendar className="h-4 w-4" />
                <span>{format(birthdate, "MMMM d")}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              {isToday(birthdate) && (
                <div className="flex items-center gap-1 text-green-500 dark:text-green-400">
                  <Gift className="h-4 w-4" />
                  <span>Today!</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BirthdayCard;

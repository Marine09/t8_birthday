import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import { Cake, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Birthday {
  id: string;
  name: string;
  birthdate: Date;
  avatarUrl?: string;
  age: number;
}

interface BirthdayCalendarProps {
  birthdays: Birthday[];
}

const BirthdayCalendar = ({
  birthdays,
}: BirthdayCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // Get all dates with birthdays for the current month
  const birthdayDates = birthdays.reduce<Record<string, string[]>>(
    (acc, birthday) => {
      // Create a date for this year with the same month and day
      const birthdayDate = new Date(
        date.getFullYear(),
        birthday.birthdate.getMonth(),
        birthday.birthdate.getDate()
      );

      const dateKey = format(birthdayDate, "yyyy-MM-dd");

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(birthday.name);
      return acc;
    },
    {}
  );

  const handlePreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const toggleView = () => {
    setView(view === "calendar" ? "list" : "calendar");
  };

  // Get birthdays for the current month
  const currentMonthBirthdays = birthdays
    .filter((birthday) => birthday.birthdate.getMonth() === date.getMonth())
    .sort((a, b) => a.birthdate.getDate() - b.birthdate.getDate());

  // Create a function to check if a date has birthdays
  const hasBirthday = (date: Date) => {
    return Object.keys(birthdayDates).some((dateStr) => {
      const birthdayDate = new Date(dateStr);
      return isSameDay(date, birthdayDate);
    });
  };

  // Create a function to get birthday names for a date
  const getBirthdayNames = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return birthdayDates[dateStr] || [];
  };

  return (
    <Card className="w-full bg-card dark:bg-card/50 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center text-foreground dark:text-foreground">
            <Cake className="h-5 w-5 mr-2 text-pink-500 dark:text-pink-400" />
            Birthday Calendar
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleView}
              className="bg-background hover:bg-muted dark:bg-background/50 dark:hover:bg-muted/50"
            >
              {view === "calendar" ? "List View" : "Calendar View"}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousMonth}
            className="hover:bg-purple-200 dark:hover:bg-purple-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium text-foreground dark:text-foreground">{format(date, "MMMM yyyy")}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            className="hover:bg-purple-200 dark:hover:bg-purple-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {view === "calendar" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border dark:border-border"
              modifiers={{
                birthday: (date) => hasBirthday(date),
                today: (date) => isSameDay(date, new Date()),
              }}
              modifiersStyles={{
                birthday: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(236, 72, 153, 0.1)",
                  color: "#be185d",
                  borderRadius: "9999px",
                },
                today: {
                  border: "2px solid #be185d",
                },
              }}
              components={{
                DayContent: ({ date }) => {
                  const names = getBirthdayNames(date);
                  return (
                    <div className="relative">
                      <span>{format(date, "d")}</span>
                      {names.length > 0 && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-1 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  );
                },
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {currentMonthBirthdays.length > 0 ? (
              currentMonthBirthdays.map((birthday) => (
                <motion.div
                  key={birthday.id}
                  className="flex items-center p-3 rounded-lg hover:bg-muted dark:hover:bg-muted/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full mr-3">
                    <Cake className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground dark:text-foreground">{birthday.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(birthday.birthdate, "MMMM d")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Age: {birthday.age}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No birthdays this month
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default BirthdayCalendar;

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Cake, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BirthdayCalendarProps {
  birthdays?: Array<{
    id: string;
    name: string;
    birthdate: Date;
  }>;
}

const BirthdayCalendar = ({
  birthdays = [
    {
      id: "1",
      name: "Emma Johnson",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ),
    },
    {
      id: "2",
      name: "Michael Chen",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 5,
      ),
    },
    {
      id: "3",
      name: "Sophia Rodriguez",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 12,
      ),
    },
  ],
}: BirthdayCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // Get all dates with birthdays for the current month
  const birthdayDates = birthdays.reduce<Record<string, string[]>>(
    (acc, birthday) => {
      const birthdayDate = new Date(
        date.getFullYear(),
        birthday.birthdate.getMonth(),
        birthday.birthdate.getDate(),
      );

      const dateKey = format(birthdayDate, "yyyy-MM-dd");

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(birthday.name);
      return acc;
    },
    {},
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

  return (
    <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center">
            <Cake className="h-5 w-5 mr-2 text-pink-500" />
            Birthday Calendar
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleView}
              className="bg-white hover:bg-gray-100"
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
            className="hover:bg-purple-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium">{format(date, "MMMM yyyy")}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            className="hover:bg-purple-200"
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
              className="rounded-md border"
              modifiers={{
                birthday: Object.keys(birthdayDates).map(
                  (dateStr) => new Date(dateStr),
                ),
              }}
              modifiersStyles={{
                birthday: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(236, 72, 153, 0.1)",
                  color: "#be185d",
                  borderRadius: "9999px",
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
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-pink-100 p-2 rounded-full mr-3">
                    <Cake className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium">{birthday.name}</p>
                    <p className="text-sm text-gray-500">
                      {format(birthday.birthdate, "MMMM d")}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
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

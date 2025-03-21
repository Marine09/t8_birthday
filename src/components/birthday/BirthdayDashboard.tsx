import React, { useState, useEffect } from "react";
import BirthdayCardGenerator from "./BirthdayCardGenerator";
import BirthdayCalendar from "./BirthdayCalendar";
import BirthdayCardGrid from "./BirthdayCardGrid";
import MonthSelector from "./MonthSelector";
import NotificationSettings from "./NotificationSettings";
import ThemeToggle from "./ThemeToggle";
import CountdownTimer from "./CountdownTimer";
import ConfettiAnimation from "./ConfettiAnimation";
import { formatBirthdays, getUpcomingBirthdays } from "@/data/birthdays";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Calendar, Settings } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const BirthdayDashboard = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [showConfetti, setShowConfetti] = useState(false);
  const [birthdays, setBirthdays] = useState(formatBirthdays());
  const [upcomingBirthday, setUpcomingBirthday] = useState(getUpcomingBirthdays(1)[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [viewPreference, setViewPreference] = useState<"card" | "list" | "calendar">("card");

  // Update upcoming birthday when selected month changes
  useEffect(() => {
    const upcoming = getUpcomingBirthdays(1)[0];
    setUpcomingBirthday(upcoming);
  }, [selectedMonth]);

  const handleCardGenerate = (cardData: any) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    toast({
      title: "Card Generated!",
      description: "Your birthday card has been created successfully.",
    });
  };

  const handleSettingsSave = (settings: any) => {
    setViewPreference(settings.viewPreference);
    toast({
      title: "Settings Updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  // Filter birthdays for the selected month
  const filteredBirthdays = birthdays.filter(
    birthday => birthday.birthdate.getMonth() === selectedMonth
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Toaster />
      <header className="border-b dark:border-border">
        <div className="container mx-auto px-4 py-4">
          <motion.div 
            className="flex justify-between items-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 dark:from-primary-foreground dark:to-purple-400"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Birthday Celebration Hub
            </motion.h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-muted dark:hover:bg-muted/50 transition-colors"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence>
          {showSettings ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <NotificationSettings onSave={handleSettingsSave} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <MonthSelector
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
              />

              {upcomingBirthday && (
                <div className="bg-card dark:bg-card/50 p-6 rounded-lg shadow-lg dark:shadow-none">
                  <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-foreground">Next Birthday</h2>
                  <CountdownTimer 
                    nextBirthdayDate={upcomingBirthday.birthdate}
                    nextBirthdayPerson={upcomingBirthday.name}
                  />
                </div>
              )}

              {viewPreference === "card" && (
                <BirthdayCardGrid birthdays={filteredBirthdays} />
              )}
              {viewPreference === "calendar" && (
                <BirthdayCalendar birthdays={filteredBirthdays} />
              )}
              {viewPreference === "list" && (
                <div className="space-y-4">
                  {filteredBirthdays.map((birthday) => (
                    <div
                      key={birthday.id}
                      className="bg-card dark:bg-card/50 p-4 rounded-lg shadow-md dark:shadow-none flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-foreground dark:text-foreground">{birthday.name}</h3>
                        <p className="text-muted-foreground">
                          {birthday.birthdate.toLocaleDateString()}
                        </p>
                      </div>
                      <BirthdayCardGenerator
                        recipientName={birthday.name}
                        onGenerate={handleCardGenerate}
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {showConfetti && <ConfettiAnimation />}
    </div>
  );
};

export default BirthdayDashboard;

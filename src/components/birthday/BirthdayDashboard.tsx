import React, { useState, useEffect } from "react";
import BirthdayCardGenerator from "./BirthdayCardGenerator";
import BirthdayCalendar from "./BirthdayCalendar";
import BirthdayCardGrid from "./BirthdayCardGrid";
import MonthSelector from "./MonthSelector";
import NotificationSettings from "./NotificationSettings";
import ThemeToggle from "./ThemeToggle";
import CountdownTimer from "./CountdownTimer";
import ConfettiAnimation from "./ConfettiAnimation";
import BirthdayStats from "./BirthdayStats";
import BirthdayCard from "./BirthdayCard";
import { formatBirthdays, getUpcomingBirthdays } from "@/data/birthdays";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Calendar, Settings, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const BirthdayDashboard = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [birthdays, setBirthdays] = useState(formatBirthdays());
  const [upcomingBirthday, setUpcomingBirthday] = useState(
    getUpcomingBirthdays(1)[0],
  );
  const [showSettings, setShowSettings] = useState(false);
  const [viewPreference, setViewPreference] = useState<
    "card" | "list" | "calendar"
  >("card");

  // Check for today's birthdays and trigger confetti automatically
  useEffect(() => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const hasBirthdayToday = birthdays.some(
      (birthday) =>
        birthday.birthdate.getMonth() === todayMonth &&
        birthday.birthdate.getDate() === todayDate,
    );

    if (hasBirthdayToday) {
      setShowConfetti(true);
      toast({
        title: "🎉 Birthday Today!",
        description:
          "Someone has a birthday today! Check it out and celebrate!",
      });

      // Hide confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [birthdays, toast]);

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
    (birthday) => birthday.birthdate.getMonth() === selectedMonth,
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Toaster />
      <header className="border-b dark:border-border sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 dark:from-primary-foreground dark:via-purple-400 dark:to-pink-400 text-center sm:text-left"
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

      <div className="flex relative">
        <main className="container mx-auto px-4 py-4 sm:py-8 flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-8"
          >
            <MonthSelector
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {upcomingBirthday && (
                <div className="bg-card dark:bg-card/50 p-4 sm:p-6 rounded-lg shadow-lg dark:shadow-none">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground dark:text-foreground">
                    Next Birthday
                  </h2>
                  <CountdownTimer
                    nextBirthdayDate={upcomingBirthday.birthdate}
                    nextBirthdayPerson={upcomingBirthday.name}
                  />
                </div>
              )}

              <BirthdayStats birthdays={birthdays} />
            </div>

            {viewPreference === "card" && (
              <BirthdayCardGrid 
                birthdays={filteredBirthdays} 
                selectedMonth={selectedMonth}
              />
            )}
            {viewPreference === "calendar" && (
              <div className="space-y-4 sm:space-y-6">
                <BirthdayCalendar 
                  birthdays={filteredBirthdays}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredBirthdays.map((birthday) => (
                    <div key={birthday.id} className="h-52">
                      <BirthdayCard
                        name={birthday.name}
                        birthdate={birthday.birthdate}
                        isTodayBirthday={
                          birthday.birthdate.getMonth() === new Date().getMonth() &&
                          birthday.birthdate.getDate() === new Date().getDate()
                        }
                        avatarUrl={birthday.avatarUrl}
                        age={birthday.age}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {viewPreference === "list" && (
              <div className="space-y-4">
                {filteredBirthdays.map((birthday) => (
                  <div
                    key={birthday.id}
                    className="bg-card dark:bg-card/50 p-4 rounded-lg shadow-md dark:shadow-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground dark:text-foreground">
                        {birthday.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {birthday.birthdate.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Age: {birthday.age}
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
        </main>

        <AnimatePresence>
          {showSettings && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setShowSettings(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l dark:border-border shadow-lg z-50 overflow-y-auto"
              >
                <div className="p-4 border-b dark:border-border flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Settings</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 rounded-full hover:bg-muted dark:hover:bg-muted/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <NotificationSettings onSave={handleSettingsSave} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {showConfetti && <ConfettiAnimation />}
    </div>
  );
};

export default BirthdayDashboard;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Cake, Clock, Calendar } from "lucide-react";

interface CountdownTimerProps {
  nextBirthdayDate?: Date;
  nextBirthdayPerson?: string;
}

const CountdownTimer = ({
  nextBirthdayDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 3,
  ),
  nextBirthdayPerson = "Sarah Johnson",
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = nextBirthdayDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextBirthdayDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg rounded-xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2 text-2xl font-bold text-purple-700">
          <Cake className="h-8 w-8 text-pink-500" />
          <h2>Next Birthday Countdown</h2>
        </div>

        <div className="flex items-center space-x-2 text-lg text-gray-700">
          <Calendar className="h-5 w-5 text-purple-500" />
          <p className="font-medium">
            {nextBirthdayPerson}'s Birthday on{" "}
            {nextBirthdayDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="flex flex-col items-center">
              <motion.div
                className="bg-white w-24 h-24 rounded-lg shadow-md flex items-center justify-center text-4xl font-bold text-purple-600 border-2 border-pink-200"
                initial={{ scale: 0.9 }}
                animate={{
                  scale: [0.9, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 0,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                {unit.value}
              </motion.div>
              <p className="mt-2 text-sm font-medium text-gray-600">
                {unit.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-4 text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <p>Counting down in real-time</p>
        </div>
      </div>
    </Card>
  );
};

export default CountdownTimer;

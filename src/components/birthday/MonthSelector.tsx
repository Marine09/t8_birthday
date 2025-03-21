import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

const MonthSelector = ({
  selectedMonth = new Date().getMonth(),
  onMonthChange = () => {},
}: MonthSelectorProps) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Filter by Month
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
        {months.map((month, index) => (
          <motion.div
            key={month}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedMonth === index ? "default" : "outline"}
              className={`w-full ${selectedMonth === index ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
              onClick={() => onMonthChange(index)}
            >
              {month.substring(0, 3)}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MonthSelector;

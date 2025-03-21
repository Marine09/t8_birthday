import React, { useState } from "react";
import BirthdayCard from "./BirthdayCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Birthday {
  id: string;
  name: string;
  birthdate: Date;
  avatarUrl?: string;
  age: number;
}

interface BirthdayCardGridProps {
  birthdays?: Birthday[];
  selectedMonth?: number | null;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  loading?: boolean;
}

const BirthdayCardGrid = ({
  birthdays = [
    {
      id: "1",
      name: "Emma Johnson",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ),
      age: 28,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma-123",
    },
    {
      id: "2",
      name: "Michael Chen",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 5,
      ),
      age: 34,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael-456",
    },
    {
      id: "3",
      name: "Sophia Rodriguez",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 12,
      ),
      age: 25,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia-789",
    },
    {
      id: "4",
      name: "James Wilson",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 18,
      ),
      age: 42,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James-101",
    },
    {
      id: "5",
      name: "Olivia Kim",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        3,
      ),
      age: 31,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia-202",
    },
    {
      id: "6",
      name: "Noah Patel",
      birthdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        10,
      ),
      age: 29,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah-303",
    },
  ],
  selectedMonth = null,
  onPageChange = () => {},
  currentPage = 1,
  totalPages = 3,
  loading = false,
}: BirthdayCardGridProps) => {
  const [sortOption, setSortOption] = useState<"date" | "name">("date");
  const [showTodayOnly, setShowTodayOnly] = useState(false);

  // Check if today is someone's birthday
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // Filter birthdays based on selected month and today-only filter
  const filteredBirthdays = birthdays.filter((birthday) => {
    const birthdayMonth = birthday.birthdate.getMonth();
    const birthdayDate = birthday.birthdate.getDate();

    const isToday = birthdayMonth === todayMonth && birthdayDate === todayDate;

    if (showTodayOnly) {
      return isToday;
    }

    if (selectedMonth !== null) {
      return birthdayMonth === selectedMonth;
    }

    return true;
  });

  // Sort birthdays based on selected option
  const sortedBirthdays = [...filteredBirthdays].sort((a, b) => {
    if (sortOption === "date") {
      // Sort by month and day
      const aMonth = a.birthdate.getMonth();
      const aDay = a.birthdate.getDate();
      const bMonth = b.birthdate.getMonth();
      const bDay = b.birthdate.getDate();

      if (aMonth !== bMonth) return aMonth - bMonth;
      return aDay - bDay;
    } else {
      // Sort by name
      return a.name.localeCompare(b.name);
    }
  });

  // Animation variants for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-4 sm:mb-0">
          {selectedMonth !== null
            ? `Birthdays in ${new Date(0, selectedMonth).toLocaleString("default", { month: "long" })}`
            : showTodayOnly
              ? "Today's Birthdays"
              : "Upcoming Birthdays"}
        </h2>

        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter & Sort</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Sort by</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sort-date"
                      checked={sortOption === "date"}
                      onCheckedChange={() => setSortOption("date")}
                    />
                    <Label htmlFor="sort-date">Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sort-name"
                      checked={sortOption === "name"}
                      onCheckedChange={() => setSortOption("name")}
                    />
                    <Label htmlFor="sort-name">Name</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Filter</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="today-only"
                      checked={showTodayOnly}
                      onCheckedChange={(checked) =>
                        setShowTodayOnly(checked === true)
                      }
                    />
                    <Label htmlFor="today-only">Today's birthdays only</Label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : sortedBirthdays.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="text-6xl mb-4">🎂</div>
          <p className="text-xl font-medium">No birthdays found</p>
          <p className="text-sm mt-2">
            {selectedMonth !== null
              ? `There are no birthdays in ${new Date(0, selectedMonth).toLocaleString("default", { month: "long" })}`
              : showTodayOnly
                ? "No birthdays today"
                : "No upcoming birthdays"}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedBirthdays.map((birthday) => {
            const isTodayBirthday =
              birthday.birthdate.getMonth() === todayMonth &&
              birthday.birthdate.getDate() === todayDate;

            return (
              <motion.div
                key={birthday.id}
                className="h-52"
                variants={itemVariants}
              >
                <BirthdayCard
                  name={birthday.name}
                  birthdate={birthday.birthdate}
                  isTodayBirthday={isTodayBirthday}
                  avatarUrl={birthday.avatarUrl}
                  age={birthday.age}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BirthdayCardGrid;

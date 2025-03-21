import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PieChart, Users, Calendar, Gift } from "lucide-react";
import { FormattedBirthday } from "@/data/birthdays";

interface BirthdayStatsProps {
  birthdays: FormattedBirthday[];
}

const BirthdayStats = ({ birthdays }: BirthdayStatsProps) => {
  const stats = useMemo(() => {
    // Count birthdays by month
    const byMonth: Record<number, number> = {};
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    let todayCount = 0;
    let thisMonthCount = 0;
    let nextMonthCount = 0;

    birthdays.forEach((birthday) => {
      const month = birthday.birthdate.getMonth();
      const date = birthday.birthdate.getDate();

      // Count by month
      byMonth[month] = (byMonth[month] || 0) + 1;

      // Count today's birthdays
      if (month === currentMonth && date === currentDate) {
        todayCount++;
      }

      // Count this month's birthdays
      if (month === currentMonth) {
        thisMonthCount++;
      }

      // Count next month's birthdays
      if (month === (currentMonth + 1) % 12) {
        nextMonthCount++;
      }
    });

    // Find month with most birthdays
    let maxMonth = 0;
    let maxCount = 0;

    Object.entries(byMonth).forEach(([month, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxMonth = parseInt(month);
      }
    });

    const monthNames = [
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

    return {
      total: birthdays.length,
      today: todayCount,
      thisMonth: thisMonthCount,
      nextMonth: nextMonthCount,
      popularMonth: monthNames[maxMonth],
      popularMonthCount: maxCount,
    };
  }, [birthdays]);

  const statItems = [
    {
      title: "Total Birthdays",
      value: stats.total,
      icon: <Users className="h-4 w-4 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Today's Birthdays",
      value: stats.today,
      icon: <Gift className="h-4 w-4 text-pink-500" />,
      color: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
      title: "This Month",
      value: stats.thisMonth,
      icon: <Calendar className="h-4 w-4 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Popular Month",
      value: stats.popularMonth,
      subtitle: `${stats.popularMonthCount} birthdays`,
      icon: <PieChart className="h-4 w-4 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900/30",
    },
  ];

  return (
    <Card className="w-full bg-card shadow-md dark:shadow-none rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <PieChart className="h-5 w-5 mr-2 text-purple-500" />
          Birthday Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={`${item.color} p-4 rounded-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center mb-2">
                <div className="mr-2">{item.icon}</div>
                <h3 className="text-sm font-medium text-foreground dark:text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-2xl font-bold text-foreground dark:text-foreground">
                {item.value}
              </p>
              {item.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.subtitle}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthdayStats;

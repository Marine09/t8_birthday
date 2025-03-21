import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Calendar,
  Gift,
  Bell,
  Sparkles,
  Cake,
  Users,
  Download,
  Share2,
} from "lucide-react";

const BirthdayFeatures = () => {
  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-blue-500" />,
      title: "Interactive Calendar",
      description:
        "View and navigate birthdays with our interactive calendar that highlights special dates.",
    },
    {
      icon: <Gift className="h-10 w-10 text-pink-500" />,
      title: "Birthday Cards",
      description:
        "Create personalized birthday cards with custom messages and beautiful templates.",
    },
    {
      icon: <Bell className="h-10 w-10 text-purple-500" />,
      title: "Notifications",
      description:
        "Never miss a birthday with customizable notification settings and reminders.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-yellow-500" />,
      title: "Celebrations",
      description:
        "Enjoy festive animations and confetti when it's someone's special day.",
    },
    {
      icon: <Cake className="h-10 w-10 text-green-500" />,
      title: "Birthday Countdown",
      description:
        "Watch the countdown to upcoming birthdays with our animated timer.",
    },
    {
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      title: "Birthday Profiles",
      description:
        "Manage birthday profiles with customizable avatars and personal details.",
    },
    {
      icon: <Download className="h-10 w-10 text-red-500" />,
      title: "Download Cards",
      description:
        "Save and download your created birthday cards to share with friends and family.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-teal-500" />,
      title: "Share Celebrations",
      description:
        "Share birthday celebrations on social media with just a few clicks.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Birthday Celebration Features
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover all the ways our Birthday Celebration Hub helps you remember
          and celebrate special days
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card
              className="h-full border-t-4 hover:shadow-lg transition-shadow duration-300"
              style={{
                borderTopColor: feature.icon.props.className.includes("pink")
                  ? "#ec4899"
                  : feature.icon.props.className.includes("blue")
                    ? "#3b82f6"
                    : feature.icon.props.className.includes("purple")
                      ? "#8b5cf6"
                      : feature.icon.props.className.includes("yellow")
                        ? "#eab308"
                        : feature.icon.props.className.includes("green")
                          ? "#22c55e"
                          : feature.icon.props.className.includes("indigo")
                            ? "#6366f1"
                            : feature.icon.props.className.includes("red")
                              ? "#ef4444"
                              : "#14b8a6", // teal default
              }}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-background">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BirthdayFeatures;

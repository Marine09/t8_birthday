import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme?: "light" | "dark";
  onToggle?: () => void;
}

const ThemeToggle = ({
  theme = "light",
  onToggle = () => {},
}: ThemeToggleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="rounded-full w-10 h-10 bg-background border-primary/20"
      >
        <motion.div
          animate={{ rotate: theme === "dark" ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-yellow-500" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-blue-500" />
          )}
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;

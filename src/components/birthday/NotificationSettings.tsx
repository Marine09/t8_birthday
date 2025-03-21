import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/components/ui/use-toast";

interface NotificationSettingsProps {
  onSave?: (settings: NotificationSettings) => void;
  defaultSettings?: NotificationSettings;
}

interface NotificationSettings {
  enabled: boolean;
  daysInAdvance: number;
  emailNotifications: boolean;
  browserNotifications: boolean;
  dailyDigest: boolean;
  notifyOnDay: boolean;
  theme: "light" | "dark" | "system";
  viewPreference: "card" | "list" | "calendar";
}

const STORAGE_KEY = "birthday-notification-settings";

const NotificationSettings = ({
  onSave = () => {},
  defaultSettings = {
    enabled: true,
    daysInAdvance: 3,
    emailNotifications: true,
    browserNotifications: true,
    dailyDigest: false,
    notifyOnDay: true,
    theme: "system" as const,
    viewPreference: "card" as const,
  },
}: NotificationSettingsProps) => {
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  const [activeTab, setActiveTab] = useState("notifications");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const handleSave = () => {
    onSave(settings);
    setTheme(settings.theme);
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateSettings = (key: keyof NotificationSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-card shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
        <CardTitle className="text-xl font-bold flex items-center">
          <Bell className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Settings & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="notifications" className="text-sm">
              Notification Settings
            </TabsTrigger>
            <TabsTrigger value="preferences" className="text-sm">
              Display Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about upcoming birthdays
                  </p>
                </div>
                <Switch
                  checked={settings.enabled}
                  onCheckedChange={(checked) =>
                    updateSettings("enabled", checked)
                  }
                />
              </div>

              {settings.enabled && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Days in Advance</Label>
                      <span className="text-sm font-medium">
                        {settings.daysInAdvance} days
                      </span>
                    </div>
                    <Slider
                      value={[settings.daysInAdvance]}
                      min={1}
                      max={14}
                      step={1}
                      onValueChange={(value) =>
                        updateSettings("daysInAdvance", value[0])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 day</span>
                      <span>7 days</span>
                      <span>14 days</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base">Notification Methods</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="email-notifications"
                          className="text-sm flex items-center cursor-pointer"
                        >
                          <Bell className="h-4 w-4 mr-2 text-indigo-500" />
                          Email Notifications
                        </Label>
                        <Switch
                          id="email-notifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) =>
                            updateSettings("emailNotifications", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="browser-notifications"
                          className="text-sm flex items-center cursor-pointer"
                        >
                          <Bell className="h-4 w-4 mr-2 text-indigo-500" />
                          Browser Notifications
                        </Label>
                        <Switch
                          id="browser-notifications"
                          checked={settings.browserNotifications}
                          onCheckedChange={(checked) =>
                            updateSettings("browserNotifications", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="daily-digest"
                          className="text-sm flex items-center cursor-pointer"
                        >
                          <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                          Daily Digest
                        </Label>
                        <Switch
                          id="daily-digest"
                          checked={settings.dailyDigest}
                          onCheckedChange={(checked) =>
                            updateSettings("dailyDigest", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="notify-on-day"
                          className="text-sm flex items-center cursor-pointer"
                        >
                          <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                          Notify on Birthday
                        </Label>
                        <Switch
                          id="notify-on-day"
                          checked={settings.notifyOnDay}
                          onCheckedChange={(checked) =>
                            updateSettings("notifyOnDay", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <Label className="text-base">Theme Preference</Label>
                <div className="flex space-x-2">
                  {["light", "dark", "system"].map((theme) => (
                    <Button
                      key={theme}
                      variant={settings.theme === theme ? "default" : "outline"}
                      className={`flex-1 capitalize ${settings.theme === theme ? "bg-primary" : ""}`}
                      onClick={() =>
                        updateSettings(
                          "theme",
                          theme as "light" | "dark" | "system",
                        )
                      }
                    >
                      {theme}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base">Default View</Label>
                <div className="flex space-x-2">
                  {["card", "list", "calendar"].map((view) => (
                    <Button
                      key={view}
                      variant={
                        settings.viewPreference === view ? "default" : "outline"
                      }
                      className={`flex-1 capitalize ${settings.viewPreference === view ? "bg-primary" : ""}`}
                      onClick={() =>
                        updateSettings(
                          "viewPreference",
                          view as "card" | "list" | "calendar",
                        )
                      }
                    >
                      {view}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;

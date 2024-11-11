"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock function to simulate scanning process
const scanPrivacyPolicy = async (policy: string) => {
  if (!policy) {
    alert("Please provide a privacy policy to scan.");
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate 3 second delay
  return (
    "This privacy policy outlines the data collection practices of the website. Key points include:\n\n" +
    "1. Personal information collected: email, name, and browsing history\n" +
    "2. Data used for: personalization and analytics\n" +
    "3. Third-party sharing: limited to essential service providers\n" +
    "4. User rights: can request data deletion and access\n" +
    "5. Security measures: encryption and regular audits in place\n" +
    "6. Policy updates: users notified via email of significant changes"
  );
};

export default function PrivacyPolicyScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualPolicy, setManualPolicy] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleScan = async (policy?: string) => {
    setIsScanning(true);
    setSummary(null);
    try {
      const result = await scanPrivacyPolicy(policy || manualPolicy);
      setSummary(result ?? "No policy summary available.");
    } catch (error) {
      console.error("Error scanning privacy policy:", error);
      setSummary("An error occurred while scanning the privacy policy.");
    } finally {
      setIsScanning(false);
    }
  };

  const toggleManualInput = () => {
    setShowManualInput(!showManualInput);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto py-8 transition-colors duration-200 dark:bg-gray-900">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Privacy Policy Scanner
              </CardTitle>
              <CardDescription>
                Scan and summarize the privacy policy of the current website
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
              {darkMode ? (
                <Moon className="h-4 w-4 text-gray-400" />
              ) : (
                <Sun className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleScan()}
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? "Scanning..." : "Scan Current Page Privacy Policy"}
            </Button>

            {isScanning && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}

            {summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" />
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {summary}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>
                This summary is AI-generated and may not be 100% accurate.
                Always read the full privacy policy for complete information.
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            <Button
              onClick={toggleManualInput}
              variant="outline"
              className="w-full"
            >
              {showManualInput ? "Hide Manual Input" : "Show Manual Input"}
              {showManualInput ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
            {showManualInput && (
              <div className="space-y-4 w-full">
                <Textarea
                  placeholder="Paste privacy policy text here..."
                  value={manualPolicy}
                  onChange={(e) => setManualPolicy(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button
                  onClick={() => handleScan(manualPolicy)}
                  disabled={isScanning || !manualPolicy}
                  className="w-full"
                >
                  {isScanning ? "Scanning..." : "Scan Manual Input"}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

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
import { AlertCircle, ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  PolicyScanAnalysis,
  PolicyScanAnalysisProps,
} from "./components/chart/chart";
import input from "./input";

const scanPrivacyPolicy = async (policy: string) => {
  if (!policy) {
    alert("Please provide a privacy policy to scan.");
    return null;
  }

  alert(policy);

  const maxTextLength = 30000;
  const truncatedPolicy =
    policy.length > maxTextLength ? policy.substring(0, maxTextLength) : policy;

  const url = "https://api.groq.com/openai/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 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",
  };

  const body = JSON.stringify({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "user",
        content: `${input} ${truncatedPolicy}`,
      },
    ],
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    const sco = JSON.parse(
      data.choices[0].message.content
    ) as PolicyScanAnalysisProps;

    return sco;
  } catch (error: any) {
    alert(`Error fetching data: ${error.message}`);
    return null;
  }
};

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [summary, setSummary] = useState<PolicyScanAnalysisProps | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualPolicy, setManualPolicy] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleScan = async (policyText: string | null = null) => {
    setIsScanning(true);
    setSummary(null);

    try {
      if (!policyText) {
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tabs.length > 0) {
          const activeTab = tabs[0];
          const [result] = await chrome.scripting.executeScript({
            target: { tabId: activeTab.id! },
            func: getPrivacyPolicyText,
          });
          policyText = result?.result || "Privacy policy not found.";
        } else {
          alert("No active tab found.");
          return;
        }
      }

      const summary = await scanPrivacyPolicy(policyText);
      setSummary(summary);
    } catch (error: any) {
      alert(`Error scanning privacy policy: ${error.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  function getPrivacyPolicyText(): string {
    const possibleSelectors = [
      "div",
      "p",
      "[class*='policy']",
      "[id*='policy']",
    ];
    let policyText = "";

    possibleSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        const htmlElement = element as HTMLElement;
        if (
          htmlElement.innerText?.toLowerCase().includes("policy") ||
          htmlElement.innerText?.toLowerCase().includes("privacy")
        ) {
          policyText += htmlElement.innerText + "\n";
        }
      });
    });

    return policyText || "Privacy policy not found on this page.";
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto p-1 transition-colors duration-200 dark:bg-gray-900">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Privacy Policy Scanner
              </CardTitle>
              <CardDescription>
                Scan and summarize the privacy policy of the current website
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={() => setDarkMode((prev) => !prev)}
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

            {summary && <PolicyScanAnalysis {...summary} />}

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
              onClick={() => setShowManualInput((prev) => !prev)}
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
              <div className="space-y-4">
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

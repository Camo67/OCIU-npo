import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Cpu, Database, Activity, Code, PenTool, Mic, Layout, BookOpen, Briefcase, Heart } from "lucide-react";
import { CommunityBuddy } from "@/components/buddy/CommunityBuddy";
import { StudyBuddy } from "@/components/study/StudyBuddy";
import { JobBoard } from "@/components/jobs/JobBoard";
import { CommunityGiving } from "@/components/giving/CommunityGiving";
import { ImpactReport } from "@/components/dashboard/ImpactReport";
import { MemberProfile } from "@/components/dashboard/MemberProfile";
import { WebsiteBuilder } from "@/components/builder/WebsiteBuilder";
import { AIBuilder } from "@/components/builder/AIBuilder";
import { CommunityFeed } from "@/components/dashboard/CommunityFeed";

export const Dashboard = () => {
  const [ramUsage, setRamUsage] = useState(45);
  const [agents, setAgents] = useState([
    { name: 'Code Generator', status: 'idle', model: 'Qwen3-8B', icon: Code },
    { name: 'Content Gen', status: 'idle', model: 'Qwen3-4B', icon: PenTool },
    { name: 'Voice Studio', status: 'idle', model: 'Qwen3-1.7B', icon: Mic },
    { name: 'Web Designer', status: 'idle', model: 'Qwen3-8B', icon: Layout },
  ]);

  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isPhoneRender, setIsPhoneRender] = useState(false);
  const [taskUpdates, setTaskUpdates] = useState<string[]>([]);

  // Use environment variable or relative URL for API endpoint
  const API_BASE_URL = import.meta.env.VITE_API_URL || window.location.origin;

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/api/events`);

    eventSource.onmessage = (event) => {
      setTaskUpdates((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      console.error("SSE Connection failed. Reconnecting...");
      eventSource.close();
      // Reconnect after 3s
      setTimeout(() => {
        // Re-run effect
      }, 3000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleRunAgent = async (agentName: string) => {
    const userId = "test@example.com"; // Simulated
    const endpoint = agentName === 'Code Generator' ? '/api/agent/code' : '/api/agent/content';
    const body = agentName === 'Code Generator' ? { prompt } : { topic: prompt };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify(body),
      });
      if (response.status === 402) {
        setOutput("Usage limit reached. Please Upgrade to Pro!");
        return;
      }
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error(error);
      setOutput("Error connecting to backend");
    }
  };

  return (
    <div className="p-8 bg-background min-h-screen text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">OCIU Community Platform</h1>
          <p className="text-sm text-muted-foreground">Our Community in Unity: Learn, Build, Earn.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant={ramUsage > 80 ? "destructive" : "secondary"} className="flex items-center gap-1">
            <Cpu size={14} />
            RAM: {ramUsage}%
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Database size={14} />
            Vault Synced
          </Badge>
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full text-xs">
            <span>Render on Phone</span>
            <input
              type="checkbox"
              checked={isPhoneRender}
              onChange={() => setIsPhoneRender(!isPhoneRender)}
              className="accent-primary"
            />
          </div>
          <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-8 text-xs">
            Upgrade to Pro
          </Button>
        </div>
      </div>

      <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500 rounded-full text-black">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Join the Pro Waitlist</h3>
            <p className="text-xs text-muted-foreground">Unlock priority rendering and custom voice slots.</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="text-xs border-yellow-500 hover:bg-yellow-500 hover:text-black">
          Apply Now
        </Button>
      </div>

      <div className="mb-8">
        <ImpactReport />
      </div>

      <div className="mb-8">
        <CommunityBuddy />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {agents.map((agent) => (
          <Card key={agent.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {agent.name}
              </CardTitle>
              <agent.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.model}</div>
              <p className="text-xs text-muted-foreground capitalize">
                Status: {agent.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          <MemberProfile />
          <AIBuilder />
          <StudyBuddy />
          <JobBoard />
        </div>
        <div className="space-y-8">
          <CommunityGiving />
          <WebsiteBuilder />
          <CommunityFeed />
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Donor Buddy Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-red-500/5 rounded border border-red-500/20 text-xs italic">
                "3 local businesses in your area have CSR programs that match our current learning needs."
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Task Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Prompt</label>
              <Textarea
                placeholder="Enter instructions for the agent..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => handleRunAgent('Code Generator')}>
                <Code className="mr-2 h-4 w-4" /> AI Builder
              </Button>
              <Button variant="outline" onClick={() => handleRunAgent('StudyBuddy')}>
                <BookOpen className="mr-2 h-4 w-4" /> StudyBuddy
              </Button>
              <Button variant="outline" onClick={() => handleRunAgent('Real Jobs')}>
                <Briefcase className="mr-2 h-4 w-4" /> Real Jobs
              </Button>
              <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-500" onClick={() => handleRunAgent('Donor Buddy')}>
                <Heart className="mr-2 h-4 w-4" /> Donor Buddy
              </Button>
            </div>
            {output && (
              <div className="mt-4 p-4 bg-muted rounded-md font-mono text-sm">
                <pre>{output}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">Live Updates</h3>
              <div className="max-h-32 overflow-y-auto space-y-1 text-xs font-mono bg-muted p-2 rounded">
                {taskUpdates.length === 0 && <span>Waiting for tasks...</span>}
                {taskUpdates.map((update, i) => (
                  <div key={i} className="border-l-2 border-primary pl-2">{update}</div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Load</span>
                  <span>12%</span>
                </div>
                <Progress value={12} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Task Queue</span>
                  <span>0 active</span>
                </div>
                <Progress value={0} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

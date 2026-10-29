import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, GraduationCap } from "lucide-react";

export const StudyBuddy = () => {
  const [progress, setProgress] = useState(35);

  const lessons = [
    { title: "Introduction to React", status: "completed" },
    { title: "Understanding Props & State", status: "in-progress" },
    { title: "Hooks Deep Dive", status: "locked" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-primary" />
          <CardTitle>StudyBuddy Learning Progress</CardTitle>
        </div>
        <Badge variant="secondary">{progress}% Overall</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={progress} className="h-2" />

        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div key={lesson.title} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {lesson.status === 'completed' ? (
                  <CheckCircle className="text-growth h-5 w-5" />
                ) : (
                  <BookOpen className="text-muted-foreground h-5 w-5" />
                )}
                <span className={`text-sm ${lesson.status === 'locked' ? 'text-muted-foreground' : ''}`}>
                  {lesson.title}
                </span>
              </div>
              <Button size="sm" variant={lesson.status === 'locked' ? 'ghost' : 'outline'} disabled={lesson.status === 'locked'}>
                {lesson.status === 'completed' ? 'Review' : lesson.status === 'locked' ? 'Locked' : 'Continue'}
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 p-4 rounded-lg">
          <p className="text-xs font-medium text-primary uppercase mb-1">Buddy Suggestion</p>
          <p className="text-sm">"Based on your projects, I recommend starting 'Responsive Design with Tailwind' next."</p>
        </div>
      </CardContent>
    </Card>
  );
};

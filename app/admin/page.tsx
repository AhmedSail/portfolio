"use client";

import {
  Users,
  Briefcase,
  MessageSquare,
  Eye,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the dashboard
const stats = [
  {
    title: "Total Views",
    value: "1,248",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Projects",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Briefcase,
  },
  {
    title: "Messages",
    value: "24",
    change: "+4",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Avg. Duration",
    value: "2m 14s",
    change: "-5%",
    trend: "down",
    icon: TrendingUp,
  },
];

const recentActivity = [
  { id: 1, user: "John Doe", action: "sent a message", time: "2 hours ago" },
  {
    id: 2,
    user: "Portfolio",
    action: "received new view from USA",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: "System",
    action: "Project 'AI Chat' was updated",
    time: "1 day ago",
  },
  { id: 4, user: "Jane Smith", action: "sent a message", time: "2 days ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-card/50 backdrop-blur-sm border-border"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs mt-1 ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                } flex items-center gap-1`}
              >
                {stat.change}
                <ArrowUpRight
                  className={`h-3 w-3 ${
                    stat.trend === "down" ? "rotate-90" : ""
                  }`}
                />
                <span className="text-muted-foreground ml-1">
                  from last month
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Placeholder for Chart */}
        <Card className="col-span-4 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Visitor Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-border/50">
            <div className="w-full h-full bg-secondary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simple SVG Chart Mockup */}
              <svg className="w-full h-full p-4" viewBox="0 0 400 200">
                <path
                  d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,50"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="animate-draw"
                />
                <rect
                  x="0"
                  y="0"
                  width="400"
                  height="200"
                  fill="url(#grad1)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop
                      offset="0%"
                      style={{
                        stopColor: "hsl(var(--primary))",
                        stopOpacity: 1,
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: "hsl(var(--primary))",
                        stopOpacity: 0,
                      }}
                    />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground font-mono text-sm">
                  Traffic Visualization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-bold">{item.user}</span>{" "}
                      {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Code2,
  Star,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Loader2,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Projects",
      value: data?.stats?.totalProjects || 0,
      change: "In Inventory",
      trend: "up",
      icon: Briefcase,
      color: "text-blue-500",
    },
    {
      title: "Total Skills",
      value: data?.stats?.totalSkills || 0,
      change: "Technologies",
      trend: "up",
      icon: Code2,
      color: "text-purple-500",
    },
    {
      title: "Featured",
      value: data?.stats?.featuredProjects || 0,
      change: "Shining",
      trend: "up",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      title: "Categories",
      value: data?.stats?.categoriesCount || 0,
      change: "Specialties",
      trend: "up",
      icon: Layers,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-blue-500 to-purple-400">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Welcome back, here's the current state of your digital portfolio.
          </p>
        </div>
        <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">
            Live Sync Alpha
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="group bg-card/40 backdrop-blur-xl border-white/5 hover:border-blue-500/30 transition-all duration-500 rounded-3xl overflow-hidden shadow-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                {stat.title}
              </CardTitle>
              <div
                className={`p-2 rounded-xl bg-blend-overlay bg-black/5 ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 leading-none">
                <span className={stat.color}>{stat.change}</span>
                <span>Active entries</span>
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        {/* Visualizer */}
        <Card className="lg:col-span-4 bg-card/40 backdrop-blur-xl border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardHeader className="p-8 border-b border-white/5">
            <CardTitle className="text-xl font-black flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              Project Dynamics
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] p-0 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
            <div className="w-full h-full p-8 flex flex-col justify-between">
              <div className="flex-1 flex items-end gap-2 pb-8">
                {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-xl bg-linear-to-t from-blue-600 to-blue-400/20 relative group/bar"
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-xl transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      style={{
                        height: `${h}%`,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity">
                      {h}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-tighter opacity-50">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
                <span>AUG</span>
                <span>SEP</span>
                <span>OCT</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3 bg-card/40 backdrop-blur-xl border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardHeader className="p-8 border-b border-white/5">
            <CardTitle className="text-xl font-black flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-purple-500" />
              </div>
              Recent Pulse
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {data?.recentActivity?.length > 0 ? (
                data.recentActivity.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 group/item"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover/item:scale-150 transition-transform" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold leading-none tracking-tight">
                        <span className="text-blue-400">{item.user}</span>{" "}
                        <span className="text-muted-foreground/80 font-medium">
                          {item.action.split("'")[0]}
                        </span>
                        {item.action.includes("'") && (
                          <span className="text-foreground">
                            '{item.action.split("'")[1]}'
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No recent activity found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

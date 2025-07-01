"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Calendar,
  Clock,
  SparklesIcon,
  Users,
  ShieldCheck,
  Languages,
  LightbulbIcon,
  StarIcon,
  MessageSquareIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Code2,
      title: "Real-time Coding",
      description:
        "Collaborate live with syntax highlighting, code execution, and instant feedback.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Automated interview scheduling, calendar integration, and reminders.",
    },
    {
      icon: Clock,
      title: "Recording & Review",
      description:
        "Record interviews, replay sessions, and access performance analytics.",
    },
    {
      icon: LightbulbIcon,
      title: "AI-Powered Feedback",
      description:
        "Get actionable insights and feedback powered by advanced AI analysis.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      description:
        "Your data is encrypted and privacy is our top priority.",
    },
    {
      icon: Languages,
      title: "Multi-language Support",
      description:
        "Interview in Python, JavaScript, Java, and more—seamlessly.",
    },
  ];

  const howItWorks = [
    {
      icon: SparklesIcon,
      title: "Create or Join",
      description: "Sign up and create an interview or join as a candidate.",
    },
    {
      icon: Users,
      title: "Collaborate",
      description: "Code, communicate, and solve problems in real time.",
    },
    {
      icon: Calendar,
      title: "Schedule & Record",
      description: "Book interviews, record sessions, and revisit anytime.",
    },
    {
      icon: StarIcon,
      title: "Get Feedback",
      description: "Receive detailed feedback and analytics post-interview.",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Engineering Manager, TechCorp",
      text: "CodeVu transformed our hiring process. The real-time coding and AI feedback are game changers!",
      avatar: null,
    },
    {
      name: "Priya Singh",
      role: "Software Engineer, DevStart",
      text: "The scheduling and review features made my interview experience seamless and stress-free.",
      avatar: null,
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateX",
      text: "We love the privacy and multi-language support. CodeVu is now our go-to platform for interviews.",
      avatar: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 dark:from-background dark:via-background dark:to-background">
      {/* Header */}
      <header className="border-b bg-card/70 backdrop-blur-md shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              CodeVu
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/sign-in")}>Sign In</Button>
            <Button size="lg" onClick={() => router.push("/sign-up")}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-16 pb-10 flex flex-col items-center text-center relative z-10">
          <Badge className="mb-4 px-4 py-2 text-base bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg">
            The Ultimate Technical Interview Platform
          </Badge>
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
            Interview. Code. Succeed.
          </h1>
          <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience seamless technical interviews with real-time coding, video calls, AI-powered feedback, and more—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 shadow-xl" onClick={() => router.push("/sign-up")}>Get Started Free</Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" onClick={() => router.push("/sign-in")}>Sign In</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Everything you need for technical interviews
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From scheduling to evaluation, CodeVu provides all the tools you need for successful, modern technical interviews.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <feature.icon className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-base text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-background dark:to-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just a few steps and experience the future of technical interviews.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <Card key={idx} className="text-center p-8 border-emerald-200 dark:border-emerald-900/40 shadow-none">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <step.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-base text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by professionals and teams worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-8 shadow-lg border-emerald-200 dark:border-emerald-900/40">
              <CardContent className="flex flex-col items-center">
                <Avatar className="mb-4 h-16 w-16">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="h-16 w-16 rounded-full" />
                  ) : (
                    <AvatarFallback className="text-2xl bg-emerald-200 dark:bg-emerald-900/40 text-emerald-700">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <p className="text-base italic text-muted-foreground mb-4">“{t.text}”</p>
                <div className="font-semibold text-emerald-700 dark:text-emerald-400">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <Code2 className="h-6 w-6 text-emerald-600" />
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              CodeVu
            </span>
          </div>
          <div className="text-muted-foreground text-sm">
            &copy; 2024 CodeVu. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 
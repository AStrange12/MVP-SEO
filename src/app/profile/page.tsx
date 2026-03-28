"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, History, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const mockHistory = [
    { name: "Blue Door Bakery", date: "2 days ago", type: "Full Launch" },
    { name: "Austin Tech Repairs", date: "1 week ago", type: "Marketing Pack" },
    { name: "Green Garden Landscaping", date: "2 weeks ago", type: "SEO Audit" },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] hero-gradient p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <h1 className="text-4xl font-headline font-bold">Account Settings</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-8">
            <Card className="glass-morphism border-white/10 overflow-hidden">
              <CardHeader className="text-center bg-primary/5 pb-8">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4">
                  {user.email[0].toUpperCase()}
                </div>
                <CardTitle>{user.email.split('@')[0]}</CardTitle>
                <CardDescription>Free Plan Member</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>Account Verified</span>
                </div>
                <Button variant="destructive" className="w-full mt-4" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" /> Log Out
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/10 p-6">
              <h3 className="font-bold mb-4">Subscription</h3>
              <p className="text-sm text-muted-foreground mb-6">You are currently on the Free tier. Upgrade for unlimited generations.</p>
              <Button className="w-full rounded-full">Upgrade to Pro</Button>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8">
            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Generation History
                </CardTitle>
                <CardDescription>A list of your recent AI-powered creations.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHistory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5 hover:border-primary/30 transition-all group">
                      <div>
                        <div className="font-bold group-hover:text-primary transition-colors">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.type} • {item.date}</div>
                      </div>
                      <Button variant="ghost" size="sm">View Assets</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Display Name</label>
                    <Input defaultValue={user.email.split('@')[0]} className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Location</label>
                    <Input placeholder="Not set" className="bg-background/50 border-white/10" />
                  </div>
                </div>
                <Button className="rounded-full px-8">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

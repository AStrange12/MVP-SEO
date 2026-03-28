
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Sparkles, User, LogOut, LayoutDashboard, Home, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const isAuthPage = pathname === '/login' || pathname === '/signup';
  if (isAuthPage) return null;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="px-8 py-5 flex items-center justify-between border-b border-white/5 glass-morphism sticky top-0 z-50 backdrop-blur-2xl"
    >
      <Link href="/" className="flex items-center gap-3 group relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="bg-primary p-2.5 rounded-xl group-hover:rotate-[360deg] transition-transform duration-700 shadow-lg shadow-primary/30">
          <Zap className="text-white w-5 h-5" />
        </div>
        <span className="font-headline font-bold text-2xl tracking-tighter">
          LocalBoost<span className="text-primary">.AI</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest">
        <Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-all duration-300 relative group`}>
          Home
          <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${pathname === '/' ? 'scale-x-100' : ''}`} />
        </Link>
        <Link href="/dashboard" className={`${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-all duration-300 relative group`}>
          Dashboard
          <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${pathname === '/dashboard' ? 'scale-x-100' : ''}`} />
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0 overflow-hidden hover:bg-white/10 transition-colors">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {user?.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 glass-card p-2 border-white/10 mt-2" align="end">
              <DropdownMenuLabel className="font-headline p-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-lg font-bold leading-none tracking-tight">Identity Hub</p>
                  <p className="text-sm font-light text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <div className="p-1 space-y-1">
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary focus:text-white rounded-lg transition-all p-3">
                  <Link href="/profile" className="flex items-center font-medium">
                    <User className="mr-3 h-5 w-5" />
                    <span>Neural Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary focus:text-white rounded-lg transition-all p-3">
                  <Link href="/dashboard" className="flex items-center font-medium">
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    <span>Active Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:bg-destructive focus:text-white rounded-lg transition-all p-3 m-1">
                <LogOut className="mr-3 h-5 w-5" />
                <span className="font-medium">Decommission Session</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="font-bold hover:bg-white/5" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold" asChild>
              <Link href="/signup">Join Orbit</Link>
            </Button>
          </div>
        )}
      </div>
    </motion.header>
  );
}

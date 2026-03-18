

'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BookOpen,
  Briefcase,
  Calendar,
  Home,
  Mail,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Circle,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function AdminLayout({
  children,
  title,
  description,
}: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('blissmatch_admin_token');
    }
    router.push('/admin/login');
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Home', href: '/admin/home', icon: Home },
    { name: 'About', href: '/admin/about', icon: BookOpen },
    { name: 'Service', href: '/admin/services', icon: Briefcase },
    { name: 'Appointments', href: '/admin/appointment', icon: Calendar },
    { name: 'Inquiries', href: '/admin/contact', icon: Mail },
    { name: 'Success Stories', href: '/admin/success-stories', icon: Heart },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex bg-[#F9F9F7] overflow-hidden font-sans">
      
      {/* --- FLOATING MINIMAL SIDEBAR --- */}
      <aside
        className={cn(
          "relative flex flex-col bg-deep-midnight-navy transition-all duration-700 ease-in-out h-[calc(100vh-40px)] my-5 ml-5 rounded-2xl shadow-2xl shrink-0 overflow-hidden",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
          <div className="p-6 flex items-center justify-between border-b border-white/5 bg-white/5 group/header">
            <div className="relative">
              <div className="h-10 w-10 rounded-full border border-muted-burgundy-rose flex items-center justify-center font-serif text-white text-lg italic">
                B
              </div>
              <Circle className="absolute -top-1 -right-1 h-3 w-3 fill-green-500 stroke-none animate-pulse" />
            </div>

           
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center group/btn relative h-10 w-10 justify-center transition-all"
              aria-label="Toggle Sidebar"
            >
             
              <div className="absolute left-0 h-4 w-px bg-white/10 group-hover/btn:bg-muted-burgundy-rose transition-colors" />
              
              <div className={cn(
                "transition-transform duration-500 ease-in-out text-stone-400 group-hover/btn:text-white",
                isCollapsed ? "rotate-180" : "rotate-0"
              )}>
                <ChevronLeft size={18} strokeWidth={1.5} />
              </div>
              
             
              {isCollapsed && (
                <span className="absolute left-12 scale-0 group-hover/btn:scale-100 transition-transform origin-left bg-deep-midnight-navy border border-white/10 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-white shadow-xl">
                  Expand
                </span>
              )}
            </button>
          </div>

        <ScrollArea className="flex-1 px-4 py-8">
          <nav className="space-y-4">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl transition-all duration-300 group",
                    isActive 
                      ? "bg-muted-burgundy-rose text-white shadow-lg shadow-muted-burgundy-rose/20" 
                      : "text-white hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-white")} />
                  {!isCollapsed && (
                    <span className="ml-4 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Action Footer */}
        <div className="p-4 bg-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center h-12 rounded-xl text-stone-400 hover:text-red-400 hover:bg-red-400/10 transition-all group"
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && (
              <span className="ml-3 text-[10px] font-black uppercase tracking-widest">
                Exit
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT CANVAS --- */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        
        {/* Integrated Top Header */}
        <header className="flex h-24 items-center justify-between px-12 shrink-0">
          <div className="space-y-1">
             <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={12} className="text-muted-burgundy-rose" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">Admin Console</span>
             </div>
            <h1 className="text-4xl font-serif text-deep-midnight-navy">
                {title} 
                {/* <span className="italic text-muted-burgundy-rose">Registry</span> */}
            </h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-deep-midnight-navy uppercase tracking-widest">Operator Console</p>
                <p className="text-[9px] text-stone-400">v2.4.0 Live</p>
             </div>
             <div className="h-12 w-12 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             </div>
          </div>
        </header>

        {/* Content Container with inner spacing */}
        <div className="px-6">
          <div className="bg-white border border-stone-100 shadow-sm min-h-[calc(100vh-160px)] p-4">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BookOpen,
  Briefcase,
  Calendar,
  Home,
  Mail,
  LogOut,
  ChevronRight,
  Heart,
  Sparkles,
  Star,
  User,
  Command,
  LayoutTemplate,
  Shield,
  ListOrdered,
  MessageSquare,
  Blocks,
  PanelBottom,
  PanelTop,
  Images,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * BlissMatch admin IA (inspired by multi-section CMS nav, scoped to this product):
 * - Dashboard: at-a-glance
 * - Main pages: editors aligned with public routes (/ , /about, /services)
 * - Homepage blocks: reusable sections that appear on the home page (card UIs)
 * - Trust & proof: testimonials / social proof surfaced on the site
 * - Client requests: forms and enquiry touchpoints (/appointment, /contact)
 * - Global: cross-page hero / registry
 */
export const ADMIN_NAV_ITEMS = [
  {
    group: 'DASHBOARD',
    items: [{ name: 'Overview', href: '/admin', icon: Home }],
  },
  {
    group: 'MAIN PAGES',
    items: [
      { name: 'Homepage', href: '/admin/home', icon: LayoutTemplate },
      { name: 'About', href: '/admin/about', icon: BookOpen },
      { name: 'Services', href: '/admin/services', icon: Briefcase },
    ],
  },
  {
    group: 'ABOUT SECTIONS',
    items: [
      { name: 'Philosophy', href: '/admin/about-philosophy', icon: BookOpen },
      { name: 'Discretion', href: '/admin/about-discretion', icon: Shield },
      { name: 'Process', href: '/admin/about-process', icon: ListOrdered },
      { name: 'Call To Action', href: '/admin/about-cta', icon: MessageSquare },
    ],
  },
  {
    group: 'SERVICES SECTIONS',
    items: [
      { name: 'Hero gallery', href: '/admin/services-hero', icon: Images },
      { name: 'Service Grid', href: '/admin/services-grid', icon: Blocks },
      { name: 'Social Impact', href: '/admin/services-social', icon: Heart },
      { name: 'Confidentiality', href: '/admin/services-confidentiality', icon: Shield },
    ],
  },
  {
    // Each item maps to a block on `/`; Our Story shares the same JSON as Homepage › Our Story.
    group: 'HOMEPAGE SECTIONS',
    items: [
      { name: 'Our Story', href: '/admin/our-story', icon: BookOpen },
      {
        name: 'Discover Lasting Love',
        href: '/admin/discover-lasting-love',
        icon: Briefcase,
      },
      { name: 'Love & Connection', href: '/admin/love-connection', icon: Heart },
      { name: 'Bliss Circle', href: '/admin/bliss-circle', icon: Sparkles },
      {
        name: 'Because Love Deserves Craft',
        href: '/admin/because-love-deserves-craft',
        icon: Star,
      },
    ],
  },
  {
    group: 'TRUST & PROOF',
    items: [
      { name: 'Success Stories', href: '/admin/success-stories', icon: Heart },
    ],
  },
  {
    group: 'CLIENT ENQUIRIES',
    items: [
      { name: 'Submissions', href: '/admin/submissions', icon: MessageSquare },
      { name: 'Appointments', href: '/admin/appointment', icon: Calendar },
      { name: 'Contact', href: '/admin/contact', icon: Mail },
    ],
  },
  {
    group: 'GLOBAL',
    items: [
      { name: 'Hero Section', href: '/admin/hero', icon: Command },
      { name: 'Media Library', href: '/admin/media-library', icon: Images },
    ],
  },
  {
    group: 'SITE STRUCTURE',
    items: [
      { name: 'Navigation', href: '/admin/navigation', icon: PanelTop },
      { name: 'Footer', href: '/admin/footer', icon: PanelBottom },
    ],
  },
];

export default function AdminLayout({ children, title, description }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeHomeTab, setActiveHomeTab] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const tab = new URLSearchParams(window.location.search).get('tab');
    setActiveHomeTab(tab);
  });

  useEffect(() => {
    // Close the drawer when navigating.
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('blissmatch_admin_token');
    }
    router.push('/admin/login');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex bg-[#F4F7F9] overflow-hidden font-sans">
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#0F172A] border-r border-white/5 shrink-0 z-50">
        <div className="h-20 flex items-center px-6 gap-3 border-b border-white/5 bg-[#0F172A]">
          {/* <div className="h-8 w-8 rounded bg-muted-burgundy-rose flex items-center justify-center font-bold text-white italic">B</div> */}
          <Image src="/logo1.png" alt="BlissMatch Heart" width={32} height={32} className="object-contain" />
          <div className="flex flex-col">
            <span className="text-white text-[11px] font-black tracking-widest uppercase">BlissMatch</span>
            <span className="text-[8px] text-muted-burgundy-rose font-bold">Administrator</span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          {ADMIN_NAV_ITEMS.map((group) => (
            <div key={group.group} className="mb-8">
              <h3 className="px-4 text-[9px] font-black text-stone-500 tracking-[0.2em] mb-4 uppercase">{group.group}</h3>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const itemBasePath = item.href.split('?')[0];
                  const isHomeTabItem =
                    itemBasePath === '/admin/home' && item.href.includes('?tab=');
                  const isPlainHomeItem = item.href === '/admin/home';
                  const itemTab = isHomeTabItem
                    ? item.href.split('?tab=')[1]
                    : null;
                  const isActive = isHomeTabItem
                    ? pathname === '/admin/home' && activeHomeTab === itemTab
                    : isPlainHomeItem
                    ? pathname === '/admin/home' && !activeHomeTab
                    : pathname === item.href;
                  return (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-4 py-2.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all group",
                          isActive
                            ? "bg-white/5 text-white border-r-2 border-muted-burgundy-rose"
                            : "text-stone-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 mr-3 shrink-0",
                            isActive
                              ? "text-muted-burgundy-rose"
                              : "text-stone-500 group-hover:text-stone-300",
                          )}
                        />
                        {item.name}
                      </Link>

                      {(item as any).subItems?.map((sub: any) => {
                        const subIsActive =
                          sub.href.split("?")[0] === pathname;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={cn(
                              "flex items-center px-10 py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-all group",
                              subIsActive
                                ? "bg-white/5 text-white border-r-2 border-muted-burgundy-rose"
                                : "text-stone-500 hover:text-white hover:bg-white/5",
                            )}
                          >
                            <sub.icon
                              className={cn(
                                "h-3 w-3 mr-2 shrink-0",
                                subIsActive
                                  ? "text-muted-burgundy-rose"
                                  : "text-stone-400 group-hover:text-stone-300",
                              )}
                            />
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </nav>
            </div>
          ))}
        </ScrollArea>

        <div className="p-4 bg-[#0A0F1C]">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-red-400 transition-all">
            <LogOut size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- SIDEBAR (Mobile Drawer) --- */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-[99998]"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-64 flex flex-col bg-[#0F172A] border-r border-white/5 shrink-0 z-[99999] transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center px-6 gap-3 border-b border-white/5 bg-[#0F172A]">
          <Image src="/logo1.png" alt="BlissMatch Heart" width={32} height={32} className="object-contain" />
          <div className="flex flex-col">
            <span className="text-white text-[11px] font-black tracking-widest uppercase">BlissMatch</span>
            <span className="text-[8px] text-muted-burgundy-rose font-bold">Administrator</span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          {ADMIN_NAV_ITEMS.map((group) => (
            <div key={group.group} className="mb-8">
              <h3 className="px-4 text-[9px] font-black text-stone-500 tracking-[0.2em] mb-4 uppercase">{group.group}</h3>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const itemBasePath = item.href.split('?')[0];
                  const isHomeTabItem =
                    itemBasePath === '/admin/home' && item.href.includes('?tab=');
                  const isPlainHomeItem = item.href === '/admin/home';
                  const itemTab = isHomeTabItem
                    ? item.href.split('?tab=')[1]
                    : null;
                  const isActive = isHomeTabItem
                    ? pathname === '/admin/home' && activeHomeTab === itemTab
                    : isPlainHomeItem
                    ? pathname === '/admin/home' && !activeHomeTab
                    : pathname === item.href;
                  return (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-4 py-2.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all group",
                          isActive
                            ? "bg-white/5 text-white border-r-2 border-muted-burgundy-rose"
                            : "text-stone-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 mr-3 shrink-0",
                            isActive
                              ? "text-muted-burgundy-rose"
                              : "text-stone-500 group-hover:text-stone-300",
                          )}
                        />
                        {item.name}
                      </Link>

                      {(item as any).subItems?.map((sub: any) => {
                        const subIsActive =
                          sub.href.split("?")[0] === pathname;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={cn(
                              "flex items-center px-10 py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-all group",
                              subIsActive
                                ? "bg-white/5 text-white border-r-2 border-muted-burgundy-rose"
                                : "text-stone-500 hover:text-white hover:bg-white/5",
                            )}
                          >
                            <sub.icon
                              className={cn(
                                "h-3 w-3 mr-2 shrink-0",
                                subIsActive
                                  ? "text-muted-burgundy-rose"
                                  : "text-stone-400 group-hover:text-stone-300",
                              )}
                            />
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </nav>
            </div>
          ))}
        </ScrollArea>

        <div className="p-4 bg-[#0A0F1C]">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-red-400 transition-all">
            <LogOut size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Registry Header */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-white border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded border border-stone-200 text-stone-500"
              aria-label="Open admin menu"
            >
              <Menu size={18} />
            </button>

            <div className="flex flex-col min-w-0">
              <h1 className="text-lg font-black tracking-tighter text-[#0F172A] italic uppercase flex items-center gap-2">
                {title} <ChevronRight size={14} className="text-stone-300" />
              </h1>
              <p className="hidden lg:block text-[9px] font-bold text-stone-400 uppercase tracking-widest truncate">
                {description || "Manage your site content"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="h-10 w-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 border border-stone-200">
                <User size={18} />
             </div>
          </div>
        </header>

        {/* Workspace Canvas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
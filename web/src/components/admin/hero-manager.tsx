'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Layout as LayoutIcon,
  Eye,
  Pencil,
  Image as ImageIcon,
  FileText,
  Monitor,
  Sparkles,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HomeContent } from "@/components/admin/home-editor/types";
import { INITIAL_CONTENT, OurStorySection } from "@/components/admin/home-editor/sections";

type HeroConfig = {
  route: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
};

export function AdminHeroManager() {
  const router = useRouter();
  const heroRoutes = [
    { href: "/admin/home", name: "Home" },
    { href: "/admin/about", name: "About" },
    { href: "/admin/services", name: "Services" },
  ];

  const [route, setRoute] = useState("/admin/home");
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);
  const [homeContent, setHomeContent] = useState<HomeContent>(INITIAL_CONTENT);
  const [homeSubTab, setHomeSubTab] = useState<"hero" | "ourStory">("hero");
  const [ourStoryDirty, setOurStoryDirty] = useState(false);
  const [ourStoryMode, setOurStoryMode] = useState<"view" | "edit">("view");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const defaultHeroByRoute: Record<string, HeroConfig> = {
    "/admin/home": {
      route: "/admin/home",
      title: "Building great relationships leads to an amazing life!",
      subtitle: "Where Love Meets Intention",
      body: "Expert relationship consultancy designed to help you navigate the complexities of love, connection, and lasting partnership.",
      imageUrl: "/background.png",
    },
    "/admin/about": {
      route: "/admin/about",
      title: "Our Story",
      subtitle: "Established in Connection",
      body: "BlissMatch was founded by two best friends—one from a background in Human Behaviour Studies, the other in Business and Law—united by a vision to restore authenticity to modern relationships.",
      imageUrl: "/image.png",
    },
    "/admin/services": {
      route: "/admin/services",
      title: "Our Services",
      subtitle: "The BlissMatch Suite",
      body: "A bespoke collection of consultancy services designed for the discerning individual seeking depth, discretion, and a crafted path to love.",
      imageUrl: "/image.png",
    },
  };

  const fieldMeta = useMemo(() => {
    if (route === "/admin/home") {
      return {
        titleLabel: "Main Heading",
        titlePlaceholder: "Building great relationships leads to an amazing life!",
        subtitleLabel: "Tagline",
        subtitlePlaceholder: "Where Love Meets Intention",
        bodyLabel: "Support Text",
        bodyPlaceholder:
          "Expert relationship consultancy designed to help you navigate the complexities of love.",
        imageLabel: "Background Image URL",
        imagePlaceholder: "/background.png",
        examples: {
          title: "Building great relationships leads to an amazing life!",
          subtitle: "Where Love Meets Intention",
          body: "Expert relationship consultancy designed to help you navigate the complexities of love, connection, and lasting partnership.",
        },
      };
    }
    if (route === "/admin/about") {
      return {
        titleLabel: "Story Heading",
        titlePlaceholder: "Our Story",
        subtitleLabel: "Tag Line",
        subtitlePlaceholder: "Established in Connection",
        bodyLabel: "Intro Paragraph",
        bodyPlaceholder:
          "BlissMatch was founded by two best friends—one in Human Behaviour Studies, the other in Business and Law.",
        imageLabel: "Hero Image URL",
        imagePlaceholder: "/image.png",
        examples: {
          title: "Our Story",
          subtitle: "Established in Connection",
          body: "BlissMatch was founded by two best friends—one from Human Behaviour Studies, the other from Business and Law.",
        },
      };
    }
    if (route === "/admin/services") {
      return {
        titleLabel: "Services Heading",
        titlePlaceholder: "Our Services",
        subtitleLabel: "Tag Line",
        subtitlePlaceholder: "The BlissMatch Suite",
        bodyLabel: "Lead Text",
        bodyPlaceholder:
          "A bespoke collection of consultancy services designed for the discerning individual.",
        imageLabel: "Primary Image URL",
        imagePlaceholder: "/image.png",
        examples: {
          title: "Our Services",
          subtitle: "The BlissMatch Suite",
          body: "A bespoke collection of consultancy services designed for the discerning individual seeking depth and discretion.",
        },
      };
    }
    if (route === "/admin/appointment") {
      return {
        titleLabel: "Hero Title",
        titlePlaceholder: "Let’s Connect",
        subtitleLabel: "Small Label",
        subtitlePlaceholder: "Begin Your Journey",
        bodyLabel: "Short Description",
        bodyPlaceholder:
          "Our advisors are here to listen with absolute discretion.",
        imageLabel: "Side Image URL",
        imagePlaceholder: "/image.png",
      };
    }

    return {
      titleLabel: "Hero Title",
      titlePlaceholder: "Page hero title",
      subtitleLabel: "Subtitle",
      subtitlePlaceholder: "Short one-line subtitle",
      bodyLabel: "Body Text",
      bodyPlaceholder: "Optional longer copy that appears under the title.",
      imageLabel: "Image URL",
      imagePlaceholder: "https://images.pexels.com/...",
      examples: {
        title: "Page hero title",
        subtitle: "Short one-line subtitle",
        body: "Optional supporting text for this page hero.",
      },
    };
  }, [route]);

  useEffect(() => {
    async function loadConfig() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/hero?route=${encodeURIComponent(route)}`);
        const data = await res.json().catch(() => null);

        if (res.ok && data?.route) {
          setConfig({
            route,
            title: data.title ?? "",
            subtitle: data.subtitle ?? "",
            body: data.body ?? "",
            imageUrl: data.imageUrl ?? "",
          });
        } else {
          setConfig(
            defaultHeroByRoute[route] ?? {
              route,
              title: "",
              subtitle: "",
              body: "",
              imageUrl: "",
            },
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, [route]);

  const saveMediaAsset = async (url?: string, name?: string) => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("blissmatch_admin_token")
        : null;
    if (!token || !url) return;
    await fetch("/api/admin/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name || "Hero image", url }),
    });
  };

  const syncMainHeroes = async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("blissmatch_admin_token")
        : null;
    if (!token) {
      setToast({
        type: "error",
        message: "Admin session expired. Please login again.",
      });
      return;
    }

    setSaving(true);
    try {
      const targets = ["/admin/home", "/admin/about", "/admin/services"];
      for (const r of targets) {
        const payload = defaultHeroByRoute[r];
        await fetch("/api/admin/hero", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        await saveMediaAsset(payload.imageUrl, `${r.replace("/admin/", "")}-hero`);
      }
      if (targets.includes(route)) {
        setConfig(defaultHeroByRoute[route]);
      }
      setToast({
        type: "success",
        message: "Home, About, and Services heroes synced and saved to Media Library.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Load saved home-page JSON (includes "Our Story") for the /admin/home route.
  useEffect(() => {
    if (route !== "/admin/home") {
      setHomeSubTab("hero");
      setOurStoryDirty(false);
      setOurStoryMode("view");
      return;
    }

    let active = true;

    async function loadHome() {
      setHomeLoading(true);
      try {
        const res = await fetch("/api/admin/home");
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) {
          setHomeContent(data);
        } else {
          setHomeContent(INITIAL_CONTENT);
        }
      } catch {
        if (!active) return;
        setHomeContent(INITIAL_CONTENT);
      } finally {
        if (active) setHomeLoading(false);
      }
    }

    loadHome();
    return () => {
      active = false;
    };
  }, [route]);

  // If the admin didn't change anything locally, refresh when entering "Our Story".
  useEffect(() => {
    if (route !== "/admin/home") return;
    if (homeSubTab !== "ourStory") return;
    if (ourStoryDirty) return;

    let active = true;

    async function refreshHome() {
      setHomeLoading(true);
      try {
        const res = await fetch("/api/admin/home");
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) setHomeContent(data);
        else setHomeContent(INITIAL_CONTENT);
      } catch {
        if (!active) return;
        setHomeContent(INITIAL_CONTENT);
      } finally {
        if (active) setHomeLoading(false);
      }
    }

    refreshHome();
    return () => {
      active = false;
    };
  }, [route, homeSubTab, ourStoryDirty]);

  // Keep the "Our Story" sub-tab in sync with changes saved from the /admin/home editor.
  useEffect(() => {
    if (route !== "/admin/home") return;
    if (homeSubTab !== "ourStory") return;
    if (ourStoryDirty) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/admin/home");
        const data = await res.json().catch(() => null);
        if (res.ok && data) setHomeContent(data);
        else setHomeContent(INITIAL_CONTENT);
      } catch {
        setHomeContent(INITIAL_CONTENT);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [route, homeSubTab, ourStoryDirty]);

  const currentConfig: HeroConfig = useMemo(
    () =>
      config ?? {
        route,
        title: "",
        subtitle: "",
        body: "",
        imageUrl: "",
      },
    [config, route],
  );

  const updateField = (field: keyof HeroConfig, value: string) => {
    setConfig((prev) => ({
      ...(prev ?? {
        route,
        title: "",
        subtitle: "",
        body: "",
        imageUrl: "",
      }),
      route,
      [field]: value,
    }));
  };

  const updateOurStoryField = (field: string, value: string) => {
    setHomeContent((prev) => {
      const safePrev = prev ?? INITIAL_CONTENT;
      return {
        ...safePrev,
        ourStory: {
          ...safePrev.ourStory,
          [field]: value,
        },
      };
    });
    setOurStoryDirty(true);
  };

  const handleSaveOurStory = async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("blissmatch_admin_token")
        : null;

    if (!token) {
      setToast({
        type: "error",
        message: "Admin session expired. Please login again.",
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(homeContent),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 401) {
          window.localStorage.removeItem("blissmatch_admin_token");
          setToast({
            type: "error",
            message: "Session expired. Please login again.",
          });
          setTimeout(() => router.push("/admin/login"), 700);
          return;
        }

        setToast({
          type: "error",
          message: data?.message || "Could not save Our Story.",
        });
        return;
      }

      setOurStoryDirty(false);
      setOurStoryMode("view");
      setToast({
        type: "success",
        message: "Our Story saved.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOurStory = async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("blissmatch_admin_token")
        : null;

    if (!token) {
      setToast({
        type: "error",
        message: "Admin session expired. Please login again.",
      });
      return;
    }

    const next: HomeContent = {
      ...homeContent,
      ourStory: INITIAL_CONTENT.ourStory,
    };

    setSaving(true);
    try {
      const res = await fetch("/api/admin/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(next),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 401) {
          window.localStorage.removeItem("blissmatch_admin_token");
          setToast({
            type: "error",
            message: "Session expired. Please login again.",
          });
          setTimeout(() => router.push("/admin/login"), 700);
          return;
        }

        setToast({
          type: "error",
          message: data?.message || "Could not delete Our Story.",
        });
        return;
      }

      setHomeContent(next);
      setOurStoryDirty(false);
      setOurStoryMode("view");
      setToast({
        type: "success",
        message: "Our Story deleted.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("blissmatch_admin_token")
        : null;

    if (!token) {
      setToast({
        type: "error",
        message: "Admin session expired. Please login again.",
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentConfig),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 401) {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("blissmatch_admin_token");
          }
          setToast({
            type: "error",
            message: "Session expired. Please login again.",
          });
          setTimeout(() => router.push("/admin/login"), 700);
          return;
        }
        setToast({
          type: "error",
          message: data?.message || "Could not save changes.",
        });
        return;
      }

      setToast({
        type: "success",
        message: "Hero section saved.",
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const previewTitle =
    homeSubTab === "ourStory"
      ? homeContent.ourStory.headingMain || "Untitled Header"
      : currentConfig.title || "Untitled Header";

  const previewSubtitle =
    homeSubTab === "ourStory"
      ? homeContent.ourStory.quote || ""
      : currentConfig.subtitle;

  const previewImageUrl =
    homeSubTab === "ourStory"
      ? homeContent.ourStory.imageUrl
      : currentConfig.imageUrl;

  // const selectedNav = ADMIN_NAV_ITEMS.find((n) => n.href === route);

  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {toast && (
        <div
          className={cn(
            "fixed top-5 right-5 z-[9999] rounded-lg px-4 py-3 text-sm shadow-lg border",
            toast.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200",
          )}
        >
          {toast.message}
        </div>
      )}
      
      {/* Header Info Block (Like the black bar in your screenshot) */}
      <div className="bg-[#0F172A] rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={120} />
        </div>
        <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-muted-burgundy-rose">
                <div className="h-1.5 w-1.5 bg-muted-burgundy-rose" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Page settings</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight italic uppercase">Hero settings</h2>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] max-w-md">Update the hero text and image for each page.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        
        {/* EDITING FORM */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-stone-600">Configuration</span>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                        {heroRoutes.map(item => (
                            <button 
                                key={item.href}
                                onClick={() => setRoute(item.href)}
                                className={cn(
                                    "text-[11px] font-medium px-3 py-1 rounded transition-all",
                                    route === item.href ? "bg-muted-burgundy-rose text-white" : "bg-white text-stone-400 border border-stone-100"
                                )}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                    <button
                      type="button"
                      onClick={syncMainHeroes}
                      disabled={saving}
                      className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded border border-stone-200 bg-white text-deep-midnight-navy hover:bg-stone-50 disabled:opacity-60"
                    >
                      Sync main-site heroes
                    </button>

                    {/* Our Story is now managed in /admin/our-story */}
                </div>
            </div>

            <div className="p-8 space-y-8">
                {homeSubTab === "hero" ? (
                  <>
                    <div className="rounded-lg bg-stone-50 border border-stone-200 p-4 space-y-2">
                        <p className="text-[12px] font-semibold text-stone-700">
                          Example for this page
                        </p>
                        <p className="text-[11px] text-stone-500">
                          <span className="font-medium text-stone-700">Title:</span>{" "}
                          {fieldMeta.examples?.title ?? "Example title"}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          <span className="font-medium text-stone-700">Subtitle:</span>{" "}
                          {fieldMeta.examples?.subtitle ?? "Example subtitle"}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          <span className="font-medium text-stone-700">Body:</span>{" "}
                          {fieldMeta.examples?.body ?? "Example body text"}
                        </p>
                        {loading && (
                          <p className="text-[11px] text-stone-400">
                            Loading current values...
                          </p>
                        )}
                    </div>

                    {/* Title Input */}
                    <div className="grid gap-2">
                        <label className="text-[12px] font-medium text-stone-600">
                          {fieldMeta.titleLabel}
                        </label>
                        <input 
                            className="w-full bg-[#F8FAFC] border border-stone-200 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-muted-burgundy-rose outline-none transition-all"
                            placeholder={fieldMeta.titlePlaceholder}
                            value={currentConfig.title}
                            onChange={(e) => updateField("title", e.target.value)}
                        />
                    </div>

                    {/* Subtitle */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-stone-600">
                          {fieldMeta.subtitleLabel}
                        </label>
                        <input 
                            className="w-full bg-[#F8FAFC] border border-stone-200 rounded-lg px-4 py-3 text-sm font-medium outline-none"
                            placeholder={fieldMeta.subtitlePlaceholder}
                            value={currentConfig.subtitle}
                            onChange={(e) => updateField("subtitle", e.target.value)}
                        />
                    </div>

                    {/* Body */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-stone-600">
                          {fieldMeta.bodyLabel}
                        </label>
                        <textarea 
                            className="w-full bg-[#F8FAFC] border border-stone-200 rounded-lg px-4 py-3 text-sm font-medium outline-none min-h-[140px] resize-y"
                            placeholder={fieldMeta.bodyPlaceholder}
                            value={currentConfig.body}
                            onChange={(e) => updateField("body", e.target.value)}
                        />
                    </div>

                    {/* File Upload Section */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-stone-600">
                          {fieldMeta.imageLabel}
                        </label>
                        <div className="relative border-2 border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer group">
                            <input 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () =>
                                          updateField("imageUrl", reader.result as string);
                                        reader.readAsDataURL(file);
                                    }
                                }} 
                            />
                            {currentConfig.imageUrl ? (
                                <div className="flex items-center gap-4 w-full">
                                    <img
                                      src={currentConfig.imageUrl}
                                      className="h-16 w-16 object-cover rounded-lg border border-stone-200"
                                      alt=""
                                    />
                                    <div className="flex-1">
                                        <p className="text-[11px] font-bold text-stone-700">
                                          Visual Loaded
                                        </p>
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            updateField("imageUrl", "");
                                          }}
                                          className="text-[9px] font-black text-red-500 uppercase"
                                        >
                                          Remove Asset
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon
                                      size={24}
                                      className="text-stone-300 group-hover:text-muted-burgundy-rose transition-colors mb-2"
                                    />
                                    <span className="text-[10px] font-bold text-stone-400 uppercase">
                                      Select File for Upload
                                    </span>
                                    <span className="text-[10px] text-stone-400 mt-1">
                                      Example: {fieldMeta.imagePlaceholder}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    {homeLoading ? (
                      <p className="text-[11px] text-stone-400">
                        Loading Our Story...
                      </p>
                    ) : (
                      <div className="rounded-lg bg-white border border-stone-200 shadow-sm overflow-hidden">
                        <div className="p-5 bg-stone-50 border-b border-stone-200 flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[12px] font-semibold text-stone-700">
                              Our Story
                            </p>
                            <p className="text-[10px] text-stone-500 mt-1">
                              {ourStoryMode === "edit"
                                ? "Edit the story"
                                : "View the story"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setOurStoryMode("view")}
                              className={cn(
                                "p-2 rounded border transition-all",
                                ourStoryMode === "view"
                                  ? "bg-white border-muted-burgundy-rose/30 text-deep-midnight-navy"
                                  : "bg-white/70 border-stone-200 text-stone-400 hover:border-stone-300",
                              )}
                              aria-label="View Our Story"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setOurStoryMode("edit")}
                              className={cn(
                                "p-2 rounded border transition-all",
                                ourStoryMode === "edit"
                                  ? "bg-white border-muted-burgundy-rose/30 text-deep-midnight-navy"
                                  : "bg-white/70 border-stone-200 text-stone-400 hover:border-stone-300",
                              )}
                              aria-label="Edit Our Story"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={handleDeleteOurStory}
                              disabled={saving}
                              className="p-2 rounded border border-red-200 bg-white/70 text-red-500 hover:bg-red-50 transition-all disabled:opacity-60"
                              aria-label="Delete Our Story"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="p-6">
                          {ourStoryMode === "edit" ? (
                            <OurStorySection
                              data={homeContent.ourStory}
                              onFieldChange={updateOurStoryField}
                            />
                          ) : (
                            <div className="space-y-5">
                              <div className="flex items-start gap-4">
                                {homeContent.ourStory.imageUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={homeContent.ourStory.imageUrl}
                                    alt=""
                                    className="h-20 w-20 rounded-lg border border-stone-200 object-cover"
                                  />
                                ) : (
                                  <div className="h-20 w-20 rounded-lg border border-stone-200 bg-stone-50" />
                                )}
                                <div className="min-w-0 flex-1 space-y-2">
                                  <p className="text-[12px] font-black text-deep-midnight-navy">
                                    {homeContent.ourStory.headingMain || "—"}
                                  </p>
                                  <p className="text-[12px] italic text-deep-midnight-navy">
                                    {homeContent.ourStory.headingAccent || ""}
                                  </p>
                                  <p className="text-[11px] text-stone-500">
                                    {homeContent.ourStory.quote || ""}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                                  Button + link
                                </p>
                                <p className="text-[11px] text-stone-600">
                                  {homeContent.ourStory.ctaLabel || "—"}{" "}
                                  <span className="text-stone-400">
                                    ({homeContent.ourStory.ctaHref || "—"})
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center">
                {homeSubTab === "ourStory" ? (
                  <>
                    {ourStoryMode === "edit" ? (
                      <button
                        type="button"
                        onClick={handleSaveOurStory}
                        disabled={saving}
                        className="bg-[#0F172A] text-white px-6 py-2 rounded font-semibold text-[12px] flex items-center gap-2 hover:bg-muted-burgundy-rose transition-all shadow-lg disabled:opacity-60"
                      >
                        <Save size={14} />
                        {saving ? "Saving..." : "Save Our Story"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOurStoryMode("edit")}
                        disabled={saving}
                        className="bg-white text-deep-midnight-navy px-6 py-2 rounded font-semibold text-[12px] border border-stone-200 hover:bg-stone-50 transition-all disabled:opacity-60"
                      >
                        Edit to save
                      </button>
                    )}
                  </>
                ) : (
                  <button 
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-[#0F172A] text-white px-6 py-2 rounded font-semibold text-[12px] flex items-center gap-2 hover:bg-muted-burgundy-rose transition-all shadow-lg"
                  >
                      <Save size={14} />
                      {saving ? "Saving..." : "Save changes"}
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-stone-500 flex items-center gap-2">
                    <Monitor size={14} /> Desktop Preview
                </span>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            
            <div className="bg-white rounded-xl border border-stone-200 shadow-2xl overflow-hidden aspect-[4/5] flex flex-col">
                <div className="p-6 space-y-4">
                    <div className="h-1 w-8 bg-muted-burgundy-rose" />
                    <h3 className="text-2xl font-serif text-[#0F172A] leading-tight">{previewTitle}</h3>
                    <p className="text-[10px] text-stone-400 leading-relaxed font-medium uppercase tracking-wider">{previewSubtitle}</p>
                </div>
                {previewImageUrl && (
                    <div className="flex-1 relative">
                        <img
                          src={previewImageUrl}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
                        />
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { navContent } from "@/content/nav.content";

export const metadata: Metadata = {
  title: "WanderPlan – Travel Planner",
  description:
    "Plan your perfect trip with live weather forecasts, top attractions, and hotel deals all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#fffbf5] text-stone-900 antialiased">
        <Nav {...navContent} />
        <main className="flex-1">{children}</main>
        <footer className="mt-20 border-t border-orange-100 bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-400">
            <div className="flex items-center gap-2 font-bold text-stone-700">
              <span className="text-xl">🌴</span>
              WanderPlan
            </div>
            <span>© {new Date().getFullYear()} WanderPlan. Happy travels!</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

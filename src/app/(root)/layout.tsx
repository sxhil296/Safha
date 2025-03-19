import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero5-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <HeroHeader />
      {children}
      <FooterSection />
    </div>
  );
}

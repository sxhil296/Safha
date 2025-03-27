import FooterSection from "@/components/layout/footer";
import { HeroHeader } from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <HeroHeader />
      {children}
      <FooterSection />
    </div>
  );
}

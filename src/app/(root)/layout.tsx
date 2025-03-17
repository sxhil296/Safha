import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/hero5-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeroHeader />
      {children}
      <FooterSection />
    </div>
  );
}

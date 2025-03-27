export default function FooterSection() {
  return (
    <footer className="border-b bg-white pt-8 pb-4 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap justify-between gap-2">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} Safha, All rights reserved
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            Developed by Sahil
          </div>
        </div>
      </div>
    </footer>
  );
}

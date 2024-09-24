import Header from "@/components/header";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto px-8 sm:px-16">
      <Header />
      {children}
    </div>
  );
}

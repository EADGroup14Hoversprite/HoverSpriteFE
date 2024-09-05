import { SheetMenu } from "@/components/layout";

interface NavbarProps {
  title: string;
}
export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 h-[52px] flex-shrink-0 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-full items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
      </div>
    </header>
  );
}

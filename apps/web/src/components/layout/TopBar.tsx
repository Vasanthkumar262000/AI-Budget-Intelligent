import { MobileNav } from './MobileNav';

export function TopBar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between md:hidden">
      <h1 className="text-lg font-semibold">Budget Intelligence</h1>
      <MobileNav />
    </header>
  );
}



type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Remove profile section */}
      {/* Optional: keep notifications only */}
      <div className="flex items-center gap-4">
        {/* <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" /> */}
      </div>
    </header>
  );
}


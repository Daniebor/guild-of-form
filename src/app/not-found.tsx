import Link from "next/link";
import { ForgeHeader } from "@/components/layout/ForgeHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void text-slate-200">
      <ForgeHeader />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <h1 className="text-6xl font-serif text-amber-600 mb-4">404</h1>
        <h2 className="text-2xl font-serif text-slate-400 mb-8">
          The Void consumes all... even this page.
        </h2>
        <Link 
          href="/map"
          className="px-6 py-3 rounded bg-amber-600 hover:bg-amber-500 text-void font-bold transition-colors"
        >
          Return to the Map
        </Link>
      </div>
    </div>
  );
}

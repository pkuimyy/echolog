'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b sticky top-0 z-50">
      <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/echolog.svg"
            alt="echolog"
            width={32}
            height={32}
            style={{ height: 'auto' }}
            priority
          />
          <span className="text-lg font-semibold text-gray-900">echolog</span>
        </Link>
        <nav className="flex space-x-4 overflow-x-auto text-sm px-2 whitespace-nowrap text-gray-700">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/spotify/albums" className="hover:text-black">Albums</Link>
          <Link href="/spotify/playlists" className="hover:text-black">Playlists</Link>
        </nav>
      </div>
    </header>
  );
}

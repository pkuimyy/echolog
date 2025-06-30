'use client';

import Image from 'next/image';
import Tabs from '@/components/tabs/Tabs';
import SpotifyPlatform from '@/components/spotify/SpotifyPlatform';
// 你后续可再加 NeteasePlatform 等

export default function HomePage() {
  const tabItems = [
    { label: 'Spotify', content: <SpotifyPlatform/> },
    { label: '网易云音乐', content: null },
    { label: 'QQ音乐', content: null }
  ];

  return (
    <main
      className="min-h-screen p-4 sm:p-6 md:p-8 bg-white font-sans text-gray-900 flex flex-col items-center space-y-6 mx-auto">
      <header className="flex flex-col items-center space-y-1 text-center px-2">
        <Image
          src="/echolog.svg"
          alt="echolog"
          width={80}
          height={80}
          style={{ height: 'auto' }}
          priority
        />
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">echolog</h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-md">
                    export your favorite music albums list
        </p>
      </header>

      <div className="w-full max-w-screen-lg mx-auto">
        <Tabs items={tabItems} paramKey="tab"/>
      </div>
    </main>
  );
}

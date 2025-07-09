'use client';

import { HomeAuthSection } from '@/components/spotify/HomeAuthSection';
import { SpotifyNavCard } from "@/components/card/SpotifyNavCard";
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <section className="my-12 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/echolog.svg"
            alt="echolog logo"
            width={96}
            height={96}
            priority
          />
        </div>

        {/* 标题 */}
        <h1 className="text-4xl font-bold mb-4">欢迎使用 echolog</h1>

        {/* 描述 */}
        <p className="text-gray-700 max-w-xl">
                  echolog 是一个 Spotify 导出助手，帮你轻松导出你收藏的专辑和歌单。
        </p>
      </section>

      {/* 登录组件，宽度与卡片容器宽度一致 */}
      <section className="max-w-xl mx-auto my-8">
        <HomeAuthSection/>
      </section>

      {/* 导航卡片 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto mt-8 justify-items-center">
        <SpotifyNavCard
          href="/spotify/albums"
          title="我的收藏专辑"
          description="查看并导出你收藏的 Spotify 专辑。"
          className="w-full"
        />
        <SpotifyNavCard
          href="/spotify/playlists"
          title="我的歌单"
          description="查看并导出你的 Spotify 歌单。"
          className="w-full"
        />
      </section>
    </>
  );
}

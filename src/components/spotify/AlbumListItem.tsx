'use client';

import { SpotifySavedAlbum } from '@/lib/shared/types/spotify';

interface AlbumListItemProps {
    album: SpotifySavedAlbum['album'];
    key?: number;
}

export default function AlbumListItem({ album, key }: AlbumListItemProps) {
  return (
    <li
      key={album.id || key}
      className="grid grid-cols-[64px_3fr_3fr_1fr_0.5fr] items-center py-2 border-b last:border-none border-gray-200"
    >
      <img
        src={album.images[0]?.url}
        alt={album.name}
        className="w-12 h-12 rounded"
        width={64}
        height={64}
      />
      <p className="truncate" title={album.name}>{album.name}</p>
      <p className="truncate text-gray-600" title={album.artists.map((a) => a.name).join(', ')}>
        {album.artists.map((a) => a.name).join(', ')}
      </p>
      <p className="truncate text-gray-500" title={album.release_date}>
        {album.release_date}
      </p>
      <p className="truncate text-gray-500" title={`${album.total_tracks}`}>
        {album.total_tracks} 首
      </p>
    </li>
  );
}

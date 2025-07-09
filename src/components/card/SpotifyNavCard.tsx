'use client';

import Link from 'next/link';

interface SpotifyNavCardProps {
    href: string;
    title: string;
    description: string;
    className?: string;
}

export function SpotifyNavCard({ href, title, description, className = '' }: SpotifyNavCardProps) {
  return (
    <Link
      href={href}
      className={`block p-6 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer max-w-sm ${className}`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

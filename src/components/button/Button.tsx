'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/client/utils/cn'; // 用于合并 className

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-400 transition',
        className
      )}
    />
  );
}

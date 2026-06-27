import Image from 'next/image'
import { Trash2, ExternalLink } from 'lucide-react'

interface SidePanelItemProps {
  thumb: string
  title: string
  storeName: string
  price: number
  normalPrice: number
  savings: number
  onRemove: () => void
  onDetails?: () => void
}

export default function SidePanelItem({
  thumb,
  title,
  storeName,
  price,
  normalPrice,
  savings,
  onRemove,
  onDetails,
}: SidePanelItemProps) {
  return (
    <div className="flex gap-3 p-4 border-b border-zinc-800 last:border-0 group">
      <div className="relative flex-shrink-0 w-20 h-[37px]">
        <Image
          src={thumb || '/icon.webp'}
          alt={title}
          fill
          sizes="80px"
          className="rounded object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate text-white leading-tight">{title}</p>
        <p className="text-[11px] text-zinc-500 mt-0.5">{storeName}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="text-green-400 font-bold text-sm">${price.toFixed(2)}</span>
          {normalPrice > price && (
            <span className="text-[11px] line-through text-zinc-600">${normalPrice.toFixed(2)}</span>
          )}
          {savings > 0 && (
            <span className="text-[11px] text-yellow-300 font-medium bg-yellow-300/10 px-1 py-0.5 rounded">
              -{Math.round(savings)}%
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 ml-1 flex-shrink-0">
        {onDetails && (
          <button
            onClick={onDetails}
            aria-label={`Ver detalhes de ${title}`}
            className="p-1.5 rounded hover:bg-zinc-700 text-zinc-500 hover:text-white transition-colors"
          >
            <ExternalLink size={13} />
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remover ${title}`}
          className="p-1.5 rounded hover:bg-red-900/40 text-zinc-500 hover:text-red-400 transition-colors"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}

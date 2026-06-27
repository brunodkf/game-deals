'use client'

import { Game } from "@/app/context/GamesContext";
import { useCarrinho } from "@/app/context/CarrinhoContext";
import { useStores } from "@/app/context/StoresContext";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

function CartButton({ game }: { game: Game }) {
  const { addItem, openPanel, itens } = useCarrinho()
  const isInCart = itens.some((i) => i.id === game.gameID)

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    addItem({
      id: game.gameID,
      name: game.title,
      price: game.salePrice,
      thumb: game.thumb,
      storeID: game.storeID,
      normalPrice: game.normalPrice,
      savings: game.savings,
    })
    openPanel()
  }

  return (
    <button
      className={`rounded p-2 cursor-pointer transition-colors ${
        isInCart ? 'bg-purple-900' : 'bg-roxo-medio hover:opacity-80'
      }`}
      aria-label={`${isInCart ? 'Ver no' : 'Adicionar ao'} carrinho: ${game.title}`}
      onClick={handleClick}
    >
      <ShoppingCart size={14} className="text-branco" />
    </button>
  )
}

function StoreCell({ storeID }: { storeID: number }) {
  const { resolveStoreName } = useStores()
  return <span>{resolveStoreName(storeID)}</span>
}

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "title",
    header: "Jogo",
    cell: ({ row }) => {
      const { title, thumb } = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={thumb}
            alt={title}
            width={50}
            height={50}
            sizes="40px"
            className="w-10 h-10 rounded"
          />
          <span>{title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "salePrice",
    header: "Preço Atual",
    cell: ({ row }) => {
      const { salePrice } = row.original;
      return (
        <span className="text-roxo-medio font-semibold">
          ${salePrice.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "normalPrice",
    header: "Preço Original",
    cell: ({ row }) => {
      const { normalPrice } = row.original;
      return (
        <span className="line-through text-muted-foreground">
          ${normalPrice.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "savings",
    header: "Desconto",
    cell: ({ row }) => {
      const { savings } = row.original;
      return <span className="text-green-500">-{Math.round(savings)}%</span>;
    },
  },
  {
    accessorKey: "storeID",
    header: "Loja",
    cell: ({ row }) => <StoreCell storeID={row.original.storeID} />,
  },
  {
    accessorKey: "dealRating",
    header: "Nota",
    cell: ({ row }) => {
      const { dealRating } = row.original;
      return <span>{dealRating.toFixed(1)} ⭐</span>;
    },
  },
  {
    accessorKey: "cart",
    header: "",
    cell: ({ row }) => <CartButton game={row.original} />,
  },
];

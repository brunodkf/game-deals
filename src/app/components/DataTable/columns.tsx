// app/games/columns.ts
import { Game } from "@/app/context/GamesContext"
import { ColumnDef } from "@tanstack/react-table"
import { FaShoppingCart } from "react-icons/fa";


export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "title",
    header: "Jogo",
    cell: ({ row }) => {
      const game = row.original
      return (
        <div className="flex items-center gap-2">
          <img src={game.thumb} alt={game.title} className="w-10 h-10 rounded" />
          <span>{game.title}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "salePrice",
    header: "Preço Atual",
    cell: ({ row }) => (
      <span className="text-roxo-medio font-semibold">${Number(row.original.salePrice).toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "normalPrice",
    header: "Preço Original",
    cell: ({ row }) => (
      <span className="line-through text-muted-foreground">${Number(row.original.normalPrice).toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "savings",
    header: "Desconto",
    cell: ({ row }) => (
      <span className="text-green-500">-{Math.round(row.original.savings)}%</span>
    ),
  },
  {
    accessorKey: "storeID",
    header: "Loja",
    cell: ({ row }) => (
      <span>Loja #{row.original.storeID}</span>
    ),
  },
  {
    accessorKey: "dealRating",
    header: "Nota",
    cell: ({ row }) => (
      <span>{row.original.dealRating.toFixed(1)} ⭐</span>
    ),
  },
  {
    accessorKey: "cart",
    header: "",
    cell: ({ row }) => (
      <button className="bg-roxo-medio rounded p-2 cursor-pointer">
        <FaShoppingCart className='text-sm text-branco' />
      </button>
    ),
  },
]

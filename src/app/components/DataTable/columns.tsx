import { Game } from "@/app/context/GamesContext";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

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
    cell: ({ row }) => {
      const { storeID } = row.original;
      return <span>Loja #{storeID}</span>;
    },
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
    cell: ({ row }) => {
      return (
        <button
          className="bg-roxo-medio rounded p-2 cursor-pointer"
          aria-label={`Adicionar ${row.original.title} ao carrinho`}
        >
          <FaShoppingCart className="text-sm text-branco" />
        </button>
      );
    },
  },
];

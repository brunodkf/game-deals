"use client"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Game } from '@/app/context/GamesContext';
import { useState } from "react";
import { GameModal } from "../GameModal";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export function DataTable<TData extends Game, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

      const [selectedGame, setSelectedGame] = useState<Game | null>(null)
      const [isOpen, setIsOpen] = useState(false)
    
      const handleOpen = (game: Game) => {
        setSelectedGame(game)
        setIsOpen(true)
      }
    
      const handleClose = () => {
        setSelectedGame(null)
        setIsOpen(false)
      }
    

    return (
        <div className="rounded-md border border-cinza-suave">
            <Table>
                <TableHeader className="font-orbitron">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className="text-branco">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} className="cursor-pointer"   onClick={() => handleOpen(row.original)}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GameModal game={selectedGame} isOpen={isOpen} onClose={handleClose} />
        </div>
    )
}

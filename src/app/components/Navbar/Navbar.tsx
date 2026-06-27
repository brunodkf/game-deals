import React, { useState } from 'react'
import { ShoppingCart, Search, Heart, Gamepad2 } from 'lucide-react'
import { useGames } from '@/app/context/GamesContext'
import { useFavoritos } from '@/app/context/FavoritosContext'
import { useCarrinho } from '@/app/context/CarrinhoContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Navbar = () => {
    const { setSearch } = useGames();
    const { favoritos, openPanel: openFavoritos } = useFavoritos();
    const { itens, openPanel: openCarrinho } = useCarrinho();
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearch(inputValue);
        }
    }

    return (
        <section className='w-full h-auto py-3 flex flex-col items-center relative'>
            <nav className='container m-auto flex items-center justify-between px-2 md:px-0 border-b-1 pb-3 border-b-cinza-suave'>
                <div className="flex items-center">
                    <Gamepad2 className='text-4xl text-roxo-medio' />
                    <span className='font-orbitron font-extrabold text-roxo-medio'>GameDeal</span>
                </div>

                <div className="flex gap-5 items-center">
                    <Search
                        className='sm:hidden text-xl text-roxo-medio cursor-pointer'
                        onClick={() => setIsOpen(prev => !prev)}
                    />

                    <div className="hidden sm:block relative w-full max-w-sm">
                        <div className="flex w-full max-w-lg items-center space-x-2 border-muted-foreground">
                            <Input
                                type="text"
                                placeholder="Search games..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='z-0 border border-cinza-suave'
                            />
                            <Button
                                type="submit"
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 cursor-pointer"
                                onClick={() => setSearch(inputValue)}
                            >
                                <Search />
                            </Button>
                        </div>
                    </div>

                    {/* Favorites button with badge */}
                    <button
                        onClick={openFavoritos}
                        aria-label={`Lista de favoritos: ${favoritos.length} ${favoritos.length === 1 ? 'item' : 'itens'}`}
                        className="relative text-roxo-medio hover:opacity-75 transition-opacity cursor-pointer"
                    >
                        <Heart size={24} />
                        {favoritos.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[9px] font-bold leading-none rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5 pointer-events-none">
                                {favoritos.length > 9 ? '9+' : favoritos.length}
                            </span>
                        )}
                    </button>

                    {/* Cart button with badge */}
                    <button
                        onClick={openCarrinho}
                        aria-label={`Carrinho de compras: ${itens.length} ${itens.length === 1 ? 'item' : 'itens'}`}
                        className="relative text-roxo-medio hover:opacity-75 transition-opacity cursor-pointer"
                    >
                        <ShoppingCart size={24} />
                        {itens.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-purple-500 text-white text-[9px] font-bold leading-none rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5 pointer-events-none">
                                {itens.length > 9 ? '9+' : itens.length}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            <div className={`${isOpen ? 'flex' : 'hidden'} w-full left-0 sm:hidden p-4`}>
                <div className="w-full items-center space-x-2 border-muted-foreground">
                    <Input
                        type="text"
                        placeholder="Search games..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='z-0 border border-cinza-suave'
                    />
                    <Button
                        type="submit"
                        className="absolute right-5 top-8/12 -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 cursor-pointer"
                        onClick={() => setSearch(inputValue)}
                    >
                        <Search />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Navbar

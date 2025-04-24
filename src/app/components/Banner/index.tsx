'use client'
import { Game, useGames } from '@/app/context/GamesContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Banner = () => {
    const { games } = useGames()
    
    const [randomBanner, setRandomBanner] = useState<Game>()

    console.log(randomBanner)

    useEffect(() => {
        if (games?.length > 0) {
            const randomItem = Math.floor(Math.random() * games.length)
            setRandomBanner(games[randomItem])
        }
    }, [games])

    return (
        <section className=" banner hidden relative rounded-xl overflow-hidden xl:flex items-center gap-6 mx-4 px-6 py-4 text-white transition-all  bg-[url(/banner.webp)] bg-cover bg-center">
      

            {randomBanner?.thumb && (
                <Image
                    src={randomBanner.thumb}
                    alt={randomBanner.title || 'Banner'}
                    width={300}
                    height={170}
                    className="rounded-lg shadow-md object-cover z-10"
                    priority
                />
            )}

            <div className=" inset-0 flex flex-col justify-center items-start px-6 text-white z-10">
                <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg font-orbitron">
                    {randomBanner?.title}
                </h2>

                {randomBanner?.savings && (
                    <span className="mt-2 text-sm text-green-400 font-semibold">
                        Economia de {Number(randomBanner.savings).toFixed(0)}%
                    </span>
                )}

                {randomBanner?.salePrice && (
                    <p className="mt-1 text-lg font-semibold">
                        Por apenas <span className="text-amber-300">R$ {randomBanner.salePrice.toFixed(2)}</span>
                    </p>
                )}

                <Link
                    href={randomBanner?.dealID ? `https://www.cheapshark.com/redirect?dealID=${randomBanner.dealID}` : '#'}
                    target="_blank"
                    className="mt-4 bg-roxo-medio hover:bg-roxo-claro transition-colors px-4 py-2 rounded-md font-medium"
                >
                    Ver oferta
                </Link>
            </div>
        </section>
    )
}

export default Banner

import React from 'react'
import { IoGrid } from "react-icons/io5";
import { IoList } from "react-icons/io5";


export default function FilterControls() {

    return (
        <div className="hidden w-full h-10 lg:flex items-center justify-between my-2">

            <p className='font-orbitron font-semibold' >Os melhores jogos aqui :</p>

            <div className="flex gap-2 text-branco">
                <button className='text-2xl cursor-pointer hover:text-roxo-medio '><IoList /></button>

                <span className='text-cinza-suave'>|</span>
                
                <button className='text-xl cursor-pointer hover:text-roxo-medio '><IoGrid /></button>
            </div>

        </div>

    )
}
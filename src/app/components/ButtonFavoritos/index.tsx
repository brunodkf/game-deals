import { useFavoritos } from '@/app/context/FavoritosContext'
import { Game } from '@/app/context/GamesContext'

interface ButtonFavoritosProps {
    game: Game | null
}

const ButtonFavoritos = ({ game }: ButtonFavoritosProps) => {
    const { favoritos, adicionarFavorito, removerFavorito } = useFavoritos();

    if (!game) return null;

    const currentGame: Game = game;

    const isFavorito = favoritos.some((item) => item.id === currentGame.gameID);

    function handleClick() {
        if (isFavorito) {
            removerFavorito(currentGame.gameID);
        } else {
            adicionarFavorito({
                id: currentGame.gameID,
                name: currentGame.title,
                price: currentGame.salePrice,
                thumb: currentGame.thumb,
                storeID: currentGame.storeID,
                normalPrice: currentGame.normalPrice,
                savings: currentGame.savings,
            });
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`inline-flex items-center gap-2 mt-4 font-medium py-2 px-4 rounded transition cursor-pointer ${
                isFavorito ? 'bg-purple-800 text-purple-200' : 'bg-roxo-medio hover:opacity-80 text-white'
            }`}
        >
            {isFavorito ? '✓ Nos Favoritos' : '+ Lista de Favoritos'}
        </button>
    );
}

export default ButtonFavoritos

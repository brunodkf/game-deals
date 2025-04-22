import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");

    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {

    return new Response( error + "Erro ao buscar dados das criptomoedas", {
      status: 500,
    });
  }
}
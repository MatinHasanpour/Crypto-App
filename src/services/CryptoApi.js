const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-whZtXC28hv5wR2kXw61rRYQq";

const getCoinList = (page, currency) => {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=${page}&x_cg_demo_api_key=${API_KEY}`;
};

const searchCoin = (query) =>
  `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

const marketChart = (coin) =>
  `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=4&x-cg_demo_api_key=${API_KEY}`;

export { getCoinList, searchCoin, marketChart };

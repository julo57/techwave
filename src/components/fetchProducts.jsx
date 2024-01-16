import axios from 'axios';

const fetchProducts = async (searchTerm) => {
  try {
    const response = await axios.get('https://techwavework.000.pe/api/products', {
      params: { search: searchTerm }
    });
    console.log(response.data); // Sprawdź strukturę odpowiedzi
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania danych produktów:', error);
    return [];
  }
};

export default fetchProducts;

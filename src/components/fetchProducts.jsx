import axios from 'axios';

const fetchProducts = async (searchTerm) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products`, {
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

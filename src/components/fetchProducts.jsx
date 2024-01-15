import axios from 'axios';

const fetchProducts = async (searchTerm) => {
  try {
    const response = await axios.get(`http://techwave-online-shop.wuaze.com/api/products`, {
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

import axios from 'axios';

const API_BASE_URL = 'https://api.fda.gov/drug';

export const drugService = {
  async searchDrugs(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}/label.json`, {
        params: {
          search: query,
          limit: 10,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching drugs:', error);
      throw error;
    }
  },
};
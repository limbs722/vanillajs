import axios from 'axios';

const catApi = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/images/search?limit=100',
});

export const apiGetImages = async ({ query = '' }: { query?: string }) => {
    const response = await catApi({
        url: query ? `&q=${query}` : '',
    });

    return response.data || [];
};

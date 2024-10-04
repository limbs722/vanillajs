import axios from 'axios';

const catApi = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/images/search?limit=100',
});

export const apiGetImages = async ({
    query = '',
    page = 1,
}: {
    query?: string;
    page?: number;
}) => {
    const response = await catApi({
        params: {
            query,
            page,
        },
    });

    return response.data || [];
};

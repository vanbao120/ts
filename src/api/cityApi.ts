import axiosClient from './axiosClient'
import { ListResponse, City } from 'models'

const cityApi = {
    getAll(): Promise<ListResponse<City>> {
        const url = '/cities'
        return axiosClient.get(url, { params: {
            _page: 1,
            limit: 10,
        }})
    }
}

export default cityApi
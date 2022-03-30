import axiosClient from './axiosClient'
import { ListParams, ListResponse, Students } from 'models'

const studentsApi = {
    getAll(params: ListParams): Promise<ListResponse<Students>> {
        const url = `/students`
        return axiosClient.get(url, { params: params})
    },

    getById(id: string): Promise<Students> {
        const url = `/students/${id}`
        return axiosClient.get(url)
    },

    add(data: Students): Promise<Students> {
        const url = `/students`
        return axiosClient.post(url, data)
    },

    update(data: Students): Promise<Students> {
        const url = `/students`
        return axiosClient.patch(url, data)
    },

    remove(id: string): Promise<any> {
        const url = `/students/${id}`
        return axiosClient.delete(url)
    },
}

export default studentsApi
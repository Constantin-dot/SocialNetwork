import {GetItemsType, instance, APIResponseType} from "./api";

export const usersApi = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow: (id: number) => {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(res => res.data)
    },
    unfollow: (id: number) => {
        return instance.delete(`follow/${id}`)
            .then(res => res.data) as Promise<APIResponseType>
    }
}
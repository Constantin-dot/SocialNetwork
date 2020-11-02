import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "412171fb-414b-4486-844b-64550797222a"
    }
});

export const usersApi = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow: (id: string) => {
        return instance.post(`follow/${id}`)
    },
    unfollow: (id: string) => {
        return instance.delete(`follow/${id}`)
    },
    getProfile: (userId: number|null) => {
        console.warn('Obsolete method. Please, profileAPI object.')
        return profileApi.getProfile(userId);
    }
}

export const profileApi = {
    getProfile: (userId: number|null) => {
        return instance.get(`profile/` + userId)
    },
    getStatus: (userId: string | undefined) => {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus: (status: string) => {
        return instance.put(`profile/status`, {status: status})
    },
}

export const authApi = {
    me: () => {
        return instance.get(`auth/me`)
    },
    login: (email: string, password: string, rememberMe = false) => {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout: () => {
        return instance.delete(`auth/login`)
    }
}


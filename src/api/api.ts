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
            .then(response => {
                return response.data
            });
    },
    follow: (id: string) => {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data
            });
    },
    unfollow: (id: string) => {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            });
    },
    getProfile: (userId: number|null) => {
        console.warn('Obsolete method. Please, profileAPI object.')
        return profileApi.getProfile(userId);
    }
}

export const profileApi = {
    getProfile: (userId: number|null) => {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data
            });
    },
    getStatus: (userId: string | undefined) => {
        return instance.get(`profile/status/` + userId)
            .then(response => {
                return response.data
            });
    },
    updateStatus: (status: string) => {
        return instance.put(`profile/status`, {status: status})
            .then(response => {
                return response.data
            });
    },
}

export const authApi = {
    me: () => {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            });
    },
    login: (email: string, password: string, rememberMe = false) => {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data;
            });
    },
    logout: () => {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            });
    }
}


import {instance, APIResponseType} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type SavePhotoResponseDataType = {
    photos: PhotosType
}
export const profileApi = {
    getProfile: (userId: number | null) => {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(res => res.data)
    },
    getStatus: (userId: number | undefined) => {
        return instance.get<string>(`profile/status/` + userId)
            .then(res => res.data)
    },
    updateStatus: (status: string) => {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
            .then(res => res.data)
    },
    savePhoto: (photoFile: File) => {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {"Content-Type": "multipart/form-data"}})
            .then(res => res.data)
    },
    saveProfile: (profile: ProfileType) => {
        return instance.put<APIResponseType>(`profile`, profile)
            .then(res => res.data)
    }
}
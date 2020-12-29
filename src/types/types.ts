export type PhotosType = {
    "small": string | null
    "large": string | null
}

export type ContactsType = {
    "facebook": string | null
    "website": string | null
    "vk": string | null
    "twitter": string | null
    "instagram": string | null
    "youtube": string | null
    "github": string | null
    "mainLink": string | null
}

export type ProfileType = {
    "aboutMe": string | null,
    "contacts": ContactsType,
    "lookingForAJob": boolean,
    "lookingForAJobDescription": string | null,
    "fullName": string | null,
    "userId": number,
    "photos": PhotosType
}

export type PostType = {
    id: string
    message: string
    likeCount: number
}

export type LocationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    name: string
    status: string,
    location: LocationType
    followed: boolean
    photos: PhotosType
}

export type DialogsFormDataType = {
    newMessageBody: string
}

// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> =
//     ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
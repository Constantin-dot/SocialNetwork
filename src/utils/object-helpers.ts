import {UserType} from "../redux/users-reducer";

export const updateObjectInArray = (items: Array<UserType>, itemId: string, objPropName: string, newObjProps: { followed: boolean }) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
};

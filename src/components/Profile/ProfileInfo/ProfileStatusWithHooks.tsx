import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const setEditModeOn = () => {
        setEditMode(true)
    }
    const setEditModeOff = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
            <div>
                <span
                    onDoubleClick={setEditModeOn}
                >{props.status || "-----"}</span>
            </div>
            }
            { editMode &&
            <div>
                <input
                    autoFocus={true}
                    onChange={onStatusChange}
                    onBlur={setEditModeOff}
                    value={status}
                />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;
import s from './Profile.module.css'
import avatar from '../../common/img/Sample_User_Icon.png'
import {editProfileTC, ProfileType} from "./profileReducer";
import React, {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@material-ui/core";
import {RequestStatusType} from "../../../app/app-reducer";
import {CircularProgress, IconButton, Stack} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import {PhotoCamera} from "@material-ui/icons";
import {useAppDispatch} from "../../../app/hooks";


type ProfilePropsType = {
    profile: ProfileType
    logOutHandler: () => void
    EditMode: (newName: string | null) => void
    status: RequestStatusType
    changeAvatar: (ava: any) => void

}

const Profile: React.FC<ProfilePropsType> = ({profile, logOutHandler, status}) => {
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(profile.name)
    const [newAvatar, setNewAvatar] = useState('');


    const activateEditMode = () => {
        setEditMode(true)
        setName(profile.name)
    }
    const activateViewMode = () => {
        setEditMode(false)
        dispatch(editProfileTC(name, newAvatar))
        setNewAvatar('');

    }

    const ViewModeBlur = (e: any) => e.preventDefault()


    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)


    const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const reader = new FileReader();
        const avatarFile = e.target.files && e.target.files[0];

        if (avatarFile) {
            formData.append('avatarFile', avatarFile, avatarFile.name);

            reader.onloadend = () => reader.result && setNewAvatar(reader.result as string);

            reader.readAsDataURL(avatarFile)
            setNewAvatar(window.URL.createObjectURL(avatarFile))
        }
    }

    const CardsMessage = profile.publicCardPacksCount === 0
        ? `You don't have any cards yet`
        : `Count cards you have is ${profile.publicCardPacksCount}`

    const imgClassName = editMode ? `${s.editModeImg}` : `${s.avatar}`

    return (
        <div className={s.profileBox}>
            {status === 'loading' && <CircularProgress/>}
            <Stack direction="row" spacing={5}>
                <Button color="success"
                        onClick={activateEditMode}
                        disabled={editMode}
                        endIcon={<EditSharpIcon/>}> Edit </Button>
                <Button color="success"
                        onClick={logOutHandler}
                        endIcon={<LogoutIcon/>}>Log Out</Button>

            </Stack>
            <div className={s.avatarBox}>
                <img className={imgClassName}
                     src={newAvatar ? newAvatar : profile.avatar || avatar}
                     alt={'avatar'}/>
            </div>
            {editMode
                ? <>
                    <IconButton
                        onMouseDown={ViewModeBlur}
                        className={s.editAvatarBtn}
                        sx={{color: 'grey'}}
                        aria-label="upload picture"
                        component="label"
                    >
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={onChangeAvatar}/>
                        <PhotoCamera fontSize="large"/>
                    </IconButton>


                    <TextField variant={'standard'}
                               error={name === ""}
                               value={name}
                               onChange={onChangeNameHandler}
                               autoFocus/>

                    <Button color="success" onClick={activateViewMode}> Save </Button>
                </>
                :
                <>
                    <span className={s.name}>Hello, {profile.name}</span>
                    <p>{CardsMessage}</p>
                </>
            }

        </div>
    )
};

export default Profile


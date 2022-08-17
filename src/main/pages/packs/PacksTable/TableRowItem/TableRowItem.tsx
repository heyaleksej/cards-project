import React, {useState} from 'react';
import {memo} from 'react';
import styles from './TableRowItem.module.css';
import {RequestStatusType} from "../../../../../app/app-reducer";
import TableCell from "@mui/material/TableCell";
import {useNavigate} from "react-router-dom";
import {ModalConfirmDelete} from "../../../../common/Modal/ModalConfirmDelete";
import {ModalChangeData} from '../../../../common/Modal/ModalChangeData';
import TableRow from "@mui/material/TableRow";
import {IconButton} from "@mui/material";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import {shorter} from "../../../../utils/shorter";


type TableRowPackType = {
    _id: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
    user_id: string
    status: RequestStatusType
    myId: string | null
    updatePack: (packId: string, value: string) => void
    deletePack:(packId:string)=>void
    SendPackId:(_id: string, name: string )=>void

}

export const TableRowItem = memo((props: TableRowPackType) => {
    const navigate = useNavigate();
    const {_id, user_id, name, cardsCount, updated, user_name, status, myId, updatePack, deletePack, SendPackId} = props;
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [value, setValue] = useState<string>(name)
    const disabled = myId !== user_id || status === 'loading'


    const SendPackIdHandler = () => {
        SendPackId(_id, name);
        navigate(`/cards/${_id}`);
    };

    const confirmRemovePack = (packId: string) => {
        deletePack(packId)
        closeDeleteModalForm()
    }
    const handleLearnPack = () => navigate(`/learn-pack/${_id}`)
    const closeDeleteModalForm = () => setActiveModalDelete(false)
    const closeUpdateModalForm = () => setActiveModalUpdate(false)
    const onChangeTextUpdateHandler = (value: string) => setValue(value)
    const closeUpdateModal = () => closeUpdateModalForm()

    const updatePackHandler = (packId: string, value: string) => {
        updatePack(packId, value)
        closeUpdateModalForm()
    }

    return (
        <TableRow sx={{display: 'grid', gridTemplateColumns: '25% 8% 24% 15% 28%'}}>
            <TableCell component="th" scope="row" className={styles.sell}>
                <span style={{display: 'inline-block', flex: '1 1 auto'}}>{shorter(name, 20)}</span>
                <IconButton
                    disabled={status === 'loading' || !cardsCount}
                    aria-label="expand row"
                    size="small"
                    onClick={SendPackIdHandler}
                >
                    <DriveFolderUploadIcon/>
                </IconButton>
            </TableCell>
            <TableCell className={styles.sell}>{cardsCount}</TableCell>
            <TableCell className={styles.sell}>
                {new Date(updated).toLocaleDateString()}
            </TableCell>
            <TableCell className={styles.sell}>
                {shorter(user_name, 20)}
            </TableCell>
            <TableCell align="center" className={styles.ButtonGroup}>


                <IconButton sx={{color: 'darkgreen'}} onClick={() => {
                    setActiveModalUpdate(true)
                }}
                            disabled={disabled}>
                    <SettingsIcon/>
                </IconButton>

                {activeModalUpdate && <ModalChangeData
                    packId={_id}
                    isAddingForm={false}
                    closeModal={closeUpdateModal}
                    input={value}
                    onChangeText={onChangeTextUpdateHandler}
                    addTextHandler={updatePackHandler}
                    title='Please, enter new pack name'
                />}

                <IconButton sx={{color: 'darkgreen'}} onClick={() => {
                    setActiveModalDelete(true)
                }}
                            disabled={disabled}>
                    <DeleteIcon/>
                </IconButton>

                {activeModalDelete && <ModalConfirmDelete
                    packID={_id}
                    confirmHandler={confirmRemovePack}
                    closeModal={closeDeleteModalForm}
                    title='Are you sure you want to delete this pack?'/>}


                <IconButton type={'submit'}
                            sx={{color: 'darkgreen'}}
                            disabled={status === 'loading' || !cardsCount}
                            onClick={handleLearnPack}>
                    <SchoolIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
});
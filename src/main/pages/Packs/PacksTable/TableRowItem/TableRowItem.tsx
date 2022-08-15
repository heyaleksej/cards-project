import React, {useState} from 'react';
import {memo} from 'react';
import styles from './TableRowItem.module.css';
import {RequestStatusType} from "../../../../../app/app-reducer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {IconButton} from "@mui/material";
import {setUserCardId, setUserCardName} from "../../../Cards/cardsReducer";
import {useNavigate} from "react-router-dom";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {ModalConfirmDelete} from "../../../../common/Modal/ModalConfirmDelete";
import {deletePackTC, updatePackTC} from "../../packsListReducer";
import {ModalChangeData} from '../../../../common/Modal/ModalChangeData';
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
}


export const TableRowItem = memo((props: TableRowPackType) => {
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)

    const {_id, user_id, name, cardsCount, updated, user_name, status} = props;
    const userId = useAppSelector(state => state.profile.profile._id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState<string>(name)



    const handleSendPackId = () => {
        dispatch(setUserCardId(_id));
        dispatch(setUserCardName(name));
        navigate(`/cards/${_id}`);
    };

    const handleLearnPack = () => navigate(`/learn-pack/${_id}`)

    const confirmRemovePack = (packId: string) => {
        console.log('packId', packId)
        dispatch(deletePackTC(packId))
        closeDeleteModalForm()
    }

    const closeDeleteModalForm = () => setActiveModalDelete(false)
    const closeUpdateModalForm = () => setActiveModalUpdate(false)
    const onChangeTextUpdateHandler = (value: string) => setValue(value)

    const closeUpdateModal = () => {
        closeUpdateModalForm()
    }

    const updatePack = (packId: string, value: string) => {
        dispatch(updatePackTC(packId, value))
        closeUpdateModalForm()
    }

    return (
        <>
            <TableRow sx={{display: 'grid', gridTemplateColumns: '25% 8% 24% 15% 28%'}}>
                <TableCell component="th" scope="row" className={styles.sell}>
                    <span style={{display: 'inline-block', flex: '1 1 auto'}}>{shorter(name, 20)}</span>
                    <IconButton
                        disabled={status === 'loading'}
                        aria-label="expand row"
                        size="small"
                        onClick={handleSendPackId}
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

                    <>
                        <IconButton sx={{color:'darkgreen'}} onClick={() => {setActiveModalUpdate(true)}}
                                disabled={user_id !== userId || status === 'loading'}>
                            <SettingsIcon/>
                        </IconButton>

                        {activeModalUpdate && <ModalChangeData
                            packId={_id}
                            isAddingForm={false}
                            closeModal={closeUpdateModal}
                            input={value}
                            onChangeText={onChangeTextUpdateHandler}
                            addTextHandler={updatePack}
                            title='Please, enter new pack name'
                        />}

                        <IconButton sx={{color:'darkgreen'}} onClick={() => {setActiveModalDelete(true)}}
                                disabled={user_id !== userId || status === 'loading'}>
                            <DeleteIcon/>
                        </IconButton>

                        {activeModalDelete && <ModalConfirmDelete
                            packID={_id}
                            confirmHandler={confirmRemovePack}
                            closeModal={closeDeleteModalForm}
                            title='Are you sure you want to delete this pack?'/>}

                    </>

                    <IconButton type={'submit'} sx={{color:'darkgreen'}}
                            disabled={!cardsCount || status === 'loading'}
                            onClick={handleLearnPack}><SchoolIcon/></IconButton>
                </TableCell>
            </TableRow>
        </>
    )
});
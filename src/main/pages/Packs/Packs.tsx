import Button from '@mui/material/Button';
import React, {useState} from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import PacksTable from "./PacksTable/PacksTable";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import s from './Packs.module.css'
import Stack from '@mui/material/Stack';
import {ModalChangeData} from '../../common/Modal/ModalChangeData';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addPackTC} from "./packsListReducer";
import {CardSlider} from "../../common/CardSlider/CardSlider";

type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    addPackHandler: () => void
    deletePack: (id: string) => void
    changeName: (id: string) => void
}

export const Packs = (props: PacksPropsType) => {
    const dispatch = useAppDispatch()
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const packId = useAppSelector(state => state.cardPack.cardsPack_id);
    const [packName, setPackName] = useState<string>('')



    const onClickAddPackHandler = () => {
        debugger
        dispatch(addPackTC(packName))
        closeModal()
    }

    const closeModal = () => {
        setActiveModal(false)
    }
    const onChangeTextHandler = (value: string) => setPackName(value)


    return (
        <div>
            <span className={s.Addbtn}>
                <div>
                    <Stack direction='row' spacing={2}>
                    <Button color='success' variant="contained" onClick={props.getAllPacks}>All packs</Button>
                    <Button color='success' variant="contained" onClick={props.getOnlyMyPacks}>My packs</Button>
                </Stack>
                </div>
                    <CardSlider/>
                <div>
                    <Button color='success'
                            variant="contained"
                            startIcon={<LibraryAddIcon/>}
                            onClick={() => {setActiveModal(true)}}
                            disabled={props.status === 'loading'}>
                        Add pack
                    </Button>
                </div>


                {activeModal && <ModalChangeData
                    packId={packId}
                    closeModal={closeModal}
                    input={packName}
                    onChangeText={onChangeTextHandler}
                    addNewItemHandler={onClickAddPackHandler}
                    isAddingForm={true}
                    title='Please, enter the name of the pack'/>}
            </span>
            <PacksTable/>


        </div>
    )
}
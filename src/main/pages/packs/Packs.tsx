import Button from '@mui/material/Button';
import React, {useState} from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import PacksTable from "./PacksTable/PacksTable";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import s from './Packs.module.css'
import Stack from '@mui/material/Stack';
import {ModalChangeData} from '../../common/Modal/ModalChangeData';
import {CardSlider} from "../../common/CardSlider/CardSlider";
import { PackType } from '../../../api/cards&packsAPI/PacksAPI';

type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    myId: string | null
    packId: string
    cardPacks: PackType[]
    totalCardsCount: number
    page: number
    pageCount: number
    updatePack: (packId: string, value: string) => void
    SendPackId:(_id: string, name: string )=>void
    deletePack:(packId:string)=>void
    addPack:(packName:string)=>void

}

export const Packs = React.memo((props: PacksPropsType) => {

    const {packId, status, getAllPacks,
        getOnlyMyPacks, myId, cardPacks,
        totalCardsCount, page, pageCount,
        SendPackId, updatePack, deletePack, addPack} = props;


    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [packName, setPackName] = useState<string>('')


    const onClickAddPackHandler = () => {
        addPack(packName)
        closeModal()
    }
    const openModalForm = () => setActiveModal(true)
    const closeModal = () => setActiveModal(false)
    const onChangeTextHandler = (value: string) => setPackName(value)


    return (
        <div>
            <span className={s.addBtn}>
                <div>
                    <Stack direction='row' spacing={2}>
                       <Button color='success' variant="contained" onClick={getAllPacks}>All packs</Button>
                       <Button color='success' variant="contained" onClick={getOnlyMyPacks}>My packs</Button>
                    </Stack>
                </div>
                    <CardSlider/>
                <div>
                    <Button color='success'
                            variant="contained"
                            startIcon={<LibraryAddIcon/>}
                            onClick={openModalForm}
                            disabled={status === 'loading'}>
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
            <PacksTable myId={myId}
                        cardPacks={cardPacks}
                        status={status}
                        totalCardsCount={totalCardsCount}
                        page={page}
                        pageCount={pageCount}
                        SendPackId={SendPackId}
                        updatePack={updatePack}
                        deletePack={deletePack}
            />
        </div>
    )
})
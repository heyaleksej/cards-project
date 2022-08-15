const initialState: TablePacksType = {
    packName: '',
    sortPacks: '',
    page: 1,
    pageCount: 15,
    user_id: '',
    min: 0,
    max: 110,
    packId: '',
    name: ''
};

export const packsTableReducer = (state: TablePacksType = initialState, action: TablePacksActionsType): TablePacksType => {
  switch (action.type) {
        case 'TABLE-PACKS/SET-PAGE':
            return {...state, page: action.page};
        case 'TABLE-PACKS/SET-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'TABLE-PACKS/SET-SORT-PACK-NAME':
            return {...state, sortPacks: action.sortPackName};
      case 'TABLE-PACKS/SET-SEARCH-PACK-NAME':
          return {...state, packName: action.searchPackName};
      case 'TABLE-PACKS/SET-MIN-NUMBER-CARDS':
          return {...state, min: action.min};
      case 'TABLE-PACKS/SET-MAX-NUMBER-CARDS':
          return {...state, max: action.max};
        default:
            return state;
    }
};

export const setPage = (page: number) => ({
    type: 'TABLE-PACKS/SET-PAGE',
    page,
} as const);

export const setCardsPageCount = (pageCount: number) => ({
    type: 'TABLE-PACKS/SET-PAGE-COUNT',
    pageCount,
} as const);

export const setSortPackName = (sortPackName: string) => ({
    type: 'TABLE-PACKS/SET-SORT-PACK-NAME',
    sortPackName,
} as const);

export const setSearchPackName = (searchPackName: string) => ({
    type: 'TABLE-PACKS/SET-SEARCH-PACK-NAME',
    searchPackName,
} as const);

export const setMinNumberCards = (min: number) => ({
    type: 'TABLE-PACKS/SET-MIN-NUMBER-CARDS',
    min,
} as const);

export const setMaxNumberCards = (max: number) => ({
    type: 'TABLE-PACKS/SET-MAX-NUMBER-CARDS',
    max,
} as const);


export type TablePacksActionsType =
    | ReturnType<typeof setPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof setSortPackName>
    | ReturnType<typeof setSearchPackName>
    | ReturnType<typeof setMinNumberCards>
    | ReturnType<typeof setMaxNumberCards>

export type TablePacksType = {
    packName: string
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
    min: number
    max: number,
    packId: string,
    name: string
}
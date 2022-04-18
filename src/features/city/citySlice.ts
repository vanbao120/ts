import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListResponse } from "models";

interface CityState {
    loading: boolean;
    list: City[]
}

const initialState: CityState = {
    loading: false,
    list: []
}
const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCitySuccess(state, actions: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.list = actions.payload.data
        },
        fetchCityFailed(state) {
            state.loading = false;
        },
    }
})

export const cityActions = citySlice.actions

export const selectCity = (state: RootState) => state.city.list
export const selectCityMap = createSelector(selectCity, (cityList) => cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city
    return map
}, {}))

const cityReducer = citySlice.reducer
export default cityReducer


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Students } from "models";

export interface DashboardStatistics {
    maleCount: number
    femaleCount: number
    highMarkCount: number
    lowMarkCount: number
}

export interface RankingByCityList {
    cityId: string
    cityName: string
    rankingList: Students[]
}

export interface dashboardState {
    loading: boolean;
    statistics: DashboardStatistics
    highestStudentList: Students[]
    lowestStudentList: Students[]
    rankingCityByList: RankingByCityList[]
}

const initialState: dashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0
    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingCityByList: []
}
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
        },
        fetchDataSuccess(state) {
            state.loading = false;
        },
        fetchDataFailed(state) {
            state.loading = false;
        },

        setStatistics(state, action: PayloadAction<DashboardStatistics>) {
            state.statistics = action.payload
        },
        setHighestList(state, action: PayloadAction<Students[]>) {
            state.highestStudentList = action.payload
        },
        setLowestList(state, action: PayloadAction<Students[]>) {
            state.lowestStudentList = action.payload
        },
        setRankings(state, action: PayloadAction<RankingByCityList[]>) {
            state.rankingCityByList = action.payload
        },
    }
})

//Action
export const dashboardAction = dashboardSlice.actions
//Selectors
export const selectDashBoardLoading = (state: RootState) => state.dashboard.loading
export const selectDashBoardStatistic = (state: RootState) => state.dashboard.statistics
export const selectDashBoardHighestList = (state: RootState) => state.dashboard.highestStudentList
export const selectDashBoardLowestList = (state: RootState) => state.dashboard.lowestStudentList
export const selectDashBoardRankings = (state: RootState) => state.dashboard.rankingCityByList
//Reducer
const dashboardReducer = dashboardSlice.reducer
export default dashboardReducer
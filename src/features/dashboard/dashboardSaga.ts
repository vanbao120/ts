import cityApi from "api/cityApi";
import studentsApi from "api/studentApi";
import { City, ListResponse, Students } from "models";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { dashboardAction, RankingByCityList } from "./dashboardSlice";

function* fetchStatistics() {
    const responseList: Array<ListResponse<Students>> = yield all([
        call(studentsApi.getAll, {
            _page: 1,
            _limit: 1,
            gender: 'male'
        }),
        call(studentsApi.getAll, {
            _page: 1,
            _limit: 1,
            gender: 'female'
        }),
        call(studentsApi.getAll, {
            _page: 1,
            _limit: 1,
            mark_gte: 8,
        }),
        call(studentsApi.getAll, {
            _limit: 1,
            _page: 1,
            mark_gte: 5,
        })
    ])

    const statisticList = responseList.map((x) => x.pagination._totalRows)
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList
    yield put(dashboardAction.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }))
}

function* fetchHighestList() {
    const { data }: ListResponse<Students> = yield call(studentsApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc'
    })
    
    yield put(dashboardAction.setHighestList(data))
}

function* fetchLowestList() {
    const { data }: ListResponse<Students> = yield call(studentsApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc'
    })
    yield put(dashboardAction.setLowestList(data))
}

function* fetchRankings() {
    //fetch city list
    const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll)

    //fetch ranking per city
    const callList = cityList.map(x =>
        call(studentsApi.getAll, {
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'desc',
            city: x.code
        }))
        const responseList: Array<ListResponse<Students>> = yield all(callList)
        const rankingList: Array<RankingByCityList> = responseList.map((x, idx) => ({
            cityId: cityList[idx].code,
            cityName: cityList[idx].name,
            rankingList: x.data
        }))
    //update state
    yield put(dashboardAction.setRankings(rankingList))
}

function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestList),
            call(fetchLowestList),
            call(fetchRankings),
        ])
        yield put(dashboardAction.fetchDataSuccess())
    } catch (err) {
        console.log('Failed', err);
        yield put(dashboardAction.fetchDataFailed())
    }
}

export function* dashboardSaga() {
    yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData)
}
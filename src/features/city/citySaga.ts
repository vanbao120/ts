import cityApi from "api/cityApi";
import { City, ListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll)
        yield put(cityActions.fetchCitySuccess(response))
    } catch (err) {
        console.log(err);
        yield put(cityActions.fetchCityFailed())
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList)
}
import { PayloadAction } from "@reduxjs/toolkit";
import studentsApi from "api/studentApi";
import { ListParams, ListResponse, Students } from "models";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { studentAction } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Students> = yield call(studentsApi.getAll, action.payload)
        yield put(studentAction.fetchStudentListSuccess(response))
    } catch (err) {
        console.log('Failed', err);
        yield put(studentAction.fetchStudentListFailed())
    }
}

function* handleSearch(action: PayloadAction<ListParams>) {
    yield put(studentAction.setFilter(action.payload))
}
export default function* studentSaga() {
    yield takeLatest(studentAction.fetchStudentList, fetchStudentList)
    yield debounce(500, studentAction.setFilterWithDebounce.type, handleSearch)
}
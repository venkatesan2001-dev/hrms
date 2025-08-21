import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/",
});
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
} from "../slices/usersSlice";
import {
  fetchAllocations,
  fetchAllocationsSuccess,
  fetchAllocationsFailure,
  createAllocation,
  createAllocationSuccess,
  createAllocationFailure,
} from "../slices/payrollSlice";
import {
  fetchPayruns,
  fetchPayrunsSuccess,
  fetchPayrunsFailure,
  generatePayrun,
  generatePayrunSuccess,
  generatePayrunFailure,
  processPayrun,
  processPayrunSuccess,
  processPayrunFailure,
} from "../slices/payrunSlice";

// Users
function* fetchUsersWorker() {
  try {
    const { data } = yield call(api.get, "/api/users");
    yield put(fetchUsersSuccess(data));
  } catch (e) {
    yield put(fetchUsersFailure(e.message));
  }
}

function* createUserWorker(action) {
  try {
    const { data } = yield call(api.post, "/api/users", action.payload);
    yield put(createUserSuccess(data));
  } catch (e) {
    yield put(createUserFailure(e.message));
  }
}

function* deleteUserWorker(action) {
  try {
    const id = action.payload;
    yield call(api.delete, `/api/users/${id}`);
    yield put(deleteUserSuccess(id));
  } catch (e) {
    yield put(deleteUserFailure(e.message));
  }
}

// Payroll allocations
function* fetchAllocationsWorker(action) {
  try {
    const userId = action.payload;
    const { data } = yield call(api.get, `/api/payroll/${userId}`);
    yield put(fetchAllocationsSuccess({ userId, allocations: data }));
  } catch (e) {
    yield put(fetchAllocationsFailure(e.message));
  }
}

function* createAllocationWorker(action) {
  try {
    const { data } = yield call(api.post, "/api/payroll", action.payload);
    yield put(createAllocationSuccess({ user: data.user, allocation: data }));
  } catch (e) {
    yield put(createAllocationFailure(e.message));
  }
}

// Payrun
function* fetchPayrunsWorker() {
  try {
    const { data } = yield call(api.get, "/api/payrun");
    yield put(fetchPayrunsSuccess(data));
  } catch (e) {
    yield put(fetchPayrunsFailure(e.message));
  }
}

function* generatePayrunWorker(action) {
  try {
    const { data } = yield call(
      api.post,
      "/api/payrun/generate",
      action.payload
    );
    yield put(generatePayrunSuccess(data));
  } catch (e) {
    yield put(generatePayrunFailure(e.message));
  }
}

function* processPayrunWorker(action) {
  try {
    const id = action.payload;
    const { data } = yield call(api.post, `/api/payrun/${id}/process`);
    yield put(processPayrunSuccess(data));
  } catch (e) {
    yield put(processPayrunFailure(e.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchUsers.type, fetchUsersWorker),
    takeLatest(createUser.type, createUserWorker),
    takeLatest(deleteUser.type, deleteUserWorker),

    takeLatest(fetchAllocations.type, fetchAllocationsWorker),
    takeLatest(createAllocation.type, createAllocationWorker),

    takeLatest(fetchPayruns.type, fetchPayrunsWorker),
    takeLatest(generatePayrun.type, generatePayrunWorker),
    takeLatest(processPayrun.type, processPayrunWorker),
  ]);
}

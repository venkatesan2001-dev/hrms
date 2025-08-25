import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // ||
  // "https://hrms-backend-beige.vercel.app/",
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
import {
  fetchRoles,
  fetchRolesSuccess,
  fetchRolesFailure,
  createRole,
  createRoleSuccess,
  createRoleFailure,
} from "../slices/rolesSlice";

// Users
function* fetchUsersWorker(action) {
  try {
    const params = action?.payload || { page: 1, limit: 10 };
    const { data } = yield call(api.get, "/users", { params });
    yield put(fetchUsersSuccess(data));
  } catch (e) {
    yield put(fetchUsersFailure(e.message));
  }
}

function* createUserWorker(action) {
  try {
    const { data } = yield call(api.post, "/users", action.payload);
    yield put(createUserSuccess(data?.data || data));
    const { data: list } = yield call(api.get, "/users", {
      params: { page: 1, limit: 10 },
    });
    yield put(fetchUsersSuccess(list));
  } catch (e) {
    yield put(createUserFailure(e.message));
  }
}

function* deleteUserWorker(action) {
  try {
    const id = action.payload;
    yield call(api.delete, `/users/${id}`);
    yield put(deleteUserSuccess(id));
  } catch (e) {
    yield put(deleteUserFailure(e.message));
  }
}

// Roles
function* fetchRolesWorker(action) {
  try {
    const params = action?.payload || { page: 1, limit: 50 };
    const { data } = yield call(api.get, "/roles", { params });
    yield put(fetchRolesSuccess(data));
  } catch (e) {
    yield put(fetchRolesFailure(e.message));
  }
}

function* createRoleWorker(action) {
  try {
    const { data } = yield call(api.post, "/roles", action.payload);
    yield put(createRoleSuccess(data?.data || data));
    const { data: list } = yield call(api.get, "/roles", {
      params: { page: 1, limit: 50 },
    });
    yield put(fetchRolesSuccess(list));
  } catch (e) {
    yield put(createRoleFailure(e.message));
  }
}

// Payroll allocations
function* fetchAllocationsWorker(action) {
  try {
    const userId = action.payload;
    const { data } = yield call(api.get, `/payroll/${userId}`);
    yield put(fetchAllocationsSuccess({ userId, allocations: data }));
  } catch (e) {
    yield put(fetchAllocationsFailure(e.message));
  }
}

function* createAllocationWorker(action) {
  try {
    const { data } = yield call(api.post, "/payroll", action.payload);
    yield put(createAllocationSuccess({ user: data.user, allocation: data }));
  } catch (e) {
    yield put(createAllocationFailure(e.message));
  }
}

// Payrun
function* fetchPayrunsWorker() {
  try {
    const { data } = yield call(api.get, "/payrun");
    yield put(fetchPayrunsSuccess(data));
  } catch (e) {
    yield put(fetchPayrunsFailure(e.message));
  }
}

function* generatePayrunWorker(action) {
  try {
    const { data } = yield call(api.post, "/payrun/generate", action.payload);
    yield put(generatePayrunSuccess(data));
  } catch (e) {
    yield put(generatePayrunFailure(e.message));
  }
}

function* processPayrunWorker(action) {
  try {
    const id = action.payload;
    const { data } = yield call(api.post, `/payrun/${id}/process`);
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

    takeLatest(fetchRoles.type, fetchRolesWorker),
    takeLatest(createRole.type, createRoleWorker),

    takeLatest(fetchAllocations.type, fetchAllocationsWorker),
    takeLatest(createAllocation.type, createAllocationWorker),

    takeLatest(fetchPayruns.type, fetchPayrunsWorker),
    takeLatest(generatePayrun.type, generatePayrunWorker),
    takeLatest(processPayrun.type, processPayrunWorker),
  ]);
}

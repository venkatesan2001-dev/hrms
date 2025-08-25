import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // ||
  // "https://hrms-backend-beige.vercel.app/",
});
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
  } catch {}
  return config
})
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
import {
  fetchCandidates,
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
  uploadCandidate,
  uploadCandidateSuccess,
  uploadCandidateFailure,
  updateCandidateStatus,
  updateCandidateStatusSuccess,
  updateCandidateStatusFailure,
} from "../slices/candidatesSlice";
import {
  fetchOffers,
  fetchOffersSuccess,
  fetchOffersFailure,
  createOffer,
  createOfferSuccess,
  createOfferFailure,
  sendOfferEmail,
  sendOfferEmailSuccess,
  sendOfferEmailFailure,
} from "../slices/offersSlice";
import { login, loginSuccess, loginFailure } from "../slices/authSlice";
import {
  fetchOnboardings,
  fetchOnboardingsSuccess,
  fetchOnboardingsFailure,
  createOnboarding,
  createOnboardingSuccess,
  createOnboardingFailure,
  updateOnboarding,
  updateOnboardingSuccess,
  updateOnboardingFailure,
  createIdCardRequest,
  createIdCardRequestSuccess,
  createIdCardRequestFailure,
} from "../slices/onboardingSlice";
import {
  fetchProbations,
  fetchProbationsSuccess,
  fetchProbationsFailure,
  createProbation,
  createProbationSuccess,
  createProbationFailure,
  updateProbation,
  updateProbationSuccess,
  updateProbationFailure,
} from "../slices/probationSlice";

// Users
function* fetchUsersWorker(action) {
  try {
    const payload = action?.payload || { page: 1, limit: 10 };
    const { data: resp } = yield call(api.post, "/employee/index", payload);
    yield put(
      fetchUsersSuccess({
        data: resp?.data?.data || [],
        pagination: resp?.data?.pagination || null,
      })
    );
  } catch (e) {
    yield put(fetchUsersFailure(e.message));
  }
}

function* createUserWorker(action) {
  try {
    const { data } = yield call(api.post, "/employee", action.payload);
    yield put(createUserSuccess(data?.data || data));
    const { data: listResp } = yield call(api.post, "/employee/index", {
      page: 1,
      limit: 10,
    });
    yield put(fetchUsersSuccess({ data: listResp?.data?.data || [], pagination: null }));
  } catch (e) {
    yield put(createUserFailure(e.message));
  }
}

function* deleteUserWorker(action) {
  try {
    const id = action.payload;
    yield call(api.delete, `/employee/${id}`);
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

    // Candidates
    takeLatest(fetchCandidates.type, function* (action) {
      try {
        const params = action?.payload || { page: 1, limit: 10 };
        const { data } = yield call(api.get, "/candidates", { params });
        yield put(fetchCandidatesSuccess(data));
      } catch (e) {
        yield put(fetchCandidatesFailure(e.message));
      }
    }),
    takeLatest(uploadCandidate.type, function* (action) {
      try {
        const formData = new FormData();
        Object.entries(action.payload || {}).forEach(([k, v]) => {
          if (v !== undefined && v !== null) formData.append(k, v);
        });
        const { data } = yield call(api.post, "/candidates", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        yield put(uploadCandidateSuccess(data?.data || data));
        const { data: list } = yield call(api.get, "/candidates", {
          params: { page: 1, limit: 10 },
        });
        yield put(fetchCandidatesSuccess(list));
      } catch (e) {
        yield put(uploadCandidateFailure(e.message));
      }
    }),
    takeLatest(updateCandidateStatus.type, function* (action) {
      try {
        const { id, update } = action.payload;
        const { data } = yield call(api.put, `/candidates/${id}`, update);
        yield put(updateCandidateStatusSuccess(data?.data || data));
      } catch (e) {
        yield put(updateCandidateStatusFailure(e.message));
      }
    }),

    // Offers
    takeLatest(fetchOffers.type, function* (action) {
      try {
        const params = action?.payload || { page: 1, limit: 10 };
        const { data } = yield call(api.get, "/offers", { params });
        yield put(fetchOffersSuccess(data));
      } catch (e) {
        yield put(fetchOffersFailure(e.message));
      }
    }),
    takeLatest(createOffer.type, function* (action) {
      try {
        const { data } = yield call(api.post, "/offers", action.payload);
        yield put(createOfferSuccess(data?.data || data));
        const { data: list } = yield call(api.get, "/offers", { params: { page: 1, limit: 10 } });
        yield put(fetchOffersSuccess(list));
      } catch (e) {
        yield put(createOfferFailure(e.message));
      }
    }),
    takeLatest(sendOfferEmail.type, function* (action) {
      try {
        const id = action.payload;
        const { data } = yield call(api.post, `/offers/${id}/send`);
        yield put(sendOfferEmailSuccess(data?.data || data));
      } catch (e) {
        yield put(sendOfferEmailFailure(e.message));
      }
    }),

    // Onboarding
    takeLatest(fetchOnboardings.type, function* (action) {
      try {
        const params = action?.payload || { page: 1, limit: 10 };
        const { data } = yield call(api.get, "/onboarding/records", { params });
        yield put(fetchOnboardingsSuccess(data));
      } catch (e) {
        yield put(fetchOnboardingsFailure(e.message));
      }
    }),
    takeLatest(createOnboarding.type, function* (action) {
      try {
        const formData = new FormData();
        const { documents = [], checklist = [], ...rest } = action.payload || {}
        Object.entries(rest).forEach(([k, v]) => formData.append(k, v))
        documents.forEach((f) => formData.append('documents', f))
        formData.append('checklist', JSON.stringify(checklist))
        const { data } = yield call(api.post, "/onboarding/records", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        yield put(createOnboardingSuccess(data?.data || data));
      } catch (e) {
        yield put(createOnboardingFailure(e.message));
      }
    }),
    takeLatest(updateOnboarding.type, function* (action) {
      try {
        const { id, update } = action.payload;
        const { data } = yield call(api.put, `/onboarding/records/${id}`, update);
        yield put(updateOnboardingSuccess(data?.data || data));
      } catch (e) {
        yield put(updateOnboardingFailure(e.message));
      }
    }),
    takeLatest(createIdCardRequest.type, function* (action) {
      try {
        const formData = new FormData();
        Object.entries(action.payload || {}).forEach(([k, v]) => formData.append(k, v))
        const { data } = yield call(api.post, "/onboarding/idcard/requests", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        yield put(createIdCardRequestSuccess(data?.data || data));
      } catch (e) {
        yield put(createIdCardRequestFailure(e.message));
      }
    }),

    // Probation
    takeLatest(fetchProbations.type, function* (action) {
      try {
        const params = action?.payload || { page: 1, limit: 10 };
        const { data } = yield call(api.get, "/probation", { params });
        yield put(fetchProbationsSuccess(data));
      } catch (e) {
        yield put(fetchProbationsFailure(e.message));
      }
    }),
    takeLatest(createProbation.type, function* (action) {
      try {
        const { data } = yield call(api.post, "/probation", action.payload);
        yield put(createProbationSuccess(data?.data || data));
      } catch (e) {
        yield put(createProbationFailure(e.message));
      }
    }),
    takeLatest(updateProbation.type, function* (action) {
      try {
        const { id, update } = action.payload;
        const { data } = yield call(api.put, `/probation/${id}`, update);
        yield put(updateProbationSuccess(data?.data || data));
      } catch (e) {
        yield put(updateProbationFailure(e.message));
      }
    }),

    // Auth
    takeLatest(login.type, function* (action) {
      try {
        const { data } = yield call(api.post, "/auth/login", action.payload, { headers: { 'Content-Type': 'application/json' } });
        yield put(loginSuccess(data?.data || data))
      } catch (e) {
        yield put(loginFailure(e.response?.data?.message || e.message))
      }
    }),
  ]);
}

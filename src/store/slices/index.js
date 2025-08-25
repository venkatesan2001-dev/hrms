import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import payrollReducer from './payrollSlice'
import payrunReducer from './payrunSlice'
import rolesReducer from './rolesSlice'
import candidatesReducer from './candidatesSlice'
import offersReducer from './offersSlice'
import onboardingReducer from './onboardingSlice'
import probationReducer from './probationSlice'
import authReducer from './authSlice'

export default combineReducers({
  users: usersReducer,
  payroll: payrollReducer,
  payrun: payrunReducer,
  roles: rolesReducer
  ,candidates: candidatesReducer
  ,offers: offersReducer
  ,onboarding: onboardingReducer
  ,probation: probationReducer
  ,auth: authReducer
})



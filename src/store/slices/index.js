import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import payrollReducer from './payrollSlice'
import payrunReducer from './payrunSlice'
import rolesReducer from './rolesSlice'

export default combineReducers({
  users: usersReducer,
  payroll: payrollReducer,
  payrun: payrunReducer,
  roles: rolesReducer
})



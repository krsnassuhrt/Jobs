import { combineReducers } from "@reduxjs/toolkit"
import { rtkApi } from "../api/rtkApi"
import assessmentsReducer from "../features/assessments/assessmentsSlice"

const rootReducer = combineReducers({
  [rtkApi.reducerPath]: rtkApi.reducer,
  assessments: assessmentsReducer, // 👈 add this
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

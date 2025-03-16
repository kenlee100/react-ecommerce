import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState: {
    isLoading: false,
    isProcessing: false,
    modalModifySuccess: false, // 是否新增/修改成功
    menuToggle: false
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsProcessing: (state, action) => {
      state.isProcessing = action.payload
    },
    setMenuToggle: (state, action) => {
      state.menuToggle = action.payload
    }
  }
})

export const { setIsLoading, setIsProcessing, setMenuToggle } = commonSlice.actions

export const selectLoading = (state) => state.commonSlice.isLoading
export const selectProcessing = (state) => state.commonSlice.isProcessing
export const selectMenuToggle = (state) => state.commonSlice.menuToggle

export default commonSlice.reducer

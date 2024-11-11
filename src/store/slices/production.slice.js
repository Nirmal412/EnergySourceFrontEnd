// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/api/';

// export const fetchProductions = createAsyncThunk(
//   'production/fetchProductions',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/productions`);
//       return response.data.productions;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createProduction = createAsyncThunk(
//   'production/createProduction',
//   async (newProduction, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/productions`, newProduction);
//       return response.data.production;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateProduction = createAsyncThunk(
//   'production/updateProduction',
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${BASE_URL}/productions/${id}`, updatedData);
//       return response.data.production;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteProduction = createAsyncThunk(
//   'production/deleteProduction',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${BASE_URL}/productions/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const productionSlice = createSlice({
//   name: 'production',
//   initialState: {
//     productions: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProductions.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProductions.fulfilled, (state, action) => {
//         state.loading = false;
//         state.productions = action.payload;
//       })
//       .addCase(fetchProductions.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(createProduction.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createProduction.fulfilled, (state, action) => {
//         state.loading = false;
//         state.productions.push(action.payload);
//       })
//       .addCase(createProduction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(updateProduction.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateProduction.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.productions.findIndex((p) => p.id === action.payload.id);
//         if (index !== -1) {
//           state.productions[index] = action.payload;
//         }
//       })
//       .addCase(updateProduction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(deleteProduction.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteProduction.fulfilled, (state, action) => {
//         state.loading = false;
//         state.productions = state.productions.filter((p) => p.id !== action.payload);
//       })
//       .addCase(deleteProduction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default productionSlice.reducer;

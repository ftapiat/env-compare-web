import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  FileDifferencesInterface,
  FileDifferencesModel,
} from '@/models/file-differences';
import {
  ApiResponseModel,
  ApiResponseValidationError,
} from '@/models/api-response';
import { plainToInstance } from 'class-transformer';

interface FileDifferencesState {
  fileDifferences: FileDifferencesInterface | null;
  loading: boolean;
  errors: string[] | null;
}

const initialState: FileDifferencesState = {
  fileDifferences: null,
  loading: false,
  errors: null,
};

const fetchFileDifferences = createAsyncThunk<
  FileDifferencesInterface,
  { fileContent1: string; fileContent2: string },
  {
    rejectValue: string[];
  }
>(
  'fileDifferences/fetchFileDifferences',
  async ({ fileContent1, fileContent2 }, { rejectWithValue }) => {
    const data = {
      files: [
        {
          name: 'file 1',
          content: fileContent1,
        },
        {
          name: 'file 2',
          content: fileContent2,
        },
      ],
    };

    const jsonData = JSON.stringify(data);
    const endpoint = '/api/compare-files';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };

    try {
      const response = await fetch(endpoint, options);
      const plainResponse = await response.json();
      if (response.status === 200) {
        const apiResponse =
          ApiResponseModel.fromJsonWithClass<FileDifferencesModel>(
            plainResponse,
            FileDifferencesModel
          );

        return Object.assign({}, apiResponse.data);
      } else {
        const error = plainToInstance(
          ApiResponseValidationError,
          plainResponse
        ) as unknown as ApiResponseValidationError;
        return rejectWithValue(error.data);
      }
    } catch (e) {
      console.error('Error found while parsing data', e);
      return rejectWithValue(['Error found while parsing data']);
    }
  }
);

export const fileDifferencesSlice = createSlice({
  name: 'fileDifferences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFileDifferences.pending, (state) => {
      console.log('fetchFileDifferences.pending');
      state.loading = true;
      state.fileDifferences = null;
      state.errors = null;
    });
    builder.addCase(fetchFileDifferences.fulfilled, (state, action) => {
      console.log('fetchFileDifferences.fulfilled');
      state.loading = false;
      state.fileDifferences = action.payload;
    });
    builder.addCase(fetchFileDifferences.rejected, (state, action) => {
      console.log('fetchFileDifferences.rejected');
      state.loading = false;
      state.errors = action.payload as string[];
    });
  },
});

export { fetchFileDifferences };

export const selectFilteredFileDifferences = (state: FileDifferencesState) => {
  const fileDifferences = state.fileDifferences;

  if (!fileDifferences) {
    return null;
  }

  fileDifferences.differences.valueDifferences =
    fileDifferences.differences.valueDifferences.filter((valueDifferences) => {
      return (
        valueDifferences.file1.indexDifferences.length > 0 ||
        valueDifferences.file2.indexDifferences.length > 0
      );
    });
  return fileDifferences;
};

export default fileDifferencesSlice.reducer;

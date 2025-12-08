import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'job_seeker' | 'employer' | 'recruiter' | 'agency';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Mock login thunk - ready for backend integration
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user based on email pattern
    const role: UserRole = email.includes('employer') ? 'employer' : 
                           email.includes('recruiter') ? 'recruiter' :
                           email.includes('agency') ? 'agency' : 'job_seeker';
    
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role,
      company: role === 'employer' ? 'TechCorp Inc.' : undefined,
    };
    
    return user;
  }
);

// Mock signup thunk
export const signupAsync = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name, role, company }: { 
    email: string; 
    password: string; 
    name: string; 
    role: UserRole; 
    company?: string 
  }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      company,
    };
    
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Signup
      .addCase(signupAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

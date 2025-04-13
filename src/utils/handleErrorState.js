export const handleErrorState = (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.backendTaskError = action.payload?.backendTaskError;
    state.serverError = action.payload?.serverError;
    state.networkError = action.payload?.networkError;
    state.unknownError = action.payload?.unknownError;
};

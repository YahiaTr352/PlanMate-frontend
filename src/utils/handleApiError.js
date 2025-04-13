export const handleApiError = (error, rejectWithValue) => {
    if (!error.response) {
        return rejectWithValue({
            networkError: "Network error. Please check your connection.",
        });
    }

    if (error.response.status === 400) {
        return rejectWithValue({
            backendTaskError: error.response.data,
        });
    }

    if (error.response.status === 500) {
        return rejectWithValue({
            serverError: error.response.data,
        });
    }
};

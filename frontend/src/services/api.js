const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  // Check if email exists
  checkEmail: async (email) => {
    return apiCall('/auth/check-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Login user
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Register user - Direct signup enabled
  signup: async (firstName, lastName, email, password) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  },

  // Send OTP for signup
  sendSignupOTP: async (firstName, email) => {
    return apiCall('/auth/send-signup-otp', {
      method: 'POST',
      body: JSON.stringify({ firstName, email }),
    });
  },

  // Verify OTP and complete signup
  verifySignupOTP: async (email, otp, firstName, lastName, password) => {
    return apiCall('/auth/verify-signup-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp, firstName, lastName, password }),
    });
  },

  // Upgrade to premium
  upgradeToPremium: async (plan, paymentMethod, amount) => {
    return apiCall('/auth/upgrade-premium', {
      method: 'POST',
      body: JSON.stringify({ plan, paymentMethod, amount }),
    });
  },
};

export default apiCall;

import { authAPI } from '../services/api';

// Fixed auth handler that uses authAPI instead of direct fetch
export const createFixedAuthHandler = (authType, setIsLoggedIn, setIsPremium, setUserInfo, closeAuthModal, navigate) => {
  return async () => {
    try {
      // Get form values from DOM elements
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const nameInput = document.getElementById('name');

      const email = emailInput?.value?.trim() || '';
      const password = passwordInput?.value?.trim() || '';
      const name = nameInput?.value?.trim() || '';

      console.log('Form values - Email:', email, 'Password:', password, 'Name:', name);

      // Validation
      if (!email || !password) {
        alert("Please fill in all required fields");
        return;
      }

      if (authType === "signup" && !name) {
        alert("Please enter your full name");
        return;
      }

      let response;

      if (authType === "login") {
        response = await authAPI.login(email, password);
        alert(`Welcome back, ${response.user.firstName}!`);
      } else {
        // Handle direct signup using authAPI
        const fullName = name.trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || fullName;
        const lastName = nameParts.slice(1).join(' ') || 'User';

        response = await authAPI.signup(firstName, lastName, email, password);
        alert(`🎉 Welcome to Smart Recipes, ${response.user.firstName}! Your account has been created successfully.`);
      }

      // Store auth data
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isPremium", response.user.isPremium.toString());

      setIsLoggedIn(true);
      setIsPremium(response.user.isPremium);
      setUserInfo({
        firstName: response.user.firstName || "",
        lastName: response.user.lastName || "",
        email: response.user.email || ""
      });
      closeAuthModal();
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message || "Authentication failed");
    }
  };
};

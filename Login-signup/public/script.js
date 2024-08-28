document.querySelector('.login-button').addEventListener('click', () => {
    document.getElementById('login-popup').classList.add('visible');
});

document.getElementById('register-link').addEventListener('click', () => {
    document.getElementById('login-popup').classList.remove('visible');
    document.getElementById('register-popup').classList.add('visible');
});

document.getElementById('login-link').addEventListener('click', () => {
    document.getElementById('register-popup').classList.remove('visible');
    document.getElementById('login-popup').classList.add('visible');
});

// Login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const errorMessage = e.target.querySelector('.error-message');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login successful');
        } else {
            errorMessage.textContent = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Register form submission
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        firstName: e.target.firstName.value,
        middleName: e.target.middleName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phoneNumber: e.target.phoneNumber.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
    };
    const errorMessage = e.target.querySelector('.error-message');

    if (formData.password !== formData.confirmPassword) {
        errorMessage.textContent = "Passwords don't match.";
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Registration successful');
            document.getElementById('register-popup').classList.remove('visible');
            document.getElementById('login-popup').classList.add('visible');
        } else {
            errorMessage.textContent = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

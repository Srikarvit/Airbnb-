function handleSignup(event) {
            event.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Placeholder for signup logic (e.g., API call)
            console.log("Sign Up:", { fullName, email, password });
            alert("Sign up successful! Redirecting to home...");
            window.location.href = "index.html";
        }
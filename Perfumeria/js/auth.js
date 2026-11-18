const API_URL = "http://127.0.0.1:8000/api/v1";

const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const loginButton = document.querySelector("#loginButton");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    loginError.textContent = "";
    loginButton.disabled = true;
    loginButton.textContent = "Validando...";

    const correo = document.querySelector("#loginCorreo").value.trim();
    const password = document.querySelector("#loginPassword").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ correo, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "No fue posible iniciar sesión.");
        }

        if (!result.access_token) {
            throw new Error("El servidor no entregó el token de acceso.");
        }

        sessionStorage.setItem("perfumeria_token", result.access_token);
        sessionStorage.setItem("perfumeria_user", JSON.stringify(result.user));
        sessionStorage.setItem("perfumeria_expires_at", result.expires_at);

        const validation = await fetch(`${API_URL}/auth/me`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${result.access_token}`
            }
        });

        if (!validation.ok) {
            sessionStorage.clear();
            throw new Error("No se pudo validar la sesión.");
        }

        document.body.classList.remove("auth-required");

    } catch (error) {
        loginError.textContent = error.message;
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = "Iniciar sesión";
    }
});
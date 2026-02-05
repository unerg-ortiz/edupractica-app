export const login = async (email: string, password: string) => {
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "test@example.com" && password === "password") {
        return {
            token: "mock-token",
            user: {
                id: 1,
                name: "Test User",
                email: email,
            },
        };
    }

    throw new Error("Invalid credentials");
};

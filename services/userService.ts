// Simulate API call
export const fetchUserData = async () => {
    return new Promise<{ name: string; email: string }>((resolve) => {
        setTimeout(() => {
            resolve({
                name: "John Doe",
                email: "john@example.com",
            });
        }, 1000);
    });
};

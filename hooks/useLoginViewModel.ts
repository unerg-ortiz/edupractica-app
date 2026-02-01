import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { login } from "../services/authService";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export const useLoginViewModel = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof LoginForm]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);
        setGeneralError("");
        setErrors({});

        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof LoginForm, string>> = {};
            // Use .issues for safer access if .errors is typed incorrectly in this version
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as keyof LoginForm] = err.message;
                }
            });
            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        try {
            await login(formData.email, formData.password);
            // Redirect to dashboard or home on success
            // Since we are using [lang], we might need to know the current lang.
            // For now, redirect to root which might redirect to default lang or just push '/en/dashboard'
            // But getting lang key is better. 
            // We can accept lang as a prop or hook parameter if needed.
            // Using window.location or next router.
            // Redirect to teacher dashboard
            router.push("/es/teacher/dashboard");
        } catch (err) {
            if (err instanceof Error) {
                setGeneralError(err.message);
            } else {
                setGeneralError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        errors,
        loading,
        generalError,
        handleChange,
        handleSubmit,
    };
};

import { LoginForm } from "@/components/Login/LoginForm";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-50">
            {/* Decorative blobs for modern aesthetic */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-400/20 blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse delay-700" />
                <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="z-10 px-4 w-full flex justify-center">
                <LoginForm />
            </div>
        </div>
    );
}

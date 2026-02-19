"use client";

import { useState } from 'react';
import { apiFetch, auth } from '@/lib/api';

export default function DebugPage() {
    const [status, setStatus] = useState<string>('Esperando...');
    const [loginResult, setLoginResult] = useState<string>('');

    const testConnection = async () => {
        setStatus('Probando conexión...');
        try {
            const res = await fetch('http://localhost:8000/health');
            if (res.ok) {
                const data = await res.json();
                setStatus(`✅ Conexión exitosa: ${JSON.stringify(data)}`);
            } else {
                setStatus(`❌ Error HTTP: ${res.status} ${res.statusText}`);
            }
        } catch (err: any) {
            setStatus(`❌ Error de red: ${err.message}`);
        }
    };

    const testLogin = async () => {
        setLoginResult('Intentando login...');
        try {
            const formData = new FormData();
            formData.append('username', 'admin@example.com');
            formData.append('password', 'admin123');

            const result = await auth.login(formData);
            setLoginResult(`✅ Login exitoso! Token: ${result.access_token.substring(0, 10)}...`);
        } catch (err: any) {
            setLoginResult(`❌ Error Login: ${err.message}`);
        }
    };

    return (
        <div className="p-8 space-y-8 bg-slate-900 text-white min-h-screen">
            <h1 className="text-2xl font-bold">Diagnóstico de API</h1>

            <section className="space-y-4 border p-4 rounded">
                <h2 className="text-xl font-semibold">1. Prueba de Salud (GET /health)</h2>
                <button onClick={testConnection} className="bg-blue-600 px-4 py-2 rounded">
                    Probar Conexión
                </button>
                <pre className="bg-black p-4 rounded mt-2">{status}</pre>
            </section>

            <section className="space-y-4 border p-4 rounded">
                <h2 className="text-xl font-semibold">2. Prueba de Login (POST /login/access-token)</h2>
                <p className="text-sm text-slate-400">Intenta loguear con admin@example.com / admin123</p>
                <button onClick={testLogin} className="bg-green-600 px-4 py-2 rounded">
                    Probar Login Mock
                </button>
                <pre className="bg-black p-4 rounded mt-2">{loginResult}</pre>
            </section>
        </div>
    );
}

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const t = await getTranslations();
    const { lang } = await params;

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1 className="text-4xl font-bold">Edupractica App</h1>
                <p className="mt-4 text-lg">{t('welcome')}</p>
                <div className="mt-8">
                    <Link
                        href={`/${lang}/login`}
                        className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Go to Login
                    </Link>
                </div>
            </main>
        </div>
    );
}

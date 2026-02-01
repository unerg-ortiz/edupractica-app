"use client";

import { useTranslations } from "next-intl";
import { useLoginViewModel } from "@/hooks/useLoginViewModel";

export function LoginForm() {
    const t = useTranslations("Login");
    const {
        formData,
        errors,
        loading,
        generalError,
        handleChange,
        handleSubmit,
    } = useLoginViewModel();

    return (
        <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white/70 bg-clip-border text-gray-700 shadow-2xl backdrop-blur-xl border border-white/40">
            <div className="relative mx-4 -mt-6 h-28 grid place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/40 text-white">
                <h3 className="block font-sans text-3xl font-bold leading-snug tracking-tight antialiased text-inherit">
                    {t("welcome_message")}
                </h3>
            </div>
            <div className="flex flex-col gap-4 p-6">
                {generalError && (
                    <div className="p-3 bg-red-50 mb-2 border border-red-200 rounded-lg text-red-600 text-sm font-medium text-center">
                        {generalError}
                    </div>
                )}

                <div className="w-full">
                    <div className="relative w-full min-w-[200px] h-11">
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            className={`peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] ${errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-blue-gray-200 focus:border-blue-600"
                                } !border-t-blue-gray-200 focus:!border-t-transparent`}
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-blue-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600">
                            {t("email_label")}
                        </label>
                    </div>
                    {errors.email && (
                        <p className="flex items-center gap-1 mt-2 font-sans text-xs font-normal text-red-500 antialiased">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="w-full">
                    <div className="relative w-full min-w-[200px] h-11">
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder=" "
                            className={`peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] ${errors.password
                                ? "border-red-500 focus:border-red-500"
                                : "border-blue-gray-200 focus:border-blue-600"
                                } !border-t-blue-gray-200 focus:!border-t-transparent`}
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-blue-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600">
                            {t("password_label")}
                        </label>
                    </div>
                    {errors.password && (
                        <p className="flex items-center gap-1 mt-2 font-sans text-xs font-normal text-red-500 antialiased">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="-ml-2.5">
                    <div className="inline-flex items-center">
                        <label
                            className="relative flex items-center cursor-pointer p-3 rounded-full overflow-hidden"
                            htmlFor="remember"
                        >
                            <input
                                type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-600 checked:bg-blue-600 checked:before:bg-blue-600 hover:before:opacity-10"
                                id="remember"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                        </label>
                        <label
                            className="mt-px font-light text-gray-700 cursor-pointer select-none"
                            htmlFor="remember"
                        >
                            {t("remember_me")}
                        </label>
                    </div>
                </div>
            </div>
            <div className="p-6 pt-0">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="middle none center uppercase w-full rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 py-3 px-6 font-sans text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    {loading ? t("loading") : t("login_button")}
                </button>
                <div className="mt-6 flex justify-center">
                    <p className="block antialiased font-sans text-sm font-light leading-normal text-inherit">
                        {t("no_account")}
                        <a href="#signup" className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-gray-900 antialiased">{t("sign_up")}</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

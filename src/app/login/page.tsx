"use client";

import Link from "next/link";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

interface ILogin {
    email: string;
    password: string;
}

const LoginSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Format email salah")
        .required("Email harus diisi"),
    password: Yup.string()
        .trim()
        .required("Password harus diisi"),
});

export default function Login() {

    const initialValues: ILogin = { email: "", password: "" };

    const handleLogin = async (values: ILogin) => {
        try {
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            // Debug: lihat response dari backend
            console.log("Response dari backend:", data);

            if (!res.ok) {
                // Error dari server (400, 401, 500, dll)
                Swal.fire({
                    icon: "error",
                    title: "Login Gagal",
                    text: data.message || "Email atau password salah. Silakan coba lagi.",
                    confirmButtonText: "OK"
                });
                return;
            }

            // Validasi response - cek success
            if (!data.success) {
                Swal.fire({
                    icon: "error",
                    title: "Login Gagal",
                    text: data.message || "Terjadi kesalahan saat login. Silakan coba lagi.",
                    confirmButtonText: "OK"
                });
                return;
            }

            // Validasi data user dan role
            if (!data.user || !data.user.role) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Data user tidak lengkap dari server. Silakan hubungi administrator.",
                    confirmButtonText: "OK"
                });
                console.error("Data user tidak lengkap:", data);
                return;
            }

            // Validasi token
            if (!data.token) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Token tidak ditemukan dari server. Silakan hubungi administrator.",
                    confirmButtonText: "OK"
                });
                return;
            }

            // Simpan token, role, dan user data
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Success notification
            Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: data.message || "Selamat datang!",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Gunakan redirectUrl dari backend (sesuai dengan role)
                if (data.redirectUrl) {
                    // Hapus baseUrl jika ada (karena frontend menggunakan relative path)
                    const redirectPath = data.redirectUrl.startsWith('http') 
                        ? data.redirectUrl.replace(/^https?:\/\/[^\/]+/, '') 
                        : data.redirectUrl;
                    window.location.href = redirectPath;
                } else {
                    // Fallback jika redirectUrl tidak ada (backward compatibility)
                    if (data.user.role === "ADMIN") {
                        window.location.href = "/admin/dashboard";
                    } else if (data.user.role === "USER") {
                        window.location.href = "/home";
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Role tidak dikenali!",
                            confirmButtonText: "OK"
                        });
                    }
                }
            });

        } catch (err: any) {
            console.error("Error saat login:", err);
            
            // Handle network error atau error lainnya
            let errorMessage = "Terjadi kesalahan saat menghubungi server. ";
            
            if (err.message) {
                errorMessage += err.message;
            } else if (err.name === "TypeError" && err.message.includes("fetch")) {
                errorMessage += "Pastikan backend server sudah berjalan di http://localhost:8000";
            } else {
                errorMessage += "Silakan coba lagi atau hubungi administrator.";
            }
            
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div className="pt-20 min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <Formik<ILogin>
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {(formik: FormikProps<ILogin>) => (
                    <Form className="w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="email">  Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full border p-2 rounded"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"         
                                type="password"
                                className="w-full border p-2 rounded"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-600 text-sm mt-1">{formik.errors.password}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"                   
                                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition hover:cursor-pointer">
                                Login
                            </button>       
                            {/* Link ke halaman register */}                 
                             <p className="text-sm text-gray-600 text-center mt-4">
                                Don't have an account yet?{" "}
                                    <Link href="/register">
                                        <span className="font-medium text-gray-600 hover:text-gray-700 cursor-pointer">Register</span>
                                    </Link>  
                            </p>
                        </div>    
                                                            
                    </Form>
                )}
            </Formik>
        </div>
    );
}

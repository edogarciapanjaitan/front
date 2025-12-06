"use client";
import Link from "next/link";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

interface IRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string; 
    referralCode: string;
}

const RegisterSchema = Yup.object({
    firstname: Yup.string()
        .trim()
        .required("Nama depan harus diisi"),
    lastname: Yup.string()
        .trim()
        .required("Nama belakang harus diisi"),
    email: Yup.string()
        .trim()
        .email("Format email salah")
        .required("Email harus diisi"),
    password: Yup.string()
        .trim()
        .min(5, "Password minimal 5 karakter")
        .required("Password harus diisi"),
    confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], "Kata sandi tidak cocok")
        .required("Konfirmasi kata sandi harus diisi"),
});

export default function Register() {
    const initialValues: IRegister = { 
        firstname: "", 
        lastname: "", 
        email: "", 
        password: "",
        confirmPassword: "", 
        referralCode: "",
    };

   const handleRegister = async (values: IRegister) => {
    try {
        
        const { confirmPassword, ...registerData } = values;

        console.log("Data yang dikirim ke backend:", registerData);

        const res = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData),
        });

        const data = await res.json();

        console.log("Response dari backend:", data);
        console.log("Status code:", res.status);
        console.log("res.ok:", res.ok);

        if (res.ok && data.success) {
            // Popup sukses
            await Swal.fire({
                icon: "success",
                title: "Register Berhasil",
                text: data.message || "Akun berhasil dibuat!",
                timer: 2000,
                showConfirmButton: false
            });
            
            // Redirect setelah Swal ditutup
            window.location.href = "/login";

        } else {
            // Popup gagal
            Swal.fire({
                icon: "error",
                title: "Register Gagal",
                text: data.message || "Terjadi kesalahan saat registrasi"
            });
        }

    } catch (err: any) {
        
        console.error("Error saat register:", err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message || "Terjadi kesalahan saat menghubungi server"
        });
    }
};

    return (
        <div className="pt-20 min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <Formik<IRegister>  
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                {(formik: FormikProps<IRegister>) => {
                    return (
                        <Form className="w-full max-w-md">
                            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                                <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Create Account</h1>
                                
                                <div className="space-y-4">
                                    {/* First Name Field */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            First Name
                                        </label>
                                        <input 
                                            type="text" 
                                            name="firstname" 
                                            placeholder="Edo"
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`bg-gray-50 border rounded-lg w-full p-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                formik.touched.firstname && formik.errors.firstname ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.firstname && formik.errors.firstname && 
                                            <span className="text-red-500 text-xs mt-1 block">{formik.errors.firstname}</span>
                                        }
                                    </div>

                                    {/* Last Name Field */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Last Name
                                        </label>
                                        <input 
                                            type="text" 
                                            name="lastname" 
                                            placeholder="Garcia"
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`bg-gray-50 border rounded-lg w-full p-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                formik.touched.lastname && formik.errors.lastname ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.lastname && formik.errors.lastname && 
                                            <span className="text-red-500 text-xs mt-1 block">{formik.errors.lastname}</span>
                                        }
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            placeholder="example@gmail.com"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`bg-gray-50 border rounded-lg w-full p-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.email && formik.errors.email && 
                                            <span className="text-red-500 text-xs mt-1 block">{formik.errors.email}</span>
                                        }
                                    </div>

                                    {/* Password Field  */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Password
                                        </label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="*******"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`bg-gray-50 border rounded-lg w-full p-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.password && formik.errors.password && 
                                            <span className="text-red-500 text-xs mt-1 block">{formik.errors.password}</span>
                                        }
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Confirm Password
                                        </label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword" 
                                            placeholder="*******"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`bg-gray-50 border rounded-lg w-full p-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && 
                                            <span className="text-red-500 text-xs mt-1 block">{formik.errors.confirmPassword}</span>
                                        }
                                    </div>

                                    {/* Referral Code Field */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Referral Code (Optional)
                                        </label>
                                        <input 
                                            type="text" 
                                            name="referralCode" 
                                            placeholder="Enter referral code"
                                            value={formik.values.referralCode}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button 
                                        type="submit" 
                                        disabled={formik.isSubmitting}
                                        className="w-full text-white bg-gray-500 font-medium rounded-lg px-5 py-2.5 uppercase hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition mt-6 hover:cursor-pointer"
                                    >
                                        {formik.isSubmitting ? "Registering..." : "Register"}
                                    </button>

                                    {/* Login Link */}
                                    <p className="text-sm text-gray-600 text-center mt-4">
                                        Already have an account?{" "}
                                        <Link href="/login">
                                            <span className="font-medium text-gray-600 hover:text-gray-700 cursor-pointer">Login</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </Form>
                    );
                }}                         
            </Formik>
        </div>
    );
}

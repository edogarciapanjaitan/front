"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
    const stats = [
        { number: "500+", label: "Events Terlaksana" },
        { number: "50K+", label: "Pengguna Aktif" },
        { number: "100+", label: "Partner Terpercaya" },
        { number: "95%", label: "Kepuasan Pengguna" },
    ];

    const values = [
        {
            icon: "🎯",
            title: "Terpercaya",
            description: "Platform terpercaya dengan sistem keamanan terbaik untuk melindungi data dan transaksi Anda."
        },
        {
            icon: "🚀",
            title: "Inovatif",
            description: "Selalu mengembangkan fitur terbaru untuk memberikan pengalaman terbaik dalam mengelola event."
        },
        {
            icon: "🤝",
            title: "Kolaboratif",
            description: "Membangun ekosistem event yang menghubungkan organizer, peserta, dan partner dengan mudah."
        },
        {
            icon: "⭐",
            title: "Berpengalaman",
            description: "Tim berpengalaman dalam industri event management dengan track record yang terbukti."
        },
    ];

    const team = [
        {
            name: "Tim Development",
            role: "Teknologi & Inovasi",
            description: "Mengembangkan platform dengan teknologi terdepan untuk pengalaman pengguna yang optimal."
        },
        {
            name: "Tim Support",
            role: "Customer Service",
            description: "Siap membantu Anda 24/7 dengan layanan customer service yang responsif dan profesional."
        },
        {
            name: "Tim Marketing",
            role: "Pemasaran & Partnership",
            description: "Membangun jaringan luas dengan berbagai partner untuk memperluas jangkauan event Anda."
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            
            <div className="relative w-full h-[60vh] pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                            Tentang Pro Event
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
                            Platform terdepan untuk menemukan, mengelola, dan menikmati event terbaik di Indonesia
                        </p>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Siapa Kami?
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                <strong className="text-red-600">Pro Event</strong> adalah platform digital terpercaya 
                                yang didedikasikan untuk menghubungkan organizer event dengan peserta di seluruh Indonesia. 
                                Sejak didirikan, kami telah menjadi pilihan utama bagi ribuan event organizer dan ratusan 
                                ribu peserta untuk mengelola dan menemukan event terbaik.
                            </p>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Kami memahami bahwa setiap event memiliki cerita uniknya sendiri. Oleh karena itu, 
                                kami menyediakan platform yang fleksibel, mudah digunakan, dan dilengkapi dengan 
                                berbagai fitur canggih untuk memastikan kesuksesan event Anda.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Dengan komitmen untuk terus berinovasi, kami bertekad menjadi partner terpercaya 
                                dalam perjalanan event Anda, dari perencanaan hingga eksekusi.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-red-800 mb-4">Misi Kami</h3>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Menjadi platform event management terdepan di Indonesia yang memudahkan semua orang 
                                untuk menemukan, mengelola, dan menikmati berbagai event berkualitas.
                            </p>
                            <h3 className="text-2xl font-bold text-red-800 mb-4">Visi Kami</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Menciptakan ekosistem event yang inklusif, terhubung, dan berkelanjutan di mana 
                                setiap event dapat mencapai potensi maksimalnya dan setiap peserta dapat menemukan 
                                pengalaman yang bermakna.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Pencapaian Kami
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Nilai-Nilai Kami
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nilai-nilai yang menjadi fondasi dalam setiap layanan yang kami berikan
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-red-500 hover:shadow-lg transition-all"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Tim Kami
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tim profesional yang berdedikasi untuk memberikan pengalaman terbaik bagi Anda
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-red-600 font-semibold mb-4">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-red-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Siap Memulai Perjalanan Event Anda?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan organizer dan peserta yang telah mempercayakan event mereka kepada Pro Event
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/events"
                            className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Jelajahi Events
                        </Link>
                        <Link
                            href="/events/create"
                            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                        >
                            Buat Event Anda
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}


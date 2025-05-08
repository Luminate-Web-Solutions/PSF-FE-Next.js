import React from 'react'

const CoreTeam = () => {
    return (
        <>
            {/* CORE TEAM */}
            <div
                className="relative bg-cover bg-center h-100 flex items-center justify-center px-4"
                style={{ backgroundImage: `url('/coreteam1.jpg')` }}
            >
                <div className="absolute inset-0 bg-[#0d2137]/70"></div>
                <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out]">
                    <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
                        CORE TEAM
                    </h1>
                    <p className="text-[#f9f9f9] mt-4 text-2xl md:text-lg font-semibold max-w-xl mx-auto px-5">
                        Leading with Purpose. Serving with Passion.
                    </p>
                    <p className="text-[#d8d8d6] mt-4 text-sm md:text-lg  mx-auto px-5">
                        The PSF Hyderabad Core Team for the term 2025 represents a dynamic group of dedicated professionals who are committed to driving positive change across communities, united by a shared vision to uplift communities, support career growth, and build a better future through purposeful action. This diverse team leads various verticals of the organization, ensuring that every initiative is aligned with PSF’s mission of Connect. Change. Serve.
                    </p>
                </div>
            </div>

            <style>{`
              @keyframes fadeInUp {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* OLT */}
            <div className="p-10 mx-5 text-[#2e77ae]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">
                    ORGANIZATION LEADERSHIP TEAM (OLT)
                </h1>
                <p className="text-sm pb-4 text-[#2e77ae]">
                    Our Organisation Leadership Team consists of leaders in key positions who serve as the office bearers of PSF Hyderabad, guiding the overall strategic direction, overseeing high-level organizational activities, and ensuring smooth operations and sustained growth across all initiatives.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {[
                        { name: "Mohammed Arif Sabeel", role: "President" },
                        { name: "Mohammed Khalid", role: "General Secretary" },
                        { name: "Nisar Mohammed", role: "Joint Secretary" },
                        { name: "Riyaz Ahmed Sk", role: "Finance Secretary" },
                        { name: "Khaja H Mustafa", role: "PR Secretary" },
                    ].map((person, i) => (
                        <div key={i} className="bg-white shadow-md p-5 text-center text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' className="rounded-full mb-2" alt={person.name} />
                            <p className="font-bold">{person.name}</p>
                            <p className="font-semibold text-[#2e77ae]">{person.role}</p>
                        </div>
                    ))}
                </div>
                <p className="pt-8 font-semibold text-[#2f5d8c] text-center">
                    These leaders play a vital role in shaping initiatives, strengthening partnerships, and nurturing leadership across verticals.
                </p>
            </div>

            {/* Permanent Members */}
            <div className="p-10 mx-5 bg-[#ffffff] text-[#2f5d8c]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">PERMANENT MEMBERS</h1>
                <p className="text-[#2f5d8c] text-sm ">
                    The Permanent Members of PSF are a group of three experienced professionals appointed for a three-year term to provide guidance and ensure continuity in the organization’s journey. To qualify, individuals must have served for at least three consecutive years in the core team or held a key position within the Organisation Leadership Team (OLT). While they were not eligible to contest for the President or any OLT roles, they nominated themselves for the Permanent Member position. Their selection was finalized in consultation with the core team:

                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
                    {["Abdul Razak", "Abdul Mohi", "Mohammed Nadeem"].map((name, i) => (
                        <div key={i} className="text-center bg-white shadow-md p-5 text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' alt={name} className="rounded-full mb-2" />
                            <p className="font-bold">{name}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-4 font-semibold text-center">Their insights and mentorship ensure stability in our planning and execution.</p>
            </div>

            {/* Vertical Leads */}
            <div className="p-10 mx-5  text-[#2f5d8c]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">VERTICAL LEADS</h1>
                <p className="mb-4 text-sm">Appointed by the Organisation Leadership Team (OLT) and Core Team, ideally from within the core team or through mutual consent among members, each vertical represents a key area of impact within PSF. These verticals are led by dedicated individuals who are passionate about their cause and committed to ensuring the effective delivery of PSF’s services:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                        ["Atif Damudi", "PEP (Professional Enablement Program)"],
                        ["Faqruddin Ali", "Social Service"],
                        ["Abdul Raheem", "CDPP"],
                        ["Ghouse Mohiddin", "Skills Academy"],
                        ["Belal Ahmed", "Skills Academy"],
                        ["Tanzeel Haider", "Technology"],
                    ].map(([name, role], i) => (
                        <div key={i} className="bg-white shadow-md p-5 text-center text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' alt={name} className="rounded-full mb-2" />
                            <p className="font-bold">{name}</p>
                            <p className="text-[#a0b3c1]">{role}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-4 font-semibold text-center">These verticals function as the building blocks of PSF, supporting both individual and community development.</p>
            </div>

            {/* Other Core Members */}
            <div className="p-10 mx-5 bg-white text-[#2f5d8c]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">OTHER CORE MEMBERS</h1>
                <p className="mb-4 text-sm">The remaining Core Members form the operational strength of PSF, actively contributing to projects, events, and ongoing support across all activities.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                        "Safiuz Khan",
                        "Najeebuddin Mohammed",
                        "Tariq Shabibi",
                        "Mohammed Obaid",
                        "Abrar Hussaini",
                        "Misbah ul Hasan",
                    ].map((name, i) => (
                        <div key={i} className="bg-white shadow-md p-5 text-center text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' alt={name} className="rounded-full mb-2" />
                            <p className="font-bold">{name}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-4 font-semibold text-center">
                Each of them brings dedication, energy, and hands-on support to our day-to-day functions.
                </p>
            </div>

            {/* Closing Statement */}
            <div className="px-10 py-5 text-[#f9f9f9] text-center bg-[#2f5d8c] font-semibold mb-10">
                <p>
                With this team in place, PSF Hyderabad is poised to reach greater heights. Be it upskilling professionals, running career mentorship programs, or serving the underprivileged, we remain committed to purpose-driven growth.
                </p>
            </div>
        </>
    )
}

export default CoreTeam

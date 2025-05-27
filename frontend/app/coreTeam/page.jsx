'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CoreTeam = () => {
    const [teamData, setTeamData] = useState({
        olt: [],
        permanent: [],
        verticalLeads: [],
        coreMembers: []
    })

    const fetchTeamData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/team')
            setTeamData(res.data)
        } catch (err) {
            console.error('Failed to fetch team data:', err)
        }
    }

    useEffect(() => {
        fetchTeamData()
    }, [])

    return (
        <>
            {/* Hero Section */}
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
                    <p className="text-[#d8d8d6] mt-4 text-sm md:text-lg mx-auto px-5">
                        The PSF Hyderabad Core Team for the term 2025 represents...
                    </p>
                </div>
            </div>

            <style>{`
              @keyframes fadeInUp {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* OLT Section */}
            <div className="p-10 mx-5 text-[#2e77ae]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">ORGANIZATION LEADERSHIP TEAM (OLT)</h1>
                <p className="text-sm pb-4 text-[#2e77ae]">Our Organisation Leadership Team...</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {teamData.olt.map((person, i) => (
                        <div key={i} className="bg-white shadow-md p-5 text-center text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' className="rounded-full mb-2" alt={person.name} />
                            <p className="font-bold">{person.name}</p>
                            <p className="font-semibold text-[#2e77ae]">{person.role}</p>
                        </div>
                    ))}
                </div>
                <p className="pt-8 font-semibold text-[#2f5d8c] text-center">These leaders play a vital role...</p>
            </div>

            {/* Permanent Members */}
            <div className="p-10 mx-5 bg-[#ffffff] text-[#2f5d8c]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">PERMANENT MEMBERS</h1>
                <p className="text-[#2f5d8c] text-sm">The Permanent Members of PSF are...</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
                    {teamData.permanent.map((name, i) => (
                        <div key={i} className="text-center bg-white shadow-md p-5 text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' alt={name} className="rounded-full mb-2" />
                            <p className="font-bold">{name}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-4 font-semibold text-center">Their insights and mentorship ensure stability...</p>
            </div>

            {/* Vertical Leads */}
            <div className="p-10 mx-5 text-[#2f5d8c]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">VERTICAL LEADS</h1>
                <p className="mb-4 text-sm">Appointed by the Organisation Leadership Team...</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {teamData.verticalLeads.map((lead, i) => (
                        <div key={i} className="bg-white shadow-md p-5 text-center text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' alt={lead.name} className="rounded-full mb-2" />
                            <p className="font-bold">{lead.name}</p>
                            <p className="text-[#a0b3c1]">{lead.role}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-4 font-semibold text-center">These verticals function as the building blocks...</p>
            </div>

            {/* Other Core Members */}
            <div className="p-10 mx-5 bg-white text-[#2f5d8c]">
                <h1 className="text-2xl font-bold text-center pb-2 text-[#d55e2d]">OTHER CORE MEMBERS</h1>
                <p className="mb-4 text-sm">The remaining Core Members form the operational strength...</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {teamData.coreMembers.map((name, i) => (
                        <div key={i} className="bg-white shadow-md p-5 text-center text-[#2f5d8c] rounded-md">
                            <img src='/avatar.png' alt={name} className="rounded-full mb-2" />
                            <p className="font-bold">{name}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-4 font-semibold text-center">Each of them brings dedication and support...</p>
            </div>

            {/* Closing */}
            <div className="px-10 py-5 text-[#f9f9f9] text-center bg-[#2f5d8c] font-semibold mb-10">
                <p>With this team in place, PSF Hyderabad is poised to reach greater heights...</p>
            </div>
        </>
    )
}

export default CoreTeam

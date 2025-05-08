import React from 'react';
import EventCard from '../components/EventCard';

const Event = () => {
    return (
        <div className="px-4 py-10 max-w-6xl mx-auto bg-[#EOEAF5]">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <img
                    src="/1.2.jpg"
                    alt="BLS Workshop"
                    className="w-full md:w-1/2 rounded-xl shadow-xl border-4 border-[#2E77AE]"
                />
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-4xl font-bold text-[#0D2137] mb-2">
                        A Step Towards Safety: PSF’s Basic Life Support Workshop
                    </h1>
                    <p className="text-lg text-[#2E77AE] font-medium">
                        Empowering Through Awareness: Basic Life Support (BLS) Training Session
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6 text-justify text-[#0D2137] leading-relaxed bg-white p-6 rounded-xl shadow-md">
                <p>
                    As part of PSF’s commitment to community welfare and social responsibility, we are proud to share
                    the successful completion of a Basic Life Support (BLS) and First Responder Awareness program for
                    teachers at New Model School, Hussaini Alam, South Zone, in collaboration with Hyderabad City
                    Security Council (HCSC).
                </p>

                <p>
                    This initiative was organized under the leadership of <strong className="text-[#2E77AE]">Shri Rajashekhar Reddy</strong>, Joint Secretary – Traffic Forum, and <strong className="text-[#2E77AE]">Shri Viswa Prasad IPS</strong>, Additional Commissioner of Traffic & Convenor – Traffic Forum.
                </p>

                <p>
                    <strong className="text-[#FF8E2B]">Objective: Building Confidence, Saving Lives</strong><br />
                    Emergencies can occur anywhere, and knowing how to respond in those first few crucial minutes can
                    make all the difference.
                </p>

                <p>
                    <strong className="text-[#FF8E2B]">What the Session Covered:</strong>
                    <ul className="list-disc ml-6 mt-2">
                        <li>Cardiopulmonary Resuscitation (CPR): Focused theory and techniques.</li>
                        <li>Hands-on Practice: Real-time practical demonstrations.</li>
                        <li>First Aid Training: Core emergency handling skills.</li>
                    </ul>
                </p>

                <p>
                    <strong className="text-[#FF8E2B]">Acknowledging the Experts and Partners:</strong>
                    <ul className="list-disc ml-6 mt-2">
                        <li>Dr. Bharath Kanth Reddy – COO, KIMS Hospitals</li>
                        <li>Dr. Sekhar Kagula – AHA Instructor, KIMS Hospitals</li>
                        <li>Dr. Sreejith – Senior Consultant, Emergency Medicine</li>
                        <li>Mr. Pathi Srawan Kumar</li>
                        <li>Mr. Khaleel ur Rehman</li>
                        <li>Mr. Faqruddin Ali (PSF core team member)</li>
                        <li>Mr. Gulam Moinudin</li>
                    </ul>
                </p>

                <p>
                    This program was successfully conducted in collaboration with KIMS Hospital and the Khilwath
                    Sadbhawana Forum.
                </p>

                <p>
                    <strong className="text-[#FF8E2B]">Looking Ahead:</strong><br />
                    PSF aims to expand this effort further, reaching schools,
                    communities, and public spaces across the city.
                </p>

                <p>
                    <em className="text-[#FF8E2B] font-semibold">
                        Together, let’s build a more aware, compassionate, and ready society.
                    </em>
                </p>
            </div>

            {/* Related Posts Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-[#0D2137] mb-4 border-b-2 border-[#2E77AE] inline-block pb-1">
                    RELATED POSTS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
        </div>
    );
};

export default Event;

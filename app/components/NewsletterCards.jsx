import React from 'react'

const NewsletterCards = () => {
    return (
        <div>
            <div className="bg-[#0D2137] rounded-2xl p-6 w-[90%] max-w-md shadow-lg flex flex-col ">
                <img
                    src='/Newsletter.png'
                    alt="Newsletter Cover"
                    className="rounded-2xl h-[250px] w-full object-cover mb-6"
                />
                <div className="text-white text-center">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">
                        January to June 2024 Newsletter covering our major activities
                    </h2>
                    <button className="bg-[#e0eaf5] text-[#0d2137] font-semibold py-2 px-6 rounded-2xl hover:bg-[#c9d8eb] transition duration-300">
                        READ MORE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsletterCards
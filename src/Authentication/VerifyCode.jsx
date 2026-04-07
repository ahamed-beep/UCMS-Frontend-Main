import React, { useState } from 'react'
import Navbar from '../Componenets/Home/Sections/Navbar'
import Footer from '../Componenets/Home/Sections/Footer'
import { Link } from 'react-router-dom';

const VerifyCode = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const handleChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCode = code.join("");
        alert("Entered Code: " + finalCode);
    };

    return (
        <div>
            <Navbar />
            <div className="flex mb-12 justify-center mt-8 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#FCFCFC] rounded-[10px] border border-[#82828266] shadow-md w-full md:w-[400px] p-8"
                >
                    <h2 className="font-manrope text-2xl lg:text-4xl md:text-3xl font-medium text-center leading-relaxed text-[#333333] mb-7">
                        Verify code
                    </h2>


                    <div className="flex justify-between mb-8">
                        {code.map((digit, index) => (
                            <React.Fragment key={index}>

                                {/* Input */}
                                <input
                                    id={`input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    className="w-12 h-12 border border-[#82828266] text-center text-lg rounded-md"
                                />

                                {(index === 1 || index === 3) && (
                                    <span className="text-xl font-bold text-gray-400">-</span>
                                )}

                            </React.Fragment>
                        ))}
                    </div>

                    <Link to='/resetpassword'>
                        <button
                            className="w-full py-3 bg-[#FF6B35] rounded-full text-white font-semibold text-sm tracking-wide cursor-pointer"
                        >
                            Verify
                        </button>
                    </Link>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default VerifyCode
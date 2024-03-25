/* import React from "react";
import FAQ from "../components/FaqAccordion";

const HelpCenter = () => {
    return (
        <div className="d-flex flex-column mx-4">
            <h1 className="mt-4">Help Center</h1>
            <div className="d-flex gap-3">
            <button type='button' className='btn btn-secondary btn-lg'>Buying</button>
            <button type='button' className='btn btn-secondary btn-lg'>Selling</button>
            </div>
            <h3 className="mx-4">FAQ</h3>
            <div className='mx-4 mb-4'>
                <FAQ/>
            </div>
        </div>
    );
};

export default HelpCenter; */

import React from "react";
import FAQ from "../components/FaqAccordion"; 

const HelpCenter = () => {
    // Anta att du har din faqData här eller hämtar den från någonstans

    // Exempel på faqData
    const faqData = [
        {
            question: "Question #1",
            answer: "Answer #1",
        },
        {
            question: "Question #2",
            answer: "Answer #2",
        },
        {
            question: "Question #3",
            answer: "Answer #3",
        },
    ];

    return (
        <div className="d-flex flex-column mx-4">
            <h1 className="mt-4 mb-6 mx-4">Help Center</h1>
            <div className="d-flex justify-content-around">
                <button type='button' className='btn btn-secondary btn-lg mr-1'>Buying</button>
                <button type='button' className='btn btn-secondary btn-lg mr-1'>Selling</button>
            </div>
            <h3 className="mx-4">FAQ</h3>
            <div className='d-flex mx-4 mb-4 mr'>
                <div className="w-50">
                    {/* Skicka in faqData som props till FAQ */}
                    <FAQ faqData={faqData} />
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;

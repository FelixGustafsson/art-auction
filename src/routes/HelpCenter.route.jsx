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
import Accordion from "../components/Accordion"

function HelpCenter() {
    const faqData = [
      {
        question: "Question #1",
        answer:
          "Here is the first answer."
      },
      {
        question: "Question #2",
        answer:
          "Here comes answer number two."
      },
      {
        question: "Question #3",
        answer:
          "Last but not least, here's the third answer."
      }
    ];

    return (
        <div className="d-flex flex-column mx-4">
            <h1 className="mt-4 mb-6 mx-4">Help Center</h1>
            <h3 className="mx-4">FAQ</h3>
            <div className='d-flex mx-4 mb-4 mr'>
                <div className="w-50">
                    {/* Skicka in faqData som props till FAQ */}
                    <Accordion faqData={faqData} />
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;

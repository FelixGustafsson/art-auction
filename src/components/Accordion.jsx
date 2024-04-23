import React, { useState } from "react";

export default function FAQ({ faqData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {faqData.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header">
            <button  
              className="accordion-button collapsed"
              type="button"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index ? "true" : "false"}
            >
              {item.question}
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              activeIndex === index ? "show" : ""
            }`}
          >
            <div className="accordion-body">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

import React from 'react'

const InfoTextContainer = ({ title, description, artist, style, material, date, provenance }) => {
    return (
        <div className='d-flex'>

            <img src="https://www.sciencefriday.com/wp-content/uploads/2023/06/brain-art.jpg" class="rounded" alt="BrainArt" height="300px" width="500px"></img>
            <div>
                <h1>{title}</h1>
                <p>
                    Here on the info page we have a slightly smaller version of the picture - why? <br />
                    I don’t know, maye it should be the same size as on the buy now page, <br />
                    that would probably be simpler. There should be a description - perhaps longer than on the main listings page?<br />
                    - and some specific information from the database, such as: <br />

                    Artist: e.g. Gerhard Richter
                    Title: e.g. Blob III
                    Style: e.g. abstract impressionism
                    Date: e.g. 1973
                    Material: e.g. oil on wood panel
                    Provenance: e.g. from the collection of the late duke of Buckinghamshire

                    Anything else?
                </p>

                <h2>Bid on this artwork:</h2>

                <div className='d-flex'>

                    <button type='button' className='btn btn-danger'>Back</button>
                    <button type='button' className='btn btn-success'>Bid Now</button>

                </div>

            </div>








        </div>

    )
}

export default InfoTextContainer
import React from 'react'
import InfoTextContainer from '../components/InfoTextContainer'

const ArtInfo = () => {
  const desc = ` Here on the info page we have a slightly smaller version of the picture - why?
  I don’t know, maye it should be the same size as on the buy now page, 
  that would probably be simpler. There should be a description - perhaps longer than on the main listings page?
  - and some specific information from the database, such as:`
  return (
    <div>
      <InfoTextContainer title="Sunflower" description={desc} artist="Gerhard Richter" style="abstract impressionism" material="oil on wood panel" date='1973' provenance="from the collection of the late duke of Buckinghamshire"/>

    </div>

  )
}

export default ArtInfo
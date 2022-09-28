import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={4}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#cdcbcb"
    foregroundColor="#afacac"
    {...props}
  >
    <rect x="4" y="257" rx="10" ry="10" width="250" height="39" /> 
    <circle cx="130" cy="122" r="122" /> 
    <rect x="4" y="307" rx="10" ry="10" width="250" height="88" /> 
    <rect x="2" y="400" rx="20" ry="20" width="91" height="41" /> 
    <rect x="110" y="400" rx="20" ry="20" width="140" height="41" />
  </ContentLoader>
)

export default Skeleton;

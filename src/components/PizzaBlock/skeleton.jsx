import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="396" rx="10" ry="10" width="94" height="30" /> 
    <rect x="145" y="390" rx="24" ry="24" width="135" height="41" /> 
    <rect x="0" y="252" rx="10" ry="10" width="280" height="24" /> 
    <circle cx="137" cy="116" r="113" /> 
    <rect x="-2" y="296" rx="10" ry="10" width="280" height="75" />
  </ContentLoader>
)

export default Skeleton

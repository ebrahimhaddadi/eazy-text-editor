import React, { FC } from 'react'
interface PreviewProps{
    content:string
}
const Preview:FC<PreviewProps> =({content})=> {
  return (
    <div dangerouslySetInnerHTML={{__html:content}} />
  )
}

export default Preview
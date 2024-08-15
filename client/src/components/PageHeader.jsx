import React from 'react'

export const PageHeader = ({
    heading,
    sub_heading
}) => {
  return (
    <div className='about_page padding'>
        <h1>{heading}</h1>
        <p>{sub_heading}</p>
    </div>
  )
}

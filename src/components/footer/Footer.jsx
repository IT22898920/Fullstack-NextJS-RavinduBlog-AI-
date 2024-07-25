import React from 'react'
import FooterLinks from './FooterLinks'

const Footer = () => {
  return (
    <>
      <FooterLinks />
      <div className="bg-color-dark-blue h-14 --center-all">
        <div className="container flex-center py-3">
          <p className="text-sm text-white">
            © RavinduBlog - All Rights Reserved
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
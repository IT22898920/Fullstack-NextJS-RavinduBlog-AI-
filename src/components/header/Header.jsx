import React from 'react'
import MainHeader from './MainHeader'
import MainHeaderMobile from './MainHeaderMobile'

const Header = () => {
  return (
    <header className="header">
      <div className="show-on-desktop">
        <MainHeader />
      </div>
      <div className="show-on-mobile">
      <MainHeaderMobile />
      </div>
    </header>
  )
}

export default Header
import React from 'react'

const Slides = props => <div {...props}></div>

const SlideNav = props => <nav {...props}></nav>

const SlideNavItem = ({isCurrent, ...props}) => (
  <button {...props}>
    <span
      style={{
        background: isCurrent ?
          'hsla(0, 100%, 100%, 0.75)' :
          'hsla(0, 100%, 100%, 0.25)',
      }}
    />
  </button>
)

export {
  Slides,
  SlideNav,
  SlideNavItem
}

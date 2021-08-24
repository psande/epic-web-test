/**
 * Footer component.
 */

// Styles
import './Footer.scss'

// Icons
import { ReactComponent as HelpCircle } from 'assets/icons/help-circle.svg'

const Footer = () => (
  <div className='Footer'>
    <ul>
      <li>
        <a href={'/clockwise-matrix/assignment'} aria-label='Help Clockwork Matrix'><HelpCircle /></a><a href={'/clockwise-matrix'}>Clockwise Matrix</a>
      </li>
      <li>
        <a href={'/real-world/assignment'} aria-label='Help Real World'><HelpCircle /></a><a href={'/real-world'}>Real World</a>
      </li>
    </ul>
  </div>
)

export default Footer

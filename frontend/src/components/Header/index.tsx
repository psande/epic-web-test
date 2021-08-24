/**
 * Header component.
 */

// Styles
import './Header.scss'

// Assets
import { ReactComponent as LogoSrc } from 'assets/logo.svg'

// Types
export interface Props {
  header: string
}

const Header = ({ header }: Props) => (
  <a className="Header" href="/">
    <LogoSrc title='Logo'/>
    <h1>{header}</h1>
  </a>
)

export default Header

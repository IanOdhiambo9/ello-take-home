import './header.css';

function Header() {
  return (
    <header>
      <img className='logo' src="https://books.ello.com/static/media/logoEllo.2b20bb072a0c339867f3cb02fe3515b6.svg" alt="Ello Logo" />
      <nav>
        <ul>
          {/* <li><a className='primary-color mulish-500'>Home</a></li>
          <li><a className='primary-color mulish-500'>About Us</a></li>
          <li><a className='primary-color mulish-500'>Contact</a></li> */}
        </ul>
      </nav>
    </header>
  )
}
export default Header;
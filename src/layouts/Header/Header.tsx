import './Header.scss';
import { Link } from 'react-router-dom';
import reactLogo from '@/assets/react.svg';

export default function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src={reactLogo} alt="React Logo" />
                </Link>
            </div>
            <nav className="header__nav">
                {/* Navigation links would go here */}
            </nav>
        </header>
    );
}

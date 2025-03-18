import './Footer.scss';

export default function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} - template-vite-react-ts</p>
        </footer>
    );
}

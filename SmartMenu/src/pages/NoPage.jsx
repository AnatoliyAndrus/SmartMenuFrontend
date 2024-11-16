
import { Link } from 'react-router-dom';
import './NoPage.css';

export default function NoPage() {
    return (
        <div className="no-page-container">
            <h1 className="no-page-title">404</h1>
            <p className="no-page-message">Oops! The page you are looking for does not exist.</p>
            <Link to="/client" className="no-page-link">
                Go Back Home
            </Link>
        </div>
    );
}
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBInput,
} from 'mdb-react-ui-kit';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please enter both email and password.');
                return;
            }

            const response = await axios.post('http://localhost:8080/auth/login', { email, password });
            console.log('Login successful:', response.data);
            navigation('/admin');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{background:"#f0f4f8"}}>
            <div className="p-4" style={{ width: '500px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Login</h2>
                    <MDBInput wrapperClass='mb-4 border rounded' id='email' value={email} type='email' label='Email' onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-4 border rounded' id='password' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */}
                    <button className="btn btn-primary" style={{ height:'50px',width: '100%' }} onClick={handleLogin}>Sign in</button>
                </MDBContainer>
            </div>
        </div>
    );
}

export default LoginPage;
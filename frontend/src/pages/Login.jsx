import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-subtle">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-12 h-12 text-white mb-4" />
          <h1 className="text-2xl font-bold text-white tracking-tight">FOODGUARD AI</h1>
          <p className="text-secondaryText text-sm mt-2">Food Safety Intelligence Platform</p>
        </div>

        {error && (
          <div className="bg-riskHigh/10 border border-riskHigh text-riskHigh p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondaryText mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-muted transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondaryText mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-muted transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-lg px-4 py-2 hover:bg-surface transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-secondaryText">
          <p>Hackathon Demo Mode enabled.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

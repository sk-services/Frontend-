import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Eye, EyeOff, AlertTriangle, Shield } from 'lucide-react';
import AdminDashboard from '@/components/AdminDashboard';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Secure admin access - unique URL pattern that's hard to guess
  const adminPath = '/sk-admin-2025-secure';
  const correctPassword = 'SKCleaning2025!'; // Change this to a secure password

  useEffect(() => {
    // Check if user is on the correct admin path
    if (location.pathname !== adminPath) {
      navigate('/');
      return;
    }

    // Check for existing session
    const adminSession = sessionStorage.getItem('adminSession');
    if (adminSession && adminSession === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, [location.pathname, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      setError('Account is temporarily locked. Please try again later.');
      return;
    }

    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminSession', 'authenticated');
      setError('');
      setAttempts(0);
    } else {
      setAttempts(attempts + 1);
      setError(`Invalid password. ${3 - attempts} attempts remaining.`);

      if (attempts >= 2) {
        setIsLocked(true);
        setError('Account locked due to multiple failed attempts. Please try again in 15 minutes.');
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
          setError('');
        }, 15 * 60 * 1000); // 15 minutes
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminSession');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e5e3f9] to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#36454F] rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#36454F]">
              Admin Access
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Enter your credentials to access the admin dashboard
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Admin Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pr-10"
                    disabled={isLocked}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-[#36454F] hover:bg-[#2a3439] text-white"
                disabled={isLocked || !password}
              >
                Access Dashboard
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Secure admin access for SEVA MANTRA
              </p>
              <p className="text-xs text-gray-400 mt-1">
                URL: {adminPath}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-[#36454F] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6" />
            <h1 className="text-xl font-semibold">SEVA MANTRA Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">
              Admin Dashboard
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className=" text-black hover:bg-red-500 hover:text-[#36454F]"
            >
              Logout
            </Button>
          </div>
        </div>

      </div>

      {/* Admin Dashboard */}
      <AdminDashboard />
    </div>
  );
}

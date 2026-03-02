import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <SignedIn>
        <AppRouter />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Budget Intelligence</h1>
            <p className="text-gray-600 mb-6">AI-powered personal finance</p>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </BrowserRouter>
  );
}

export default App;

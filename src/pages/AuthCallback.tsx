
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback processing...');
        
        // Extract the hash fragment
        const hashParams = window.location.hash;
        console.log('Hash parameters:', hashParams);
        
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error during auth callback:', error);
          toast.error("Authentication failed", {
            description: error.message || "There was a problem during the authentication process"
          });
          navigate('/login?error=auth');
          return;
        }
        
        if (data?.session) {
          console.log('Auth successful, session established:', data.session.user.id);
          
          // Check if profile is completed
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('profile_completed, name')
            .eq('id', data.session.user.id)
            .maybeSingle();
            
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            toast.error("Could not retrieve your profile", {
              description: "We'll redirect you to the profile page"
            });
            navigate('/profile');
            return;
          }
          
          console.log('Retrieved profile:', profile);
          
          toast.success("Login successful", {
            description: profile && profile.profile_completed 
              ? "Welcome back!" 
              : "Welcome! Please complete your profile."
          });
          
          // Redirect to home if profile is completed, otherwise to profile page
          if (profile && profile.profile_completed) {
            navigate('/');
          } else {
            navigate('/profile');
          }
        } else {
          console.error('No session established after authentication');
          toast.error("Authentication failed", {
            description: "No session was established"
          });
          navigate('/login');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        toast.error("Authentication error", {
          description: "An unexpected error occurred"
        });
        navigate('/login');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="mb-4 w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xl font-medium">Completing login...</p>
        <p className="text-muted-foreground">Please wait while we set up your session</p>
      </div>
    </div>
  );
};

export default AuthCallback;

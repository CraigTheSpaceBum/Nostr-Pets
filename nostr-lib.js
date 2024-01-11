@ -0,0 +1,40 @@
// nostr-lib.js

const nostrLib = {
    login: async () => {
      try {
        // Call Nostr SDK login function
        const user = await nostr.login();
  
        // Do additional actions after login (if needed)
        console.log('Logged in as:', user);
  
        return user;
      } catch (error) {
        console.error('Nostr login error:', error);
      }
    },
  
    logout: async () => {
      try {
        // Call Nostr SDK logout function
        await nostr.logout();
  
        // Do additional actions after logout (if needed)
        console.log('Logged out successfully');
      } catch (error) {
        console.error('Nostr logout error:', error);
      }
    },
  
    isAuthenticated: async () => {
      try {
        // Call Nostr SDK isAuthenticated function
        const authenticated = await nostr.isAuthenticated();
        return authenticated;
      } catch (error) {
        console.error('Nostr authentication check error:', error);
      }
    },
  };
  

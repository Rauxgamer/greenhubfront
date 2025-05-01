




export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      return cookie || null;
    }
    return null;
  };
  
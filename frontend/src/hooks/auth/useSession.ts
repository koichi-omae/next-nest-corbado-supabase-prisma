import { useState } from 'react';

export const useSession = () => {
  const [session, setSession] = useState<string | null>(null);

  return { session, setSession };
};

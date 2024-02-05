import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return { loading, setLoading };
};

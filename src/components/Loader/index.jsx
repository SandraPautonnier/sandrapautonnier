import { useState, useEffect } from 'react'

const Loader = (delay = 900) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, delay);
    
        return () => clearTimeout(timer);
    }, [delay]);

  return loading;
}

export default Loader;
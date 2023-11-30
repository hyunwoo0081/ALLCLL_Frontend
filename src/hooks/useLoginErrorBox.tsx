import {useState} from 'react';

function useLoginErrorBox() {
  const [error, setError] = useState<string | null>(null);
  
  return {
    setErrorMessage: setError, ErrorBox: error ? (
      <div className='error_box'>
        {error.split('\n').map((line, i) =>
          <p key={i}>{line}</p>
        )}
      </div>
    ) : null
  };
}

export default useLoginErrorBox;
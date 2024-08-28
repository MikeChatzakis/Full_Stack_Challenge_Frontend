import {useState, useEffect} from 'react';

const useFetch = (url, options = {}) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
          setIsPending(true);
          fetch(url, {...options,signal: abortCont.signal})   //options are in the hook but we are not using them at the moment.
          .then(res => {
            if (!res.ok) { // error coming back from server
              return res.json().then(errData => {
                throw new Error(errData.message || 'Could not fetch the data for that resource');
              });
            } 
            return res.json();
          })
          .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
          })
          .catch(err => {
            setIsPending(false);
            // auto catches network / connection error
            switch(err.name){
              case 'AbortError':
                  console.log('fetch Aborted');
              break;
              case 'NetworkError':
                  console.log('Network Error');
                  setError(err.message);
              break;
              case 'FetchError':
                  console.log('Fetch Error');
                  setError(err.message);
              break;
              default:
                  setError(err.message);
            }
          })
         },);

        //cleanup
        return () => abortCont.abort();


      }, [url])

      return {data,isPending,error};
}

export default useFetch;

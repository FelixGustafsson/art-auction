import { createContext } from 'react';

const FetchContext = createContext();

const FetchProvider = ({ children }) => {
  const getFetchGeneral = async (endpoint) => {
    if (endpoint) {
      const res = await fetch(`${endpoint}`);
      const result = await res.json();
      return result;
    }
  };

  const fetchGeneral = async (endpoint, method, body) => {
    if (endpoint && method && body) {
      const res = await fetch(`${endpoint}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });


      return res;
    }
  };
  return (
    <FetchContext.Provider value={{ getFetchGeneral, fetchGeneral }}>
      {children}
    </FetchContext.Provider>
  );
};

export { FetchContext, FetchProvider };

//When you call getFetchGeneral, you pass an endpoint as a parameter (eg /users) and as a return you get the result.

/*When you call fetchGeneral, you pass an endpoint, method and body as 
parameters (eg /users, "PATCH", {username: "pelle", password: "123"}) 
and as a return you get the result. IMPORTANT: The body parameter needs to be an object and the method needs to be 
in capital letters*/

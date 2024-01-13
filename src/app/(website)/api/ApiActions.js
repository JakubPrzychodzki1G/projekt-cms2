const getBaseUrl = (context) => {
  return context?.req?.apiUrl
    ? context.req.apiUrl
    : document.location.origin + "/api";
};


const API = {
  get: async (apiUrl, options, context) => {
      const baseURL = getBaseUrl(context);
      const { params } = options;
  
      const urlSearchParams = new URLSearchParams(params);
      console.log(options);

      const fullUrl = `${baseURL}${apiUrl}${''+urlSearchParams != '' ? '?'+urlSearchParams: ''}`;
  
      const res = await fetch(
          fullUrl,
          {
          method: "GET",
          headers: {
              Accept: "application/json",
          },
          },
          options?.signal
      );
  
      /**
       * Sprawdza czy request był pomyślny i przekazuję ew. błąd dalej, tak aby trafił na front
       */
      if (!res.ok) {
          const err = new Error(`GET ${fullUrl} failed with status ${res.status}`);
          err.status = res.status;
          err.response = res;
          throw err;
      }
  
      const jsonResponse = await res.json();
  
      return jsonResponse;
  },
  post: async (apiUrl, payload, options = { params: {} }, context) => {
      const baseURL = getBaseUrl(context);
      const { params } = options;
  
      const urlSearchParams = new URLSearchParams(params);
  
      const data = payload;
      const res = await fetch(
          `${baseURL}${apiUrl}${''+urlSearchParams != '' ? '?'+urlSearchParams: ''}`,
          {
          method: "POST",
          headers: {
              Accept: "application/ld+json",
              "Content-Type": "application/ld+json",
          },
          body: JSON.stringify(data),
          },
          options?.signal
      );
  
      const jsonResponse = await res.json();
  
      return jsonResponse;
  },
  patch: async (apiUrl, payload, options = { params: {} }, context) => {
      const baseURL = getBaseUrl(context);
      const { params } = options;
  
      const urlSearchParams = new URLSearchParams(params);
  
      const data = { data: payload };
      const res = await fetch(
          `${baseURL}${apiUrl}${''+urlSearchParams != '' ? '?'+urlSearchParams: ''}`,
          {
          method: "PATCH",
          headers: {
              Accept: "application/ld+json",
              "Content-Type": "application/ld+json",
          },
          body: JSON.stringify(data),
          },
          options?.signal
      );
  
      if (res.status === 401) {
          context.res.writeHead(301, {
          Location: "/",
          });
          context.res.end();
          return;
      }
  
      const jsonResponse = await res.json();
  
      return jsonResponse;
  },
  put: async (apiUrl, payload, options = { params: {} }, context) => {
      const baseURL = getBaseUrl(context);
      const { params } = options;
  
      const urlSearchParams = new URLSearchParams(params);
  
      const data = { data: payload };
      const res = await fetch(
          `${baseURL}${apiUrl}${''+urlSearchParams != '' ? '?'+urlSearchParams: ''}`,
          {
          method: "PUT",
          headers: {
              Accept: "application/ld+json",
              "Content-Type": "application/ld+json",
          },
          body: JSON.stringify(data),
          },
          options?.signal
      );
  
      if (res.status === 401) {
          context.res.writeHead(301, {
          Location: "/",
          });
          context.res.end();
          return;
      }
  
      const jsonResponse = await res.json();
  
      return jsonResponse;
  },
  delete: async (apiUrl, context) => {
      const baseURL = getBaseUrl(context);
      
      const res = await fetch(
          `${baseURL}${apiUrl}`,
          {
          method: "DELETE",
          headers: {
              Accept: "application/ld+json",
              "Content-Type": "application/ld+json",
          },
          },
      );
  
      const jsonResponse = await res;
  
      return jsonResponse;
  }
};
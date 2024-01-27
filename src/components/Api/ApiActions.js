const getBaseUrl = (context) => {
    return context?.req?.apiUrl
      ? context.req.apiUrl
      : document.location.origin + "/api";
};
  

const API = {
    get: async (apiUrl, options = { params: {} }, context) => {
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
    
        const data = { ...payload };
        const res = await fetch(
            `${baseURL}${apiUrl}${''+urlSearchParams != '' ? '?'+urlSearchParams: ''}`,
            {
            method: "PATCH",
            headers: {
                Accept: "application/ld+json",
                "Content-Type": "application/merge-patch+json",
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
    
        const jsonResponse = await res;
    
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

export default {
    //gets requests
    get: async (apiUrl, options, context) => {
        return await API.get(apiUrl, options, context);
    },
    getMe: async (options, context) => {
        return await API.get("/me", options, context);
    },
    getGroups: async (options, context) => {
        return await API.get("/swim_groups", options, context);
    },
    getGroup: async (id, options, context) => {
        return await API.get(`/swim_groups/${id}`, options, context);
    },
    getPlayers: async (options, context) => {
        return await API.get("/players", options, context);
    },
    getPlayer: async (id, options, context) => {
        return await API.get(`/players/${id}`, options, context);
    },
    getUsers: async (options, context) => {
        return await API.get("/users", options, context);
    },
    getUser: async (id, options, context) => {
        return await API.get(`/users/${id}`, options, context);
    },
    getLessons: async (options, context) => {
        console.log(options);
        return await API.get("/lessons", options, context);
    },
    getLesson: async (id, options, context) => {
        return await API.get(`/lessons/${id}`, options, context);
    },
    getAttendances: async (options, context) => {
        return await API.get("/attendances", options, context);
    },
    getAttendance: async (id, options, context) => {
        return await API.get(`/attendances/${id}`, options, context);
    },
    getSettings: async (options, context) => {
        return await API.get("/settings", options, context);
    },
    getSetting: async (id, options, context) => {
        return await API.get(`/settings/${id}`, options, context);
    },
    //posts requests
    postGroup: async (payload, context) => {
        return await API.post("/swim_groups", payload, {}, context);
    },
    postPlayer: async (payload, context) => {
        return await API.post("/players", payload, {}, context);
    },
    postUser: async (payload, context) => {
        return await API.post("/users", payload, {}, context);
    },
    postLesson: async (payload, context) => {
        return await API.post("/lessons", payload, {}, context);
    },
    postAttendance: async (payload, context) => {
        return await API.post("/attendances", payload, {}, context);
    },
    //patch requests
    patchGroup: async (id, payload ,context) => {
        return await API.patch(`/swim_groups/${id}`, payload, {}, context);
    },
    patchPlayer: async (id, payload ,context) => {
        return await API.patch(`/players/${id}`, payload, {}, context);
    },
    patchUser: async (id, payload ,context) => {
        return await API.patch(`/users/${id}`, payload, {}, context);
    },
    patchLesson: async (id, payload ,context) => {
        return await API.patch(`/lessons/${id}`, payload, {}, context);
    },
    patchAttendance: async (id, payload ,context) => {
        return await API.patch(`/attendances/${id}`, payload, {}, context);
    },
    patchSetting: async (id, payload ,context) => {
        return await API.patch(`/settings/${id}`, payload, {}, context);
    },
    //put requests
    putGroup: async (id, payload ,context) => {
        return await API.put(`/swim_groups/${id}`, payload, {}, context);
    },
    putSetting: async (id, payload ,context) => {
        return await API.put(`/settings/${id}`, payload, {}, context);
    },
    //delete requests
    deleteGroup: async (id, context) => {
        return await API.delete(`/swim_groups/${id}`, context);
    },
    deletePlayer: async (id, context) => {
        return await API.delete(`/players/${id}`, context);
    },
    deleteUser: async (id, context) => {
        return await API.delete(`/users/${id}`, context);
    },
    deleteLesson: async (id, context) => {
        return await API.delete(`/lessons/${id}`, context);
    },
    deleteAttendance: async (id, context) => {
        return await API.delete(`/attendances/${id}`, context);
    }
}
  
  
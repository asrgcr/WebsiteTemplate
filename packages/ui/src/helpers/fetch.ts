const midwayFetch = window.fetch;

const addHeader = (name: string, value: string, existingHeaders: HeadersInit | undefined): HeadersInit => {
    if (!existingHeaders) {
        return { [name]: value}
    }
    if (existingHeaders instanceof Headers) {
        existingHeaders.append(name, value);
    } else if (Array.isArray(existingHeaders)) {
        existingHeaders.push([name, value]);
    } else {
        existingHeaders[name] = value;
    }
    return existingHeaders;
}

const getSha256Hash = async (str: string): Promise<string> => {
    const encodedString = new TextEncoder().encode(str.toString());
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedString);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const getHeaders = async (options?: RequestInit): Promise<HeadersInit | undefined> => {
    if (!options) {
        return undefined;
    }
    if (options.body) {
        if (typeof options.body !== 'string') {
            throw new Error("The fetch helper for this website only accepts a string body");
        }
        const bodyHash = await getSha256Hash(options.body);
        return addHeader("x-amz-content-sha256", bodyHash, options.headers);
    } else {
        return options.headers;
    }
}

export const fetch = async (request: RequestInfo | URL, options?: RequestInit): Promise<Response> =>
    midwayFetch(request, {...options, credentials: "same-origin", headers: await getHeaders(options) });
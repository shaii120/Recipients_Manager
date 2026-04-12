
import { StatusCodes } from "http-status-codes";

export async function apiFetch<T>(url: string, router?: any, options?: RequestInit): Promise<T> {
    const res = await fetch(url, { credentials: 'include', ...options });
    if (res.status === StatusCodes.UNAUTHORIZED && router) {
        router.push("/login");
        throw res;
    }

    const data = res.json();
    return data;
}
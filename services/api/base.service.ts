import { API_CONFIG, getAuthHeader } from './config';

export class BaseApiService {
  protected baseUrl: string;
  protected headers: HeadersInit;

  constructor(endpoint: string) {
    this.baseUrl = `${API_CONFIG.BASE_URL}/${endpoint}`;
    this.headers = API_CONFIG.HEADERS;
  }

  protected async get<T>(path: string = '', token?: string): Promise<T> {
    const headers: HeadersInit = {
      ...this.headers,
      ...(token ? getAuthHeader(token) : {}),
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  protected async post<T>(path: string = '', data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      ...this.headers,
      ...(token ? getAuthHeader(token) : {}),
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  protected async put<T>(path: string = '', data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      ...this.headers,
      ...(token ? getAuthHeader(token) : {}),
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  protected async delete<T>(path: string = '', token?: string): Promise<T> {
    const headers: HeadersInit = {
      ...this.headers,
      ...(token ? getAuthHeader(token) : {}),
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
} 
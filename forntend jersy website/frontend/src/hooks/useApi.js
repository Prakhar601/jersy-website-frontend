export default function useApi() {
  const baseUrl = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  async function get(path) {
    const response = await fetch(`${baseUrl}${path}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`GET ${path} failed: ${response.status} ${text}`);
    }
    return response.json();
  }

  async function post(path, body) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body ?? {}),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`POST ${path} failed: ${response.status} ${text}`);
    }
    return response.json();
  }

  return { get, post };
}



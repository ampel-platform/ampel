// src/api/AlertRepository.ts
export type Alert = {
  id: number;
  message: string;
  severity: 'INFO' | 'WARNING' | 'ERROR';
  timestamp: string; // ISO string
};

const BASE_URL = '/api/alerts';

export const AlertRepository = {
  async getAll(): Promise<Alert[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  async getById(id: number): Promise<Alert> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Alert ${id} not found`);
    return res.json();
  },

  async create(alert: Omit<Alert, 'id'>): Promise<Alert> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    if (!res.ok) throw new Error('Failed to create alert');
    return res.json();
  },

  async update(id: number, alert: Partial<Alert>): Promise<Alert> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    if (!res.ok) throw new Error('Failed to update alert');
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete alert');
  },
};

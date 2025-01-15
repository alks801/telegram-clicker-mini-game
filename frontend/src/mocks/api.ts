export const mockApi = {
  click: () => Promise.resolve({ ok: true }),
  getUpgrades: () => Promise.resolve([{ id: 1, name: "Auto Clicker", cost: 100 }]),
  getMissions: () => Promise.resolve([{ id: 1, name: "Click 100 times", progress: 50 }]),
}

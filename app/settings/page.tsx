"use client"

import { useEffect, useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({ theme: "dark", notifications_enabled: true })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8000/settings/")
        const data = await res.json()
        setSettings(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function save() {
    try {
      await fetch("http://localhost:8000/settings/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      alert("Settings saved")
    } catch (e) {
      console.error(e)
      alert("Failed to save settings")
    }
  }

  return (
    <div className="py-6 px-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full rounded-md border p-2 bg-background"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!settings.notifications_enabled}
                onChange={(e) => setSettings({ ...settings, notifications_enabled: e.target.checked })}
              />
              <span className="text-sm">Enable notifications</span>
            </label>
          </div>
          <div>
            <button className="rounded-md bg-primary px-4 py-2 text-white" onClick={save}>
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

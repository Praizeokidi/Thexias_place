import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, RefreshCw, Search } from "lucide-react";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1BtbEq-NcCdzjNQqW15yckU_Fbt1URRiLf1WXzs8qTO0/edit";
const DATA_URL = import.meta.env.VITE_ADMIN_DATA_URL || "";

export default function AdminDashboard({ back }) {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(Boolean(DATA_URL));
  const [error, setError] = useState("");

  const load = async () => {
    if (!DATA_URL) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(DATA_URL, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("The private data endpoint did not respond.");
      const payload = await response.json();
      setRows(Array.isArray(payload) ? payload : payload.rows || payload.data || []);
    } catch (err) {
      setError(err.message || "Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  const filtered = useMemo(() => rows.filter((row) => {
    const text = Object.values(row).join(" ").toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (status === "All" || row.status === status);
  }), [rows, query, status]);
  const newCount = rows.filter((row) => (row.status || "New") === "New").length;
  const interests = new Set(rows.map((row) => row.interest).filter(Boolean)).size;

  return <section className="admin-page service-page">
    <div className="admin-top"><div><small>PRIVATE STUDIO</small><h1>Submission <em>dashboard.</em></h1><p>A quiet, practical view of your waitlist and customer requests.</p></div><button className="prelaunch-link" onClick={back}>Back to the store <ArrowUpRight size={15} /></button></div>
    <div className="admin-actions"><a className="admin-sheet-link" href={SHEET_URL} target="_blank" rel="noreferrer">Open Google Sheet <ArrowUpRight size={15} /></a>{DATA_URL && <button className="admin-refresh" onClick={load}><RefreshCw size={15} /> Refresh</button>}</div>
    {!DATA_URL && <div className="admin-notice"><strong>Secure connection ready to configure.</strong><p>Set <code>VITE_ADMIN_DATA_URL</code> to a private read-only Apps Script or server endpoint. Google credentials never belong in this frontend.</p></div>}
    {error && <div className="admin-notice admin-error">{error}</div>}
    <div className="admin-stats"><div><small>TOTAL REQUESTS</small><b>{rows.length}</b></div><div><small>NEW</small><b>{newCount}</b></div><div><small>INTERESTS</small><b>{interests}</b></div></div>
    <div className="admin-table-head"><div className="admin-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search submissions" /></div><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>New</option><option>Contacted</option><option>Paid</option><option>Fulfilled</option></select></div>
    <div className="admin-table"><div className="admin-row admin-header"><span>Submitted</span><span>Customer</span><span>Interest</span><span>Exact item</span><span>Status</span></div>{loading ? <div className="admin-empty">Loading private submissions…</div> : filtered.length ? filtered.map((row, index) => <div className="admin-row" key={row.id || `${row.name}-${index}`}><span>{row.submitted || row.timestamp || "—"}</span><strong>{row.name || "—"}<small>{row.contact || ""}</small></strong><span>{row.interest || row.category || "—"}</span><span>{row.item || row.exactItem || row.request || "—"}</span><span className="admin-status">{row.status || "New"}</span></div>) : <div className="admin-empty">{DATA_URL ? "No submissions match this view." : "Connect the private endpoint to populate this dashboard."}</div>}</div>
  </section>;
}

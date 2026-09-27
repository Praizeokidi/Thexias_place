import { useState } from "react";
import { ArrowRight } from "lucide-react";

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT || "";
const interestOptions = ["Denim", "Shoes", "Tops", "Gowns", "Lingerie"];

export default function WaitlistForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: "", contact: "", interests: [], item: "", size: "", colour: "", notes: "" });
  const [state, setState] = useState({ loading: false, error: "", sent: false });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggleInterest = (item) => update("interests", form.interests.includes(item) ? form.interests.filter((value) => value !== item) : [...form.interests, item]);
  const submit = async (event) => {
    event.preventDefault();
    if (!ENDPOINT) { setState({ loading: false, sent: false, error: "The waitlist endpoint is not connected yet. Add VITE_WAITLIST_ENDPOINT to the deployment environment." }); return; }
    setState({ loading: true, sent: false, error: "" });
    try {
      const response = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ ...form, submitted: new Date().toISOString(), source: "THEXIAS_PLACE waitlist" }) });
      const result = await response.json();
      if (!response.ok || result.ok === false) throw new Error(result.message || "We could not save your request.");
      setState({ loading: false, sent: true, error: "" });
      onSubmitted?.(form);
    } catch (error) { setState({ loading: false, sent: false, error: error.message || "We could not save your request. Please try again." }); }
  };
  if (state.sent) return <div className="waitlist-success"><div>✓</div><h3>You’re on the private list.</h3><p>We’ll keep your request close and let you know first when your piece is ready.</p></div>;
  return <form className="custom-waitlist-form" onSubmit={submit}>
    <label>Name<input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" /></label>
    <label>WhatsApp number or email<input required value={form.contact} onChange={(e) => update("contact", e.target.value)} placeholder="How should we reach you?" /></label>
    <fieldset><legend>What are you watching for?</legend><div className="waitlist-options">{interestOptions.map((item) => <button type="button" className={form.interests.includes(item) ? "selected" : ""} onClick={() => toggleInterest(item)} key={item}>{item}</button>)}</div></fieldset>
    <label>Exact item name<input required value={form.item} onChange={(e) => update("item", e.target.value)} placeholder="The specific item you want" /></label>
    <div className="waitlist-inline-fields"><label>Preferred size<input value={form.size} onChange={(e) => update("size", e.target.value)} placeholder="S, 38..." /></label><label>Colour<input value={form.colour} onChange={(e) => update("colour", e.target.value)} placeholder="Black, oat..." /></label></div>
    <label>Additional notes<textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Anything else we should know?" /></label>
    {state.error && <p className="waitlist-error" role="alert">{state.error}</p>}
    <button className="cta" type="submit" disabled={state.loading}>{state.loading ? "Saving your request…" : "Join the private list"} <ArrowRight size={16} /></button>
    <small className="waitlist-note">Your request is saved privately for THEXIAS_PLACE. It is not sent through WhatsApp.</small>
  </form>;
}

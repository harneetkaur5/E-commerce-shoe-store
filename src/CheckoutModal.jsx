
import { useState, useEffect } from "react";
import { placeOrder } from "./api";
 
const EMPTY = { name: "", email: "", address: "", card: "", cvv: "" };
 
export default function CheckoutModal({ open, cart, total, onClose, onPlace }) {
  const [form, setForm] = useState(EMPTY);
  const [orderNum, setOrderNum] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  // Reset everything when the modal closes
  useEffect(() => {
    if (!open) { setForm(EMPTY); setOrderNum(null); setError(""); setLoading(false); }
  }, [open]);
 
  if (!open) return null;
 
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
 
  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      // Card details are NOT sent to the server (see note in the guide).
      const result = await placeOrder({
        name: form.name,
        email: form.email,
        address: form.address,
        items: cart.map(i => ({ id: i.id, size: i.size, qty: i.qty })),
      });
      setOrderNum(result.orderNumber);
      onPlace(); // clears the cart
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
 
  const inp = { width:"100%", background:"#1a1a1a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, padding:"11px 13px", color:"#f0f0f0", fontSize:14, outline:"none", fontFamily:"inherit" };
  const lbl = { display:"block", fontSize:10, letterSpacing:2, textTransform:"uppercase", fontWeight:700, color:"#555", marginBottom:5 };
 
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.9)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#141414", border:"1px solid rgba(255,255,255,.08)", borderRadius:16, width:"100%", maxWidth:480, padding:36 }}>
        {orderNum ? (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:60, marginBottom:16 }}>🎉</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:"#E8FF00", marginBottom:10 }}>ORDER PLACED!</div>
            <p style={{ color:"#555", fontSize:14, lineHeight:1.6, marginBottom:20 }}>Your fresh kicks are on their way. You'll receive a confirmation email shortly.</p>
            <div style={{ background:"#1a1a1a", borderRadius:8, padding:14, fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#f0f0f0", marginBottom:22 }}>Order #{orderNum}</div>
            <button onClick={onClose} style={{ width:"100%", background:"#E8FF00", color:"#000", border:"none", borderRadius:4, padding:14, fontWeight:700, fontSize:14, letterSpacing:1, textTransform:"uppercase", cursor:"pointer" }}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:38, color:"#f0f0f0", marginBottom:22 }}>Checkout</div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Full Name</label><input style={inp} placeholder="John Doe" value={form.name} onChange={set("name")} /></div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Email</label><input style={inp} placeholder="john@example.com" type="email" value={form.email} onChange={set("email")} /></div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Address</label><input style={inp} placeholder="123 Street, City" value={form.address} onChange={set("address")} /></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
              <div><label style={lbl}>Card Number</label><input style={inp} placeholder="4242 4242 4242 4242" value={form.card} onChange={set("card")} /></div>
              <div><label style={lbl}>CVV</label><input style={inp} placeholder="123" value={form.cvv} onChange={set("cvv")} /></div>
            </div>
 
            {error && <div style={{ color:"#FF3D3D", fontSize:13, marginTop:6 }}>{error}</div>}
 
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:14, background:"#1a1a1a", borderRadius:8, margin:"20px 0" }}>
              <span style={{ color:"#555", fontSize:13 }}>Order Total</span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:"#E8FF00" }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={submit} disabled={loading} style={{ flex:1, background:"#E8FF00", color:"#000", border:"none", borderRadius:4, padding:15, fontWeight:800, fontSize:15, letterSpacing:1, textTransform:"uppercase", cursor: loading ? "wait" : "pointer", opacity: loading ? .6 : 1 }}>
                {loading ? "Placing…" : "Place Order"}
              </button>
              <button onClick={onClose} style={{ background:"#1a1a1a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, width:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"#555", cursor:"pointer" }}>✕</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
 


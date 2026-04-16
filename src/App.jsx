import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const SHOES = [
  { id:1,  name:"Air Max Pulse",        cat:"Running",    price:149, old:189, color:"Volt / Black",           hex:"#C8F000", badge:"NEW",     rating:4.8, reviews:2341, sizes:[7,7.5,8,8.5,9,9.5,10,10.5,11,12],          desc:"Designed for the streets, built for the track. The Air Max Pulse delivers responsive cushioning with an aggressive silhouette that turns heads.",                                                                                  tags:["Bestseller","Breathable"],       imgs:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80","https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"] },
  { id:2,  name:"Jordan 1 Retro High",  cat:"Basketball", price:219, old:219, color:"Chicago Red / White",     hex:"#CE1141", badge:"ICONIC",  rating:4.9, reviews:5823, sizes:[7,7.5,8,8.5,9,9.5,10,10.5,11,12,13],       desc:"The shoe that started it all. The Jordan 1 Retro High Chicago is the definitive sneaker — bold, rebellious, and unmistakably legendary.",                                                                                          tags:["Legend","Limited"],              imgs:["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80","https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"] },
  { id:3,  name:"Nike Pegasus 41",      cat:"Running",    price:129, old:129, color:"Ocean Blue / Silver",     hex:"#1E6FB5", badge:null,      rating:4.7, reviews:3102, sizes:[6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12],    desc:"The everyday workhorse. The Pegasus 41 features React foam cushioning and a wider forefoot for a more natural, powerful stride.",                                                                                                   tags:["Daily Trainer","Cushioned"],     imgs:["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80"] },
  { id:4,  name:"Air Force 1 '07",      cat:"Lifestyle",  price:109, old:109, color:"Triple White",            hex:"#EEEEEE", badge:"CLASSIC", rating:4.9, reviews:9811, sizes:[6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12,13], desc:"40 years of clean. The Air Force 1 is a cultural cornerstone — timeless silhouette, legendary Air cushioning, clean forever.",                                                                                             tags:["Timeless","All-day"],            imgs:["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80","https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80","https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80"] },
  { id:5,  name:"Zoom Vomero 5",        cat:"Running",    price:159, old:199, color:"Earth / Moss Green",      hex:"#6B7C3D", badge:"SALE",    rating:4.6, reviews:1204, sizes:[7,7.5,8,8.5,9,9.5,10,10.5,11],              desc:"Chunky runner energy meets 2000s nostalgia. The Vomero 5 is back and better — technical construction for the fashion-forward athlete.",                                                                                            tags:["Retro","Trending"],              imgs:["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80","https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"] },
  { id:6,  name:"Dunk Low Panda",       cat:"Lifestyle",  price:109, old:109, color:"Black / White",           hex:"#111111", badge:"HOT",     rating:4.8, reviews:7432, sizes:[6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12,13], desc:"The most-hyped Dunk ever. Panda colorway dominates the game — simple, clean, and impossible to find at retail.",                                                                                                         tags:["Hype","Streetwear"],             imgs:["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80","https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80","https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80"] },
  { id:7,  name:"New Balance 990v6",    cat:"Running",    price:185, old:185, color:"Grey / Silver",           hex:"#9B9B9B", badge:"NEW",     rating:4.8, reviews:1876, sizes:[7,7.5,8,8.5,9,9.5,10,10.5,11,12,13],       desc:"Made in USA. The 990v6 is the pinnacle of New Balance engineering — premium suede and mesh upper with ENCAP midsole technology for all-day comfort.",                                                                              tags:["Made in USA","Premium"],         imgs:["https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80"] },
  { id:8,  name:"Adidas Ultraboost 24", cat:"Running",    price:189, old:220, color:"Core Black / White",      hex:"#1A1A1A", badge:"SALE",    rating:4.7, reviews:3421, sizes:[6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12],      desc:"Powered by Boost technology, the Ultraboost 24 returns energy with every step. The Primeknit upper wraps your foot like a second skin.",                                                                                          tags:["Energy Return","Knit"],          imgs:["https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80","https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"] },
  { id:9,  name:"Converse Chuck 70",    cat:"Lifestyle",  price:95,  old:95,  color:"Vintage Canvas / Egret",  hex:"#F5F0E8", badge:"CLASSIC", rating:4.6, reviews:6104, sizes:[5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12,13], desc:"The Chuck 70 takes the iconic silhouette to the next level with premium canvas, a higher rubber foxing tape, and a cushioned footbed. Timeless by design.",                                                    tags:["Iconic","Unisex"],               imgs:["https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&q=80","https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80","https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80"] },
  { id:10, name:"Yeezy Boost 350 V2",   cat:"Lifestyle",  price:229, old:229, color:"Zebra White / Black",     hex:"#E8E8E8", badge:"LIMITED", rating:4.9, reviews:8903, sizes:[7,7.5,8,8.5,9,9.5,10,10.5,11,12],          desc:"The 350 V2 Zebra remains one of the most coveted sneakers ever made — Primeknit upper, full-length Boost, unmistakable design.",                                                                                                    tags:["Limited","Hype"],                imgs:["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80"] },
  { id:11, name:"Asics Gel-Kayano 31",  cat:"Running",    price:159, old:159, color:"Deep Ocean / Teal",       hex:"#006699", badge:null,      rating:4.7, reviews:2214, sizes:[6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12],    desc:"Built for long-distance runners who need maximum stability. The Gel-Kayano 31 combines FF BLAST+ cushioning with a supportive frame for mile after mile.",                                                                       tags:["Stability","Long Distance"],     imgs:["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80","https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80"] },
  { id:12, name:"Puma Suede Classic",   cat:"Lifestyle",  price:79,  old:99,  color:"Burnt Red / White",       hex:"#C0392B", badge:"SALE",    rating:4.5, reviews:1589, sizes:[6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12],    desc:"A street legend since 1968. The Puma Suede Classic XXI honors the shoe that defined sneaker culture — rich suede upper, formstrip logo, clean and forever fresh.",                                                               tags:["Street Classic","Suede"],        imgs:["https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80","https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&q=80","https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"] },
];

const CATS = ["All", "Running", "Basketball", "Lifestyle"];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div style={{ display:"flex", gap:2, alignItems:"center" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i <= Math.round(rating) ? "#F5C518" : "#2a2a2a"}>
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.5,11 6,9 2.5,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
      <span style={{ fontSize:11, color:"#666", marginLeft:4 }}>{rating}</span>
    </div>
  );
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  return (
    <div style={{
      position:"fixed", bottom:28, left:"50%",
      transform:`translateX(-50%) translateY(${toast ? 0 : 80}px)`,
      transition:"transform .35s ease",
      background:"#141414", border:"1px solid rgba(255,255,255,.1)",
      borderRadius:8, padding:"12px 22px", fontSize:13, fontWeight:500,
      zIndex:9999, boxShadow:"0 8px 30px rgba(0,0,0,.6)", whiteSpace:"nowrap",
      display:"flex", alignItems:"center", gap:8, color:"#f0f0f0",
    }}>
      {toast && (
        <>
          <span style={{ color: toast.type === "ok" ? "#E8FF00" : "#FF3D3D", fontWeight:800 }}>
            {toast.type === "ok" ? "✓" : "!"}
          </span>
          {toast.msg}
        </>
      )}
    </div>
  );
}

// ─── SHOE CARD ───────────────────────────────────────────────────────────────
function ShoeCard({ shoe, onOpen, onWish, wished }) {
  const [hovered, setHovered] = useState(false);
  const badgeColor = shoe.badge === "SALE" ? { bg:"#FF3D3D", color:"#fff" }
                   : shoe.badge === "LIMITED" ? { bg:"#9333ea", color:"#fff" }
                   : { bg:"#E8FF00", color:"#000" };
  return (
    <div
      onClick={() => onOpen(shoe)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#141414", border:`1px solid ${hovered ? "rgba(232,255,0,.25)" : "rgba(255,255,255,.08)"}`,
        borderRadius:12, overflow:"hidden", cursor:"pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,.6)" : "none",
        transition:"all .3s",
      }}
    >
      {/* Image */}
      <div style={{ position:"relative", height:230, overflow:"hidden", background:"#1a1a1a" }}>
        <img
          src={shoe.imgs[0]} alt={shoe.name} loading="lazy"
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .4s", transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        {shoe.badge && (
          <div style={{ position:"absolute", top:12, left:12, background:badgeColor.bg, color:badgeColor.color, fontSize:10, fontWeight:800, letterSpacing:1, padding:"3px 9px", borderRadius:3 }}>
            {shoe.badge}
          </div>
        )}
        <button
          onClick={e => { e.stopPropagation(); onWish(shoe.id); }}
          style={{
            position:"absolute", top:12, right:12, background:"rgba(0,0,0,.6)",
            border:`1px solid ${wished ? "#FF3D3D" : "rgba(255,255,255,.1)"}`,
            borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center",
            justifyContent:"center", cursor:"pointer", fontSize:15, transition:"all .2s",
          }}
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding:16 }}>
        <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#555", marginBottom:3 }}>{shoe.cat}</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, marginBottom:4, color:"#f0f0f0" }}>{shoe.name}</div>
        <div style={{ fontSize:12, color:"#555", display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:shoe.hex, border:"1px solid rgba(255,255,255,.2)", flexShrink:0 }} />
          {shoe.color}
        </div>
        <Stars rating={shoe.rating} />
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", margin:"10px 0 12px" }}>
          {shoe.tags.map(t => (
            <span key={t} style={{ fontSize:10, letterSpacing:1, textTransform:"uppercase", fontWeight:600, padding:"2px 8px", borderRadius:20, background:"rgba(255,255,255,.04)", color:"#555", border:"1px solid rgba(255,255,255,.08)" }}>{t}</span>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:"#f0f0f0" }}>
            ${shoe.price}
            {shoe.old > shoe.price && <span style={{ fontSize:13, color:"#555", textDecoration:"line-through", marginLeft:6 }}>${shoe.old}</span>}
          </div>
          <button
            onClick={e => { e.stopPropagation(); onOpen(shoe); }}
            style={{
              background: hovered ? "#E8FF00" : "#1a1a1a",
              border:`1px solid ${hovered ? "#E8FF00" : "rgba(255,255,255,.08)"}`,
              borderRadius:4, padding:"8px 14px", color: hovered ? "#000" : "#f0f0f0",
              fontSize:12, fontWeight:600, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", transition:"all .2s",
            }}
          >
            Select Size
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────
function ProductModal({ shoe, onClose, onAddToCart }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(null);

  useEffect(() => { setImgIdx(0); setSize(null); }, [shoe]);
  useEffect(() => {
    const esc = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!shoe) return null;

  return (
    <div
      onClick={onClose}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.85)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(8px)" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background:"#141414", border:"1px solid rgba(255,255,255,.08)", borderRadius:16, width:"100%", maxWidth:820, maxHeight:"88vh", overflowY:"auto", display:"grid", gridTemplateColumns:"1fr 1fr" }}
      >
        {/* Images */}
        <div style={{ padding:24, background:"#0f0f0f", borderRadius:"16px 0 0 16px" }}>
          <img src={shoe.imgs[imgIdx]} alt={shoe.name} style={{ width:"100%", aspectRatio:1, objectFit:"cover", borderRadius:8, marginBottom:10 }} />
          <div style={{ display:"flex", gap:8 }}>
            {shoe.imgs.map((img, i) => (
              <img key={i} src={img} alt="" onClick={() => setImgIdx(i)}
                style={{ width:58, height:58, objectFit:"cover", borderRadius:6, cursor:"pointer", border:`2px solid ${imgIdx===i ? "#E8FF00" : "transparent"}`, transition:"border-color .2s", flexShrink:0 }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding:30 }}>
          <div style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"#E8FF00", marginBottom:6 }}>{shoe.cat}</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:44, lineHeight:1, marginBottom:6, color:"#f0f0f0" }}>{shoe.name}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, color:"#555", fontSize:13, marginBottom:14 }}>
            <div style={{ width:12, height:12, borderRadius:"50%", background:shoe.hex, border:"1px solid rgba(255,255,255,.2)", flexShrink:0 }} />
            {shoe.color}
          </div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:38, color:"#f0f0f0", marginBottom:4 }}>
            ${shoe.price}
            {shoe.old > shoe.price && <s style={{ fontSize:22, color:"#555", marginLeft:8 }}>${shoe.old}</s>}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#555", marginBottom:18 }}>
            <Stars rating={shoe.rating} />
            <span>· {shoe.reviews.toLocaleString()} reviews</span>
          </div>
          <p style={{ color:"#555", fontSize:14, lineHeight:1.7, marginBottom:22 }}>{shoe.desc}</p>

          <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", fontWeight:600, marginBottom:10, color:"#f0f0f0" }}>Select Size (US)</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:22 }}>
            {shoe.sizes.map(sz => (
              <button key={sz} onClick={() => setSize(sz)}
                style={{
                  width:46, height:38, background: size===sz ? "#E8FF00" : "#1a1a1a",
                  border:`1px solid ${size===sz ? "#E8FF00" : "rgba(255,255,255,.08)"}`,
                  borderRadius:4, color: size===sz ? "#000" : "#f0f0f0",
                  fontSize:13, fontWeight: size===sz ? 700 : 500, cursor:"pointer", transition:"all .2s",
                }}
              >{sz}</button>
            ))}
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button
              onClick={() => onAddToCart(shoe, size)}
              style={{ flex:1, background:"#E8FF00", color:"#000", border:"none", borderRadius:4, padding:15, fontWeight:800, fontSize:15, letterSpacing:1, textTransform:"uppercase", cursor:"pointer" }}
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              style={{ background:"#1a1a1a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, width:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, cursor:"pointer", color:"#555" }}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CART DRAWER ─────────────────────────────────────────────────────────────
function CartDrawer({ open, cart, onClose, onRemove, onQty, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.6)", zIndex:80, backdropFilter:"blur(4px)" }} />}
      <div style={{
        position:"fixed", top:0, right:0, bottom:0, width:400, zIndex:90,
        background:"#141414", borderLeft:"1px solid rgba(255,255,255,.08)",
        display:"flex", flexDirection:"column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition:"transform .35s cubic-bezier(.4,0,.2,1)",
      }}>
        {/* Header */}
        <div style={{ padding:"22px 24px", borderBottom:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#f0f0f0" }}>
            Your Cart {cart.length > 0 && `(${cart.reduce((s,i)=>s+i.qty,0)})`}
          </div>
          <button onClick={onClose} style={{ background:"#1a1a1a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, color:"#555" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:"auto", padding:"14px 20px", display:"flex", flexDirection:"column", gap:12 }}>
          {cart.length === 0 ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:12, color:"#555" }}>
              <div style={{ fontSize:48 }}>👟</div>
              <div>Your cart is empty</div>
            </div>
          ) : cart.map(item => (
            <div key={item.key} style={{ display:"flex", gap:12, background:"#1a1a1a", border:"1px solid rgba(255,255,255,.08)", borderRadius:8, padding:12 }}>
              <img src={item.imgs[0]} alt={item.name} style={{ width:68, height:68, objectFit:"cover", borderRadius:6, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:17, color:"#f0f0f0", marginBottom:2 }}>{item.name}</div>
                <div style={{ fontSize:11, color:"#555", marginBottom:8 }}>US {item.size} · {item.color}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <button onClick={() => onQty(item.key, -1)} style={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, width:26, height:26, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:15, color:"#f0f0f0" }}>−</button>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, minWidth:20, textAlign:"center", color:"#f0f0f0" }}>{item.qty}</span>
                  <button onClick={() => onQty(item.key, 1)} style={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, width:26, height:26, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:15, color:"#f0f0f0" }}>+</button>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, color:"#E8FF00" }}>${(item.price * item.qty).toFixed(0)}</span>
                  <button onClick={() => onRemove(item.key)} style={{ background:"none", border:"none", color:"#444", fontSize:11, cursor:"pointer", marginLeft:"auto" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding:"18px 20px", borderTop:"1px solid rgba(255,255,255,.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <span style={{ color:"#555", fontSize:13 }}>Total</span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, color:"#E8FF00" }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ fontSize:11, color:"#444", marginBottom:14 }}>Free shipping on orders over $150 · Easy returns</div>
            <button onClick={onCheckout} style={{ width:"100%", background:"#E8FF00", color:"#000", border:"none", borderRadius:4, padding:15, fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2, cursor:"pointer" }}>
              Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── CHECKOUT MODAL ──────────────────────────────────────────────────────────
function CheckoutModal({ open, total, onClose, onPlace }) {
  const [placed, setPlaced] = useState(false);
  const [orderNum] = useState(() => "SOLE-" + (Math.floor(Math.random() * 90000) + 10000));

  useEffect(() => { if (!open) setPlaced(false); }, [open]);

  if (!open) return null;

  const inp = { width:"100%", background:"#1a1a1a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, padding:"11px 13px", color:"#f0f0f0", fontSize:14, outline:"none", fontFamily:"inherit" };
  const lbl = { display:"block", fontSize:10, letterSpacing:2, textTransform:"uppercase", fontWeight:700, color:"#555", marginBottom:5 };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.9)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#141414", border:"1px solid rgba(255,255,255,.08)", borderRadius:16, width:"100%", maxWidth:480, padding:36 }}>
        {placed ? (
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
            <div style={{ marginBottom:14 }}><label style={lbl}>Full Name</label><input style={inp} placeholder="John Doe" /></div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Email</label><input style={inp} placeholder="john@example.com" type="email" /></div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Address</label><input style={inp} placeholder="123 Street, City" /></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
              <div><label style={lbl}>Card Number</label><input style={inp} placeholder="4242 4242 4242 4242" /></div>
              <div><label style={lbl}>CVV</label><input style={inp} placeholder="123" /></div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:14, background:"#1a1a1a", borderRadius:8, margin:"20px 0" }}>
              <span style={{ color:"#555", fontSize:13 }}>Order Total</span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:"#E8FF00" }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => { setPlaced(true); onPlace(); }} style={{ flex:1, background:"#E8FF00", color:"#000", border:"none", borderRadius:4, padding:15, fontWeight:800, fontSize:15, letterSpacing:1, textTransform:"uppercase", cursor:"pointer" }}>Place Order</button>
              <button onClick={onClose} style={{ background:"#1a1a1a", border:"1px solid rgba(255,255,255,.08)", borderRadius:4, width:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"#555", cursor:"pointer" }}>✕</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeShoe, setActiveShoe] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  // Lock scroll when modal/cart is open
  useEffect(() => {
    document.body.style.overflow = (activeShoe || cartOpen || checkoutOpen) ? "hidden" : "";
  }, [activeShoe, cartOpen, checkoutOpen]);

  // Toast
  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2500);
  };

  // Cart helpers
  const addToCart = (shoe, size) => {
    if (!size) { showToast("Please select a size", "err"); return; }
    const key = `${shoe.id}-${size}`;
    setCart(prev => {
      const ex = prev.find(i => i.key === key);
      return ex ? prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
                : [...prev, { ...shoe, size, qty: 1, key }];
    });
    showToast(`${shoe.name} (US ${size}) added to cart!`);
    setActiveShoe(null);
  };
  const removeFromCart = key => setCart(prev => prev.filter(i => i.key !== key));
  const changeQty = (key, d) => setCart(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const toggleWish = id => setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);

  // Filtered + sorted shoes
  const shown = SHOES
    .filter(s => (filter === "All" || s.cat === filter) && (s.name.toLowerCase().includes(search.toLowerCase()) || s.cat.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0);

  // Inline styles helpers
  const S = {
    accent: "#E8FF00",
    bg: "#0a0a0a",
    card: "#141414",
    border: "rgba(255,255,255,.08)",
    text: "#f0f0f0",
    muted: "#555",
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; font-family: 'Inter', sans-serif; color: #f0f0f0; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #E8FF00; border-radius: 2px; }
        input { font-family: 'Inter', sans-serif; }
        button { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 5%", height:62, background:"rgba(10,10,10,.95)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${S.border}` }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, letterSpacing:2, color:S.text }}>
          SOLE<span style={{ color:S.accent }}>.</span>
        </div>
        <ul style={{ display:"flex", gap:28, listStyle:"none" }}>
          {["Home","Shop","Running","Lifestyle"].map(l => (
            <li key={l}><a href="#shop" style={{ color:S.muted, textDecoration:"none", fontSize:13, fontWeight:500, letterSpacing:1, textTransform:"uppercase" }}>{l}</a></li>
          ))}
        </ul>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:S.card, border:`1px solid ${S.border}`, borderRadius:20, padding:"6px 14px" }}>
            <svg width="14" height="14" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search shoes…" style={{ background:"none", border:"none", outline:"none", color:S.text, fontSize:13, width:130 }} />
          </div>
          <button onClick={() => setCartOpen(true)} style={{ display:"flex", alignItems:"center", gap:6, background:S.accent, color:"#000", border:"none", borderRadius:20, padding:"8px 18px", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:1, cursor:"pointer" }}>
            <svg width="15" height="15" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Cart
            {cartCount > 0 && <span style={{ background:"#000", color:S.accent, borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800 }}>{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* ── BANNER ── */}
      <div style={{ marginTop:62, background:S.accent, color:"#000", textAlign:"center", padding:9, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase" }}>
        ⚡ Free shipping on orders over $150 — Use code: JUSTDOIT
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight:"92vh", display:"flex", alignItems:"center", padding:"60px 5%", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 70% at 72% 50%, rgba(232,255,0,.06) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:560 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(232,255,0,.1)", border:"1px solid rgba(232,255,0,.3)", borderRadius:20, padding:"4px 14px", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:S.accent, marginBottom:22 }}>
            <span style={{ width:6, height:6, background:S.accent, borderRadius:"50%", display:"inline-block" }} />
            New Collection 2025
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,12vw,140px)", lineHeight:.9, letterSpacing:-2, marginBottom:22 }}>
            JUST<br /><span style={{ color:S.accent }}>DO IT.</span>
          </h1>
          <p style={{ color:S.muted, fontSize:15, lineHeight:1.7, marginBottom:36 }}>Premium performance footwear for athletes, rebels, and everyone in between. Shop the latest drops.</p>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={() => document.getElementById("shop").scrollIntoView({ behavior:"smooth" })} style={{ background:S.accent, color:"#000", border:"none", borderRadius:4, padding:"14px 30px", fontWeight:700, fontSize:14, letterSpacing:1, textTransform:"uppercase", cursor:"pointer" }}>Shop Now</button>
            <button onClick={() => document.getElementById("shop").scrollIntoView({ behavior:"smooth" })} style={{ background:"transparent", color:S.text, border:`1px solid ${S.border}`, borderRadius:4, padding:"14px 30px", fontWeight:600, fontSize:14, letterSpacing:1, textTransform:"uppercase", cursor:"pointer" }}>View Collection</button>
          </div>
          <div style={{ display:"flex", gap:40, marginTop:56 }}>
            {[["200+","Models"],["50K+","Customers"],["4.9★","Avg Rating"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:38, color:S.accent }}>{n}</div>
                <div style={{ fontSize:11, color:S.muted, letterSpacing:1, textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:"52%", maxWidth:680, opacity:.85, pointerEvents:"none" }}>
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" alt="Hero" style={{ width:"100%", display:"block" }} />
        </div>
      </section>

      {/* ── SHOP ── */}
      <section style={{ padding:"80px 5%" }} id="shop">
        <div style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:S.accent, fontWeight:600, marginBottom:6 }}>Our Collection</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:54, letterSpacing:-1, marginBottom:32 }}>FRESH KICKS</h2>

        {/* Filters */}
        <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:28 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ background: filter===c ? S.accent : S.card, border:`1px solid ${filter===c ? S.accent : S.border}`, borderRadius:20, padding:"7px 18px", fontSize:13, fontWeight: filter===c ? 700 : 500, color: filter===c ? "#000" : S.muted, cursor:"pointer", transition:"all .2s" }}
            >{c}</button>
          ))}
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ marginLeft:"auto", background:S.card, border:`1px solid ${S.border}`, borderRadius:4, padding:"8px 12px", color:S.text, fontSize:13, cursor:"pointer" }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:20 }}>
          {shown.map(shoe => (
            <ShoeCard key={shoe.id} shoe={shoe} onOpen={setActiveShoe} onWish={toggleWish} wished={wishlist.includes(shoe.id)} />
          ))}
        </div>
        {shown.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:S.muted }}>No shoes found for "{search}"</div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:S.card, borderTop:`1px solid ${S.border}`, padding:"56px 5%", display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr 1fr", gap:40, marginTop:80 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, marginBottom:10 }}>SOLE<span style={{ color:S.accent }}>.</span></div>
          <p style={{ color:S.muted, fontSize:13, lineHeight:1.6 }}>Engineered for performance. Designed for culture. Built to last.</p>
        </div>
        {[["Shop",["New Arrivals","Running","Basketball","Sale"]],["Help",["Size Guide","Returns","Shipping","Contact"]],["Company",["About","Careers","Press","Sustainability"]]].map(([title, links]) => (
          <div key={title}>
            <h4 style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:S.muted, fontWeight:700, marginBottom:14 }}>{title}</h4>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:9 }}>
              {links.map(l => <li key={l}><a href="#" style={{ color:S.muted, textDecoration:"none", fontSize:13 }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </footer>
      <div style={{ borderTop:`1px solid ${S.border}`, padding:"18px 5%", display:"flex", justifyContent:"space-between", background:S.card }}>
        <span style={{ color:S.muted, fontSize:12 }}>© 2025 SOLE. All rights reserved.</span>
        <span style={{ color:S.muted, fontSize:12 }}>Made with ⚡ for sneakerheads</span>
      </div>

      {/* ── MODALS & OVERLAYS ── */}
      <ProductModal shoe={activeShoe} onClose={() => setActiveShoe(null)} onAddToCart={addToCart} />
      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQty={changeQty} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />
      <CheckoutModal open={checkoutOpen} total={cartTotal} onClose={() => setCheckoutOpen(false)} onPlace={() => setCart([])} />
      <Toast toast={toast} />
    </>
  );
}
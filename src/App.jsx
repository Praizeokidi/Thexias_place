import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
const groups = {
  Jeans: [
    ["High-Waist Skinny Jeans", 18500],
    ["Classic Mom Jeans", 20000],
    ["Distressed Straight-Leg Jeans", 22000],
    ["Flare Bootcut Denim", 19500],
    ["Baggy Wide-Leg Jeans", 21000],
    ["Ripped Boyfriend Jeans", 20500],
    ["Bell-Bottom Denim", 23000],
    ["Cargo Pocket Jeans", 24500],
    ["Light Wash Straight Jeans", 18000],
    ["Black Stretch Skinny Jeans", 19000],
  ],
  Bags: [
    ["Quilted Crossbody Bag", 15000],
    ["Structured Tote Bag", 17500],
    ["Mini Chain Shoulder Bag", 13000],
    ["Leather Clutch Purse", 12000],
    ["Woven Straw Beach Bag", 11500],
    ["Quilted Bucket Bag", 16000],
    ["Classic Flap Handbag", 18500],
    ["Mini Backpack Purse", 14000],
    ["Oversized Shopper Tote", 19000],
    ["Envelope Clutch Bag", 10500],
  ],
  Shoes: [
    ["Strappy Stiletto Heels", 16000],
    ["Chunky Platform Sneakers", 21000],
    ["Pointed-Toe Ankle Boots", 23500],
    ["Block Heel Sandals", 14500],
    ["Slip-On Mule Flats", 12000],
    ["Knee-High Suede Boots", 26000],
    ["Espadrille Wedge Sandals", 15500],
    ["Classic White Sneakers", 18000],
    ["Square-Toe Heeled Loafers", 19500],
    ["Strappy Gladiator Sandals", 13500],
  ],
  Tops: [
    ["Off-Shoulder Blouse", 9500],
    ["Ribbed Crop Top", 6000],
    ["Satin Cami Top", 8000],
    ["Puff-Sleeve Blouse", 10500],
    ["Basic V-Neck Tee", 5000],
    ["Cut-Out Bodysuit Top", 9000],
    ["Wrap-Front Blouse", 11000],
    ["Halter Neck Top", 7500],
    ["Oversized Graphic Tee", 6500],
    ["Lace Trim Cami", 8500],
  ],
  Gowns: [
    ["Satin Evening Gown", 45000],
    ["Floral Chiffon Maxi Dress", 32000],
    ["Bodycon Cocktail Gown", 38000],
    ["Off-Shoulder Ball Gown", 52000],
    ["Sequin Party Gown", 48000],
    ["Wrap Maxi Dress", 29500],
    ["Corset-Style Prom Gown", 44000],
    ["High-Slit Evening Dress", 41000],
    ["Lace Overlay Gown", 47500],
    ["Flowy Kaftan Maxi Gown", 30000],
  ],
};
const cats = ["All", ...Object.keys(groups)],
  products = Object.entries(groups).flatMap(([category, items]) =>
    items.map(([name, price], i) => ({
      id: category + i,
      name,
      price,
      category,
      image: `placeholder-${category.toLowerCase()}-${i + 1}`,
      sizes:
        category === "Shoes"
          ? ["36", "37", "38", "39", "40", "41"]
          : ["XS", "S", "M", "L", "XL"],
    })),
  ),
  money = (n) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n),
  tones = {
    Jeans: "#b7a89c,#3e4c52",
    Bags: "#cdbba4,#806653",
    Shoes: "#e2d0bf,#806a5b",
    Tops: "#e4d8c9,#a66c57",
    Gowns: "#cdb2ad,#694d4d",
    "Styled Outfit": "#d6c1af,#594139",
  };

const outfits = [
  { id: "outfit-golden-hour", name: "Golden Hour Glam", description: "Satin softness and warm accessories for evenings that linger beautifully.", items: ["Satin Evening Gown", "Strappy Stiletto Heels", "Quilted Crossbody Bag"], price: 72000 },
  { id: "outfit-street-chic", name: "Effortless Street Chic", description: "A relaxed denim foundation sharpened with polished everyday details.", items: ["Classic Mom Jeans", "Off-Shoulder Blouse", "Chunky Platform Sneakers", "Structured Tote Bag"], price: 57000 },
  { id: "outfit-boss-lady", name: "Boss Lady Edit", description: "Confident tailoring energy for the days when your presence says enough.", items: ["Black Stretch Skinny Jeans", "Puff-Sleeve Blouse", "Pointed-Toe Ankle Boots", "Leather Clutch Purse"], price: 70000 },
  { id: "outfit-weekend", name: "Weekend Brunch Look", description: "Light, easy and quietly feminine, made for long lunches and soft plans.", items: ["Light Wash Straight Jeans", "Satin Cami Top", "Block Heel Sandals", "Woven Straw Beach Bag"], price: 49000 },
  { id: "outfit-evening", name: "Evening Elegance", description: "A complete occasion look with graceful movement and a little drama.", items: ["Floral Chiffon Maxi Dress", "Square-Toe Heeled Loafers", "Classic Flap Handbag"], price: 82000 },
];

function findProduct(name) {
  return products.find((p) => p.name === name) || products[0];
}

function StyledOutfitsPage({ add, back }) {
  return <section className="service-page outfits-page">
    <div className="service-hero reveal is-visible"><small>THE STYLISTS’ EDIT</small><h1>Looks, already <em>lived in.</em></h1><p>Complete outfits assembled by our stylists, so getting dressed can feel as effortless as it looks.</p><button className="prelaunch-link" onClick={back}>Back to the collection <ArrowRight size={15} /></button></div>
    <div className="outfit-grid">{outfits.map((outfit, index) => <article className="outfit-card reveal is-visible" style={{ "--delay": `${index * 60}ms` }} key={outfit.id}>
      <div className="outfit-art"><span>LOOK {String(index + 1).padStart(2, "0")}</span><div>{outfit.items.slice(0, 3).map((name) => <Art p={findProduct(name)} key={name} />)}</div></div>
      <div className="outfit-copy"><small>CURATED OUTFIT</small><h2>{outfit.name}</h2><p>{outfit.description}</p><div className="outfit-items">{outfit.items.map((name) => <span key={name}>{name}</span>)}</div><div className="outfit-buy"><b>{money(outfit.price)}</b><button className="cta" onClick={() => add({ id: outfit.id, name: outfit.name, category: "Styled Outfit", price: outfit.price, sizes: ["One size", "One size"] })}>Add outfit to cart <ShoppingBag size={16} /></button></div></div>
    </article>)}</div>
  </section>;
}

function PersonalShopperPage({ back }) {
  const [form, setForm] = useState({ name: "", phone: "", request: "", budget: "" });
  const submit = (event) => { event.preventDefault(); const msg = `Hi THEXIAS_PLACE! I'm interested in personal shopping/sourcing:\nName: ${form.name}\nWhatsApp: ${form.phone}\nItem/Brand requested: ${form.request}\nBudget: ${form.budget || "Not specified"}\nPlease assist me in sourcing this.`; window.open(`https://wa.me/2347048969953?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer"); };
  return <section className="service-page shopper-page"><div className="service-hero reveal is-visible"><small>THE PRIVATE CONCIERGE</small><h1>Your personal <em>luxury</em> concierge.</h1><p>Tell us the designer piece you actually want. We source authentic, high-quality bags, shoes and clothing from Gucci, Prada and similar houses on request.</p><button className="prelaunch-link" onClick={back}>Back to the collection <ArrowRight size={15} /></button></div><div className="shopper-layout"><form className="shopper-form" onSubmit={submit}><small>MAKE A REQUEST</small><h2>Let’s find your next signature piece.</h2><label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label><label>WhatsApp number<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234 ..." /></label><label>Item or brand requested<textarea required value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} placeholder="Gucci shoulder bag in black leather..." /></label><label>Budget range <span>(optional)</span><select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}><option value="">Select a range</option><option>₦50,000 – ₦150,000</option><option>₦150,000 – ₦300,000</option><option>₦300,000 – ₦600,000</option><option>₦600,000+</option></select></label><button className="cta" type="submit">Send request via WhatsApp <ArrowRight size={16} /></button></form><div className="concierge-cards"><div><b>01</b><strong>Designer handbags</strong><p>Quiet icons and statement pieces sourced around your brief.</p></div><div><b>02</b><strong>Luxury sneakers</strong><p>Everyday pairs with the right balance of comfort and status.</p></div><div><b>03</b><strong>Statement accessories</strong><p>The finishing details that make an entire wardrobe feel yours.</p></div></div></div></section>;
}
function useReveal(key) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -35px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [key]);
}
function Logo() {
  return (
    <a className="logo" href="#top">
      <b>T</b>THEXIAS<span>_PLACE</span>
    </a>
  );
}
function Art({ p }) {
  return (
    <div className="art" style={{ "--tone": tones[p.category] }}>
      <small>{p.category}</small>
      <i>{p.id.slice(-1).padStart(2, "0")}</i>
    </div>
  );
}
function Card({ p, open, add, wishlisted, toggleWishlist, index }) {
  const [l, setL] = useState(wishlisted);
  useEffect(() => setL(wishlisted), [wishlisted]);
  return (
    <article
      className="card reveal"
      style={{ "--delay": `${Math.min(index, 7) * 55}ms` }}
    >
      <button className="pic" onClick={() => open(p)}>
        <Art p={p} />
        <span>
          Quick view <ArrowRight size={14} />
        </span>
      </button>
      <div className="card-top">
        <div>
          <small>{p.category}</small>
          <h3>{p.name}</h3>
        </div>
        <button
          onClick={() => {
            setL(!l);
            toggleWishlist(p.id);
          }}
          className={l ? "liked" : ""}
          title={l ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={17} fill={l ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="price">
        <b>{money(p.price)}</b>
        <button onClick={() => add(p)}>
          Add <Plus size={14} />
        </button>
      </div>
    </article>
  );
}
function Modal({ p, close, add }) {
  const [s, setS] = useState(p.sizes[1]);
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="modal">
        <button className="close" onClick={close}>
          <X />
        </button>
        <Art p={p} />
        <section>
          <small>{p.category} / new arrival</small>
          <h2>{p.name}</h2>
          <div className="rating">
            ★★★★<span> 4.8 (12 reviews)</span>
          </div>
          <strong className="modal-price">{money(p.price)}</strong>
          <p>
            A considered {p.category.toLowerCase()} essential with a quietly
            confident finish. Designed for repeat wears.
          </p>
          <hr />
          <b>
            Color <em>Oat</em>
          </b>
          <div className="swatches">
            <i />
            <i />
            <i />
          </div>
          <div className="size-head">
            <b>Size</b>
            <a>Size guide</a>
          </div>
          <div className="sizes">
            {p.sizes.map((x) => (
              <button
                className={s === x ? "chosen" : ""}
                onClick={() => setS(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <button
            className="cta"
            onClick={() => {
              add(p, s);
              close();
            }}
          >
            Add to bag <ShoppingBag size={17} />
          </button>
        </section>
      </div>
    </div>
  );
}
function Cart({ cart, close, qty, remove }) {
  let total = cart.reduce((a, x) => a + x.price * x.quantity, 0),
    msg = `Hi THEXIAS_PLACE! I'd like to order:\n\n${cart.map((x) => `- ${x.name} x${x.quantity} — ${money(x.price * x.quantity)}`).join("\n")}\n\nTotal: ${money(total)}`;
  return (
    <div
      className="overlay cart-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <aside className="cart">
        <header>
          <div>
            <small>Your selection</small>
            <h2>Shopping bag</h2>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </header>
        {!cart.length ? (
          <div className="empty">
            <ShoppingBag size={32} />
            <h3>Your bag is waiting.</h3>
            <p>Add something beautiful to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((x) => (
                <div className="cart-item" key={x.id}>
                  <Art p={x} />
                  <div>
                    <h3>{x.name}</h3>
                    <small>
                      {x.category} · {x.size}
                    </small>
                    <b>{money(x.price)}</b>
                    <div className="qty">
                      <button onClick={() => qty(x.id, -1)}>
                        <Minus size={13} />
                      </button>
                      {x.quantity}
                      <button onClick={() => qty(x.id, 1)}>
                        <Plus size={13} />
                      </button>
                      <button onClick={() => remove(x.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <footer>
              <div>
                <span>Subtotal</span>
                <b>{money(total)}</b>
              </div>
              <p>Complete your order securely in WhatsApp.</p>
              <a
                className="cta"
                href={`https://wa.me/2347048969953?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noreferrer"
              >
                Checkout via WhatsApp <ArrowRight size={17} />
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function WishlistDrawer({ items, close, remove, add }) {
  return (
    <div
      className="overlay cart-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <aside className="cart wishlist-drawer">
        <header>
          <div>
            <small>Your saved pieces</small>
            <h2>
              Wishlist <span>{items.length}</span>
            </h2>
          </div>
          <button onClick={close} aria-label="Close wishlist">
            <X />
          </button>
        </header>
        {!items.length ? (
          <div className="empty">
            <Heart size={32} />
            <h3>Save something beautiful.</h3>
            <p>Tap the heart on any piece and it will appear here.</p>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <Art p={item} />
                <div>
                  <h3>{item.name}</h3>
                  <small>{item.category}</small>
                  <b>{money(item.price)}</b>
                  <div className="qty">
                    <button className="wishlist-add" onClick={() => add(item)}>
                      Add to bag
                    </button>
                    <button onClick={() => remove(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

export default function App() {
  const [cat, setCat] = useState("All"),
    [q, setQ] = useState(""),
    [sort, setSort] = useState("featured"),
    [cart, setCart] = useState(() =>
      JSON.parse(localStorage.getItem("thexias-cart") || "[]"),
    ),
    [wishlist, setWishlist] = useState(() =>
      JSON.parse(localStorage.getItem("thexias-wishlist") || "[]"),
    ),
    [selected, setSelected] = useState(null),
    [page, setPage] = useState("home"),
    [cartOpen, setCartOpen] = useState(false),
    [wishlistOpen, setWishlistOpen] = useState(false),
    [showTop, setShowTop] = useState(false),
    [waitlistOpen, setWaitlistOpen] = useState(false),
    [waitlistSent, setWaitlistSent] = useState(false),
    [waitlistForm, setWaitlistForm] = useState({
      name: "",
      contact: "",
      interests: [],
    }),
    [cartBump, setCartBump] = useState(false),
    [toast, setToast] = useState("");
  useEffect(
    () => localStorage.setItem("thexias-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("thexias-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  );
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  let list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          p.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [cat, q],
  );
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  useReveal(`${cat}-${q}-${sort}`);
  const add = (p, size = p.sizes[1]) => {
    setCart((old) => {
      let x = old.find((i) => i.id === p.id && i.size === size);
      return x
        ? old.map((i) => (i === x ? { ...i, quantity: i.quantity + 1 } : i))
        : [...old, { ...p, size, quantity: 1 }];
    });
    setCartBump(true);
    setToast(`${p.name} added to your bag`);
    window.setTimeout(() => setCartBump(false), 650);
    window.setTimeout(() => setToast(""), 2800);
  };
  const toggleWishlist = (id) =>
    setWishlist((old) => {
      const saved = old.includes(id);
      setToast(saved ? "Removed from wishlist" : "Added to wishlist");
      window.setTimeout(() => setToast(""), 2200);
      return saved ? old.filter((x) => x !== id) : [...old, id];
    });
  const toggleWaitlistInterest = (category) =>
    setWaitlistForm((old) => ({
      ...old,
      interests: old.interests.includes(category)
        ? old.interests.filter((item) => item !== category)
        : [...old.interests, category],
    }));
  const submitWaitlist = (event) => {
    event.preventDefault();
    if (
      !waitlistForm.name.trim() ||
      !waitlistForm.contact.trim() ||
      !waitlistForm.interests.length
    )
      return;
    const existing = JSON.parse(
      localStorage.getItem("thexias-waitlist") || "[]",
    );
    localStorage.setItem(
      "thexias-waitlist",
      JSON.stringify([
        ...existing,
        { ...waitlistForm, createdAt: new Date().toISOString() },
      ]),
    );
    setWaitlistSent(true);
    setToast("You’re on the prelaunch list");
    window.setTimeout(() => setToast(""), 2800);
  };
  const preOrderMessage = `Hi THEXIAS_PLACE! I joined the prelaunch list and would like to pre-order from: ${waitlistForm.interests.join(", ")}. My name is ${waitlistForm.name}. Please notify me when payment and collection are available.`;
  const qty = (id, d) =>
    setCart((o) =>
      o.flatMap((x) =>
        x.id === id && x.quantity + d < 1
          ? []
          : x.id === id
            ? [{ ...x, quantity: x.quantity + d }]
            : [x],
      ),
    );
  return (
    <div id="top">
      <header>
        <div className="announcement">
          FREE DELIVERY over ₦50,000 · New pieces, twice a week
        </div>
        <nav>
          <Logo />
          <div className="links">
            {cats.slice(1).map((c) => (
              <a href="#shop" onClick={() => setCat(c)} key={c}>
                {c}
              </a>
            ))}
            <a href="#outfits" onClick={(e) => { e.preventDefault(); setPage("outfits"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Styled Outfits</a>
            <a href="#personal-shopper" onClick={(e) => { e.preventDefault(); setPage("shopper"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Personal Shopper</a>
          </div>
          <label>
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the edit"
            />
          </label>
          <button
            className="wishlist-button"
            onClick={() => setWishlistOpen(true)}
            aria-label="Open wishlist"
          >
            <Heart size={20} />
            <i>{wishlist.length}</i>
          </button>
          <button
            className={`bag ${cartBump ? "bump" : ""}`}
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping bag"
          >
            <ShoppingBag size={20} />
            <i>{cart.reduce((a, x) => a + x.quantity, 0)}</i>
          </button>
        </nav>
      </header>
      {page === "home" ? <main>
        <section className="hero reveal is-visible">
          <div>
            <small>✦ THE NEW SEASON EDIT</small>
            <h1>
              Made for <em>your</em> becoming.
            </h1>
            <p>Modern pieces, softly tailored for every version of you.</p>
            <button
              className="cta"
              onClick={() =>
                document
                  .getElementById("shop")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop new arrivals <ArrowRight size={17} />
            </button>
            <button
              className="prelaunch-link"
              onClick={() => {
                setWaitlistOpen(true);
                setWaitlistSent(false);
              }}
            >
              Join the prelaunch list <ArrowRight size={15} />
            </button>
          </div>
          <div className="hero-art">
            <b>
              the
              <br />
              new
              <br />
              <em>edit</em>
            </b>
            <span>
              Quiet confidence
              <br />
              since 2024
            </span>
          </div>
        </section>
        <section className="intro reveal">
          <small>EXPLORE THE EDIT</small>
          <h2>
            Find your <em>everyday</em> extraordinary.
          </h2>
          <div className="tiles">
            {Object.keys(groups).map((c, i) => (
              <button
                onClick={() => {
                  setCat(c);
                  document
                    .getElementById("shop")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                key={c}
              >
                <div className="tile" style={{ "--tone": tones[c] }}>
                  <b>0{i + 1}</b>
                </div>
                <strong>{c}</strong>
                <small>Thoughtfully chosen pieces</small>
              </button>
            ))}
          </div>
        </section>
        <section className="shop" id="shop">
          <div className="shop-head">
            <div>
              <small>THE COLLECTION</small>
              <h2>{cat === "All" ? "All the good things." : cat}</h2>
            </div>
            <div className="filters">
              {cats.map((c) => (
                <button
                  className={cat === c ? "on" : ""}
                  onClick={() => setCat(c)}
                  key={c}
                >
                  {c}
                </button>
              ))}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>
          <div className="grid">
            {list.map((p, index) => (
              <Card
                p={p}
                index={index}
                open={setSelected}
                add={add}
                wishlisted={wishlist.includes(p.id)}
                toggleWishlist={toggleWishlist}
                key={p.id}
              />
            ))}
          </div>
        </section>
        <section className="services">
          <div>
            <b>01</b>
            <strong>Easy ordering</strong>
            <p>Browse, choose, WhatsApp.</p>
          </div>
          <div>
            <b>02</b>
            <strong>Thoughtful delivery</strong>
            <p>Carefully packed to your door.</p>
          </div>
          <div>
            <b>03</b>
            <strong>Need a hand?</strong>
            <p>Our stylists are one message away.</p>
          </div>
        </section>
      </main> : page === "outfits" ? <StyledOutfitsPage add={add} back={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} /> : <PersonalShopperPage back={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />}
      <footer>
        <Logo />
        <p>An intentional wardrobe for the woman in motion.</p>
        <a href="https://wa.me/2347048969953">
          Chat with us on WhatsApp <ArrowRight size={15} />
        </a>
        <small>© 2024 THEXIAS_PLACE · Made for the becoming.</small>
      </footer>
      {toast && (
        <div className="toast" role="status">
          <span>✓</span>
          {toast}
        </div>
      )}
      {selected && (
        <Modal p={selected} close={() => setSelected(null)} add={add} />
      )}{" "}
      {cartOpen && (
        <Cart
          cart={cart}
          close={() => setCartOpen(false)}
          qty={qty}
          remove={(id) => setCart((o) => o.filter((x) => x.id !== id))}
        />
      )}
      {wishlistOpen && (
        <WishlistDrawer
          items={products.filter((p) => wishlist.includes(p.id))}
          close={() => setWishlistOpen(false)}
          remove={(id) => setWishlist((old) => old.filter((x) => x !== id))}
          add={add}
        />
      )}
      {showTop && (
        <button
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowRight size={16} />
        </button>
      )}
      {waitlistOpen && (
        <div
          className="overlay"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setWaitlistOpen(false)
          }
        >
          <div className="waitlist-modal">
            <button
              className="close"
              onClick={() => setWaitlistOpen(false)}
              aria-label="Close prelaunch waitlist"
            >
              <X />
            </button>
            <small>THE PRIVATE FIRST LOOK</small>
            <h2>Be first to wear what’s next.</h2>
            <p>
              Tell us exactly what you’re waiting for. Your response goes
              directly to the private THEXIAS_PLACE prelaunch form.
            </p>
            <iframe
              className="waitlist-form-frame"
              title="THEXIAS_PLACE prelaunch waitlist"
              src="https://docs.google.com/forms/d/e/1FAIpQLSeLpss384XiP8kGv3tv_4ueIRhe5uCdAV-0siA-k-bJnXDg8g/viewform?embedded=true"
            >
              Loading waitlist form…
            </iframe>
            <small className="waitlist-note">
              The form includes a dedicated box for the exact item name,
              preferred size, colour, or other details.
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

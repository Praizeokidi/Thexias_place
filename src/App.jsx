import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  ChevronDown,
  Heart,
  Minus,
  Palmtree,
  Plane,
  Plus,
  Search,
  ShoppingBag,
  Utensils,
  X,
} from "lucide-react";
import AdminDashboard from "./AdminDashboard.jsx";
const groups = {
  Denim: [
    ["High-Waist Skinny Denim", 18500],
    ["Classic Mom Denim", 20000],
    ["Distressed Straight-Leg Denim", 22000],
    ["Flare Bootcut Denim", 19500],
    ["Baggy Wide-Leg Denim", 21000],
    ["Ripped Boyfriend Denim", 20500],
    ["Bell-Bottom Denim", 23000],
    ["Cargo Pocket Denim", 24500],
    ["Light Wash Straight Denim", 18000],
    ["Black Stretch Skinny Denim", 19000],
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
  Lingerie: [
    ["Silk Lace Cami Set", 14000],
    ["Satin Robe & Slip Set", 18000],
    ["Soft Mesh Bralette Set", 12500],
    ["Lace Trim Bodysuit", 15000],
    ["Everyday Seamless Set", 11000],
  ],
};
groups.Denim.push(
  ["Pleated Denim Mini Skirt", 16500, "Skirts"],
  ["Asymmetric Denim Midi Skirt", 19500, "Skirts"],
  ["Relaxed Blue Denim Jorts", 15500, "Jorts"],
  ["Raw-Edge Bermuda Jorts", 17500, "Jorts"],
  ["Tailored Wide-Leg Denim Pants", 22500, "Pants"],
  ["High-Rise Utility Denim Pants", 23500, "Pants"],
);
groups.Shoes.push(
  ["Crystal Strap Heel Sandals", 18500, "Heel"],
  ["Sculptural Kitten Heel Pumps", 20500, "Heel"],
  ["Retro Court Sneakers", 17500, "Sneakers"],
  ["Minimal Leather Sneakers", 19000, "Sneakers"],
);
groups.Gowns.push(
  ["Curated Draped Silk Gown", 47000, "Curated"],
  ["Curated Velvet Column Gown", 49500, "Curated"],
  ["Casual Cotton Maxi Gown", 27000, "Casual"],
  ["Casual Tiered Day Gown", 28500, "Casual"],
  ["Dinner Satin Cowl Gown", 43000, "Dinner"],
  ["Dinner Embellished Gown", 51000, "Dinner"],
);
const subcategoryMap = {
  Denim: {
    "High-Waist Skinny Denim": "Pants",
    "Classic Mom Denim": "Pants",
    "Distressed Straight-Leg Denim": "Pants",
    "Flare Bootcut Denim": "Pants",
    "Baggy Wide-Leg Denim": "Pants",
    "Ripped Boyfriend Denim": "Pants",
    "Bell-Bottom Denim": "Pants",
    "Cargo Pocket Denim": "Pants",
    "Light Wash Straight Denim": "Pants",
    "Black Stretch Skinny Denim": "Pants",
  },
  Shoes: {
    "Strappy Stiletto Heels": "Heel",
    "Pointed-Toe Ankle Boots": "Heel",
    "Block Heel Sandals": "Heel",
    "Slip-On Mule Flats": "Heel",
    "Knee-High Suede Boots": "Heel",
    "Espadrille Wedge Sandals": "Heel",
    "Square-Toe Heeled Loafers": "Heel",
    "Strappy Gladiator Sandals": "Heel",
    "Chunky Platform Sneakers": "Sneakers",
    "Classic White Sneakers": "Sneakers",
  },
  Gowns: {
    "Satin Evening Gown": "Dinner",
    "Floral Chiffon Maxi Dress": "Casual",
    "Bodycon Cocktail Gown": "Dinner",
    "Off-Shoulder Ball Gown": "Curated",
    "Sequin Party Gown": "Dinner",
    "Wrap Maxi Dress": "Casual",
    "Corset-Style Prom Gown": "Curated",
    "High-Slit Evening Dress": "Dinner",
    "Lace Overlay Gown": "Curated",
    "Flowy Kaftan Maxi Gown": "Casual",
  },
};
const categoryOrder = ["Denim", "Shoes", "Tops", "Gowns", "Lingerie"],
  cats = ["All", ...categoryOrder],
  products = Object.entries(groups).flatMap(([category, items]) =>
    items.map(([name, price, subcategory], i) => ({
      id: category + i,
      name,
      price,
      category,
      subcategory: subcategory || subcategoryMap[category]?.[name] || "",
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
    Denim: "#b7a89c,#3e4c52",
    Shoes: "#e2d0bf,#806a5b",
    Tops: "#e4d8c9,#a66c57",
    Gowns: "#cdb2ad,#694d4d",
    Lingerie: "#d8c0c0,#805c66",
    "Styled Outfit": "#d6c1af,#594139",
  };

const outfits = [
  {
    id: "outfit-golden-hour",
    name: "Golden Hour Glam",
    description:
      "Satin softness and warm accessories for evenings that linger beautifully.",
    items: ["Satin Evening Gown", "Strappy Stiletto Heels"],
    price: 60000,
  },
  {
    id: "outfit-street-chic",
    name: "Effortless Street Chic",
    description:
      "A relaxed denim foundation sharpened with polished everyday details.",
    items: [
      "Classic Mom Denim",
      "Off-Shoulder Blouse",
      "Chunky Platform Sneakers",
    ],
    price: 43000,
  },
  {
    id: "outfit-boss-lady",
    name: "Boss Lady Edit",
    description:
      "Confident tailoring energy for the days when your presence says enough.",
    items: [
      "Black Stretch Skinny Denim",
      "Puff-Sleeve Blouse",
      "Pointed-Toe Ankle Boots",
    ],
    price: 58000,
  },
  {
    id: "outfit-weekend",
    name: "Weekend Brunch Look",
    description:
      "Light, easy and quietly feminine, made for long lunches and soft plans.",
    items: [
      "Light Wash Straight Denim",
      "Satin Cami Top",
      "Block Heel Sandals",
      "Woven Straw Beach Bag",
    ],
    price: 49000,
  },
  {
    id: "outfit-evening",
    name: "Evening Elegance",
    description:
      "A complete occasion look with graceful movement and a little drama.",
    items: ["Floral Chiffon Maxi Dress", "Square-Toe Heeled Loafers"],
    price: 65000,
  },
];

const categoryCardSizes =
  "(max-width: 850px) calc(50vw - 23px), (max-width: 1050px) calc((100vw - 74px) / 3), (max-width: 1240px) calc((100vw - 98px) / 5), 228px";
const servicesCardSizes =
  "(max-width: 850px) calc(100vw - 36px), (max-width: 1050px) calc((100vw - 74px) / 3), (max-width: 1240px) calc((100vw - 98px) / 5), 228px";
const homeEditCards = [
  {
    title: "THE EDIT",
    description: "Curated pieces for every occasion.",
    action: "EXPLORE THE EDIT",
    image: "/category-cards/the_edit",
    width: 1632,
    height: 2592,
    sizes: categoryCardSizes,
    destination: "shop",
  },
  {
    title: "STYLED OUTFITS",
    description: "Effortless looks, curated for you.",
    action: "SHOP THE LOOKS",
    image: "/category-cards/styled_outfits",
    width: 1600,
    height: 2656,
    sizes: categoryCardSizes,
    destination: "outfits",
  },
  {
    title: "PERSONAL SHOPPER",
    description: "Tell us what you need. We’ll find it for you.",
    action: "REQUEST A PRIVATE EDIT",
    image: "/category-cards/personal_shopper",
    width: 1632,
    height: 2592,
    sizes: categoryCardSizes,
    destination: "shopper",
  },
  {
    title: "THE TRAVEL EDIT",
    description: "Considered looks for wherever you’re going.",
    action: "EXPLORE",
    image: "/category-cards/the_travel_edit",
    width: 1504,
    height: 2848,
    sizes: categoryCardSizes,
    destination: "shop",
  },
  {
    title: "SERVICES",
    description: "Styling, sourcing and more.",
    action: "LEARN MORE",
    image: "/category-cards/services",
    width: 1504,
    height: 2848,
    sizes: servicesCardSizes,
    destination: "services",
  },
];
const travelEditOptions = [
  {
    title: "AIRPORT EDIT",
    description: "Elevated travel-day looks.",
    Icon: Plane,
  },
  {
    title: "RESORT EDIT",
    description: "Vacation and beachwear.",
    Icon: Palmtree,
  },
  {
    title: "DINNER EDIT",
    description: "Evenings and date-night looks.",
    Icon: Utensils,
  },
  {
    title: "CITY EDIT",
    description: "Sightseeing to day-to-night.",
    Icon: Building2,
  },
  {
    title: "COMPLETE WARDROBE",
    description: "A full itinerary-based wardrobe.",
    Icon: BriefcaseBusiness,
  },
];
const legacyDenimWords = [
  String.fromCharCode(74, 101, 97, 110, 115),
  String.fromCharCode(68, 101, 110, 105, 109, 115),
];
const migrateLegacyDenimName = (value) =>
  value
    .replace(new RegExp(`\\b${legacyDenimWords[0]}\\b`, "gi"), "Denim")
    .replace(new RegExp(`\\b${legacyDenimWords[1]}\\b`, "gi"), "Denim")
    .replace(new RegExp(`^${legacyDenimWords[1]}(?=\\d)`, "i"), "Denim");
const migrateStoredDenimLabels = (value) => {
  if (Array.isArray(value)) return value.map(migrateStoredDenimLabels);
  if (typeof value === "string") return migrateLegacyDenimName(value);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        migrateLegacyDenimName(key),
        migrateStoredDenimLabels(item),
      ]),
    );
  }
  return value;
};
const readStoredList = (key) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = JSON.parse(raw || "[]");
    const migrated = migrateStoredDenimLabels(parsed);
    if (raw && JSON.stringify(parsed) !== JSON.stringify(migrated)) {
      localStorage.setItem(key, JSON.stringify(migrated));
    }
    return Array.isArray(migrated) ? migrated : [];
  } catch {
    return [];
  }
};
function findProduct(name) {
  return products.find((p) => p.name === name) || products[0];
}

function StyledOutfitsPage({ add, back }) {
  return (
    <section className="service-page outfits-page">
      <div className="service-hero reveal is-visible">
        <small>THE STYLISTS’ EDIT</small>
        <h1>
          Looks, already <em>lived in.</em>
        </h1>
        <p>
          Complete outfits assembled by our stylists, so getting dressed can
          feel as effortless as it looks.
        </p>
        <button className="prelaunch-link" onClick={back}>
          Back to the collection <ArrowRight size={15} />
        </button>
      </div>
      <div className="outfit-grid">
        {outfits.map((outfit, index) => (
          <article
            className="outfit-card reveal is-visible"
            style={{ "--delay": `${index * 60}ms` }}
            key={outfit.id}
          >
            <div className="outfit-art">
              <span>LOOK {String(index + 1).padStart(2, "0")}</span>
              <div>
                {outfit.items.slice(0, 3).map((name) => (
                  <Art p={findProduct(name)} key={name} />
                ))}
              </div>
            </div>
            <div className="outfit-copy">
              <small>CURATED OUTFIT</small>
              <h2>{outfit.name}</h2>
              <p>{outfit.description}</p>
              <div className="outfit-items">
                {outfit.items.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <div className="outfit-buy">
                <b>{money(outfit.price)}</b>
                <button
                  className="cta"
                  onClick={() =>
                    add({
                      id: outfit.id,
                      name: outfit.name,
                      category: "Styled Outfit",
                      price: outfit.price,
                      sizes: ["One size", "One size"],
                    })
                  }
                >
                  Add outfit to cart <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PersonalShopperPage({ back }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    request: "",
    budget: "",
  });
  const submit = (event) => {
    event.preventDefault();
    const msg = `Hi THEXIAS PLACE! I'm interested in personal shopping/sourcing:\nName: ${form.name}\nWhatsApp: ${form.phone}\nItem/Brand requested: ${form.request}\nBudget: ${form.budget || "Not specified"}\nPlease assist me in sourcing this.`;
    window.open(
      `https://wa.me/2347048969953?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <section className="service-page shopper-page">
      <div className="luxury-showcase reveal is-visible">
        <small>THE LUXURY SHORTLIST</small>
        <div className="luxury-showcase-grid">
          {[
            "Designer Handbags",
            "Italian Leather Heels",
            "Signature Silk",
            "Luxury Sneakers",
          ].map((item, index) => (
            <div className="luxury-card" key={item}>
              <span>0{index + 1}</span>
              <b>{item}</b>
              <i>{index % 2 ? "THEXIAS" : "PRIVATE EDIT"}</i>
            </div>
          ))}
        </div>
      </div>
      <div className="service-hero reveal is-visible">
        <small>THE PRIVATE CONCIERGE</small>
        <h1>
          Your personal <em>luxury</em> concierge.
        </h1>
        <p>
          Tell us the designer piece you actually want. We source authentic,
          high-quality bags, shoes and clothing from Gucci, Prada and similar
          houses on request.
        </p>
        <button className="prelaunch-link" onClick={back}>
          Back to the collection <ArrowRight size={15} />
        </button>
      </div>
      <div className="shopper-layout">
        <form className="shopper-form" onSubmit={submit}>
          <small>MAKE A REQUEST</small>
          <h2>Let’s find your next signature piece.</h2>
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </label>
          <label>
            WhatsApp number
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+234 ..."
            />
          </label>
          <label>
            Item or brand requested
            <textarea
              required
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
              placeholder="Gucci shoulder bag in black leather..."
            />
          </label>
          <label>
            Budget range <span>(optional)</span>
            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            >
              <option value="">Select a range</option>
              <option>₦50,000 – ₦150,000</option>
              <option>₦150,000 – ₦300,000</option>
              <option>₦300,000 – ₦600,000</option>
              <option>₦600,000+</option>
            </select>
          </label>
          <button className="cta" type="submit">
            Send request via WhatsApp <ArrowRight size={16} />
          </button>
        </form>
        <div className="concierge-cards">
          <div>
            <b>01</b>
            <strong>Designer handbags</strong>
            <p>Quiet icons and statement pieces sourced around your brief.</p>
          </div>
          <div>
            <b>02</b>
            <strong>Luxury sneakers</strong>
            <p>Everyday pairs with the right balance of comfort and status.</p>
          </div>
          <div>
            <b>03</b>
            <strong>Statement accessories</strong>
            <p>
              The finishing details that make an entire wardrobe feel yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage({ back }) {
  return (
    <section className="service-page about-page">
      <div className="service-hero reveal is-visible">
        <small>THE HOUSE</small>
        <h1>
          Clothes for every version of <em>becoming.</em>
        </h1>
        <p>
          THEXIAS_PLACE is an intentional wardrobe for the woman in motion — a
          considered edit of pieces that meet your real life with ease,
          confidence and a little delight.
        </p>
        <button className="prelaunch-link" onClick={back}>
          Back to the collection <ArrowRight size={15} />
        </button>
      </div>
      <div className="about-story">
        <div>
          <b>01</b>
          <h2>Less, but more like you.</h2>
          <p>
            We believe style is not about filling a wardrobe. It is about
            finding the pieces that return your gaze in the mirror and feel
            unmistakably yours.
          </p>
        </div>
        <div>
          <b>02</b>
          <h2>Thoughtfully chosen.</h2>
          <p>
            From everyday denim to occasion dressing, every edit is shaped
            around softness, movement and the quiet confidence of getting
            dressed well.
          </p>
        </div>
        <div>
          <b>03</b>
          <h2>Always becoming.</h2>
          <p>
            Our work follows your life as it changes — with styling, sourcing
            and wardrobe guidance that makes room for who you are next.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ back, openShopper }) {
  const services = [
    {
      number: "01",
      title: "Personal styling",
      text: "A considered styling session to help you understand your shape, rhythm and signature point of view.",
    },
    {
      number: "02",
      title: "Full outfit shopping",
      text: "A complete look sourced and assembled for the occasion, from first idea to final finishing detail.",
    },
    {
      number: "03",
      title: "Wardrobe change",
      text: "A fresh direction for a new season of life — edit what stays, discover what is missing, and make dressing easy again.",
    },
    {
      number: "04",
      title: "Wardrobe curation list",
      text: "A personalized list of pieces to build toward, so every future purchase earns its place.",
    },
  ];
  return (
    <section className="service-page services-page">
      <div className="service-hero reveal is-visible">
        <small>THE SERVICES</small>
        <h1>
          More than clothes. A clearer way to <em>dress.</em>
        </h1>
        <p>
          Private, practical and personal — choose the kind of support your
          wardrobe needs next.
        </p>
        <button className="prelaunch-link" onClick={back}>
          Back to the collection <ArrowRight size={15} />
        </button>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <article key={service.number}>
            <b>{service.number}</b>
            <div>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </div>
            <ArrowRight size={20} />
          </article>
        ))}
      </div>
      <button className="cta services-cta" onClick={openShopper}>
        Request a private consultation <ArrowRight size={16} />
      </button>
    </section>
  );
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
function Logo({ onHome }) {
  return (
    <a
      className="logo"
      href="#top"
      onClick={onHome}
      aria-label="THEXIAS PLACE home"
    >
      <strong className="logo-wordmark">THEXIAS</strong>
      <small className="logo-place">PLACE</small>
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
    msg = `Hi THEXIAS PLACE! I'd like to order:\n\n${cart.map((x) => `- ${x.name} x${x.quantity} — ${money(x.price * x.quantity)}`).join("\n")}\n\nTotal: ${money(total)}`;
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

function ShopPage({
  list,
  cat,
  setCat,
  setSubcategory,
  setQ,
  sort,
  setSort,
  setSelected,
  add,
  wishlist,
  toggleWishlist,
}) {
  return (
    <main className="standalone-shop-page">
      <section className="shop" id="shop">
        <div className="shop-head">
          <div>
            <small>THE COLLECTION</small>
            <h1>Shop the edit.</h1>
            <p className="shop-intro">
              Considered pieces for every version of you.
            </p>
          </div>
          <div className="filters">
            {cats.map((c) => (
              <button
                className={cat === c ? "on" : ""}
                onClick={() => {
                  setCat(c);
                  setSubcategory("");
                  setQ("");
                }}
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
    </main>
  );
}

export default function App() {
  const [cat, setCat] = useState("All"),
    [subcategory, setSubcategory] = useState(""),
    [q, setQ] = useState(""),
    [sort, setSort] = useState("featured"),
    [cart, setCart] = useState(() =>
      readStoredList("thexias-cart").filter((item) => item.category !== "Bags"),
    ),
    [wishlist, setWishlist] = useState(() =>
      readStoredList("thexias-wishlist"),
    ),
    [selected, setSelected] = useState(null),
    [page, setPage] = useState(() =>
      window.location.hash === "#admin" ? "admin" : "home",
    ),
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
    [newsletterEmail, setNewsletterEmail] = useState(""),
    [newsletterSubscribed, setNewsletterSubscribed] = useState(false),
    [cartBump, setCartBump] = useState(false),
    [toast, setToast] = useState(""),
    [searchOpen, setSearchOpen] = useState(false),
    [searchTop, setSearchTop] = useState(144),
    [mobileMenuOpen, setMobileMenuOpen] = useState(false),
    [categoriesOpen, setCategoriesOpen] = useState(false),
    [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const searchPopoverRef = useRef(null);
  const categoriesMenuRef = useRef(null);
  const categoriesTriggerRef = useRef(null);
  useEffect(() => {
    if (!searchOpen) return undefined;
    const onPointerDown = (event) => {
      if (
        event.target.closest?.(".search-icon-button") ||
        searchPopoverRef.current?.contains(event.target)
      ) {
        return;
      }
      setSearchOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);
  useEffect(() => {
    if (!searchOpen) return undefined;
    const updateSearchPosition = () => {
      const nav = document.querySelector(".primary-nav");
      if (!nav) return;
      const navBottom = nav.getBoundingClientRect().bottom;
      setSearchTop(
        Math.max(
          12,
          Math.min(Math.round(navBottom + 10), window.innerHeight - 78),
        ),
      );
    };
    updateSearchPosition();
    window.addEventListener("scroll", updateSearchPosition, { passive: true });
    window.addEventListener("resize", updateSearchPosition);
    return () => {
      window.removeEventListener("scroll", updateSearchPosition);
      window.removeEventListener("resize", updateSearchPosition);
    };
  }, [searchOpen]);
  useEffect(() => {
    if (!categoriesOpen) return undefined;
    const onPointerDown = (event) => {
      if (!categoriesMenuRef.current?.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setCategoriesOpen(false);
        categoriesTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [categoriesOpen]);
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileCategoriesOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);
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
  let list = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return products.filter((p) => {
      const searchable = [
        p.name,
        p.category,
        p.subcategory,
        p.id,
        p.image,
        ...(p.sizes || []),
      ]
        .join(" ")
        .toLowerCase();
      return (
        (cat === "All" || p.category === cat) &&
        (!subcategory || p.subcategory === subcategory) &&
        terms.every((term) => searchable.includes(term))
      );
    });
  }, [cat, subcategory, q]);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  useReveal(`${page}-${cat}-${subcategory}-${q}-${sort}`);
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
    const existing = readStoredList("thexias-waitlist");
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
  const subscribeNewsletter = (event) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;
    localStorage.setItem("thexias-newsletter-email", newsletterEmail.trim());
    setNewsletterSubscribed(true);
    setToast("Welcome to the private edit");
    window.setTimeout(() => setToast(""), 2800);
  };
  const preOrderMessage = `Hi THEXIAS PLACE! I joined the prelaunch list and would like to pre-order from: ${waitlistForm.interests.join(", ")}. My name is ${waitlistForm.name}. Please notify me when payment and collection are available.`;
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
  const goToCollection = () => {
    setPage("home");
    window.setTimeout(
      () =>
        document
          .getElementById("shop")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
  };
  const navCategories = [
    {
      label: "Denim",
      category: "Denim",
      description: "Everyday denim essentials",
    },
    {
      label: "Tops",
      category: "Tops",
      description: "Easy layers and statement pieces",
    },
    {
      label: "Gowns",
      category: "Gowns",
      description: "Occasion dressing, thoughtfully chosen",
    },
    {
      label: "Bags",
      category: "Bags",
      description: "Considered finishing touches",
    },
    {
      label: "Shoes",
      category: "Shoes",
      description: "From everyday to occasion",
    },
  ];
  const whatsappUrl = "https://wa.me/2347048969953";
  const contactUrl = `${whatsappUrl}?text=${encodeURIComponent("Hi THEXIAS_PLACE, I have a question about the edit.")}`;
  const styleSessionUrl = `${whatsappUrl}?text=${encodeURIComponent("Hi THEXIAS_PLACE, I’d like to enquire about booking a style session.")}`;
  const closeNavigation = () => {
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
  };
  const goHomeTop = () => {
    closeNavigation();
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goHomeSection = (id) => {
    closeNavigation();
    setPage("home");
    window.setTimeout(
      () =>
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
  };
  const openShop = (category = "All") => {
    closeNavigation();
    setCat(category);
    setSubcategory("");
    setQ("");
    setPage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openOutfits = () => {
    closeNavigation();
    setPage("outfits");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openPersonalShopper = () => {
    closeNavigation();
    setPage("shopper");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openJournalNotice = () => {
    closeNavigation();
    setToast("The THEXIAS journal is being curated.");
    window.setTimeout(() => setToast(""), 2600);
  };
  return (
    <div id="top">
      <header className="site-header">
        <div className="utility-bar">
          <div className="utility-bar-inner">
            <Logo
              onHome={(e) => {
                e.preventDefault();
                goHomeTop();
              }}
            />
            <div
              className="utility-contact-list"
              aria-label="THEXIAS_PLACE contact details"
            >
              <a
                className="utility-contact"
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="utility-contact-label">WhatsApp</span>
                <strong>+234 704 896 9953</strong>
                <small>Chat with us</small>
              </a>
              <a
                className="utility-contact utility-contact--secondary"
                href={styleSessionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="utility-contact-label">Personal Shopper</span>
                <strong>Sourcing &amp; styling</strong>
                <small>Enquire on WhatsApp</small>
              </a>
            </div>
            <div className="utility-actions">
              <a
                className="utility-outline-pill"
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
              <a
                className="utility-outline-pill"
                href={styleSessionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Style Session
              </a>
              <button
                className="search-icon-button search-icon-button--round"
                type="button"
                onClick={() => setSearchOpen((value) => !value)}
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                aria-controls="site-search"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="announcement" role="note" aria-label="Store announcement">
        <div className="announcement-track">
          <span aria-hidden="true">
            FREE DELIVERY over ₦100,000 · New pieces, twice a week · 10% OFF ALL
            WEBSITE ORDERS.
          </span>
        </div>
      </div>
      <nav className="primary-nav" aria-label="Primary navigation">
        <div className="primary-nav-inner">
          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => {
              setMobileMenuOpen((value) => !value);
              setMobileCategoriesOpen(false);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
          >
            <span />
            <span />
            <span />
            <small>{mobileMenuOpen ? "Close" : "Menu"}</small>
          </button>
          <div className="primary-links">
            <a
              className="primary-nav-link"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                goHomeTop();
              }}
            >
              Home
            </a>
            <div
              className={`primary-nav-item primary-nav-item--dropdown${categoriesOpen ? " is-open" : ""}`}
              ref={categoriesMenuRef}
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => {
                if (
                  !categoriesMenuRef.current?.contains(document.activeElement)
                )
                  setCategoriesOpen(false);
              }}
              onFocusCapture={() => setCategoriesOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setCategoriesOpen(false);
              }}
            >
              <button
                ref={categoriesTriggerRef}
                className="primary-nav-link primary-nav-link--trigger"
                type="button"
                onClick={() => setCategoriesOpen(true)}
                aria-haspopup="true"
                aria-expanded={categoriesOpen}
                aria-controls="desktop-category-menu"
              >
                Categories <ChevronDown size={14} aria-hidden="true" />
              </button>
              <div
                className="mega-menu"
                id="desktop-category-menu"
                aria-label="Shop categories"
                aria-hidden={!categoriesOpen}
              >
                <div className="mega-menu-columns">
                  <div className="mega-menu-column">
                    <span className="mega-menu-eyebrow">Shop by category</span>
                    {navCategories.slice(0, 3).map((item) => (
                      <button
                        className="mega-menu-item"
                        type="button"
                        key={item.category}
                        onClick={() => openShop(item.category)}
                      >
                        <span>
                          <strong>{item.label}</strong>
                          <small>{item.description}</small>
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                  <div className="mega-menu-column">
                    <span className="mega-menu-eyebrow">
                      The finishing touches
                    </span>
                    {navCategories.slice(3).map((item) => (
                      <button
                        className="mega-menu-item"
                        type="button"
                        key={item.category}
                        onClick={() => openShop(item.category)}
                      >
                        <span>
                          <strong>{item.label}</strong>
                          <small>{item.description}</small>
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    ))}
                    <div className="mega-menu-featured">
                      <button type="button" onClick={openOutfits}>
                        <span>
                          <strong>Styled Outfits</strong>
                          <small>Complete looks, thoughtfully paired</small>
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                      <button type="button" onClick={openPersonalShopper}>
                        <span>
                          <strong>Personal Shopper</strong>
                          <small>Personal sourcing, guided by your brief</small>
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mega-menu-footer">
                  <button type="button" onClick={() => openShop("All")}>
                    View all categories{" "}
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => goHomeSection("edit")}>
                    Shop the Full Edit{" "}
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <button
              className="primary-nav-link"
              type="button"
              onClick={openOutfits}
            >
              Styled Outfits
            </button>
            <button
              className="primary-nav-link"
              type="button"
              onClick={openPersonalShopper}
            >
              Personal Shopper
            </button>
            <button
              className="primary-nav-link"
              type="button"
              onClick={openJournalNotice}
            >
              Blog
            </button>
          </div>
          <div className="primary-nav-actions">
            <button
              className="primary-shop-cta"
              type="button"
              onClick={() => openShop("All")}
            >
              Shop Now <ArrowRight size={15} aria-hidden="true" />
            </button>
            <button
              className="wishlist-button"
              type="button"
              onClick={() => setWishlistOpen(true)}
              aria-label="Open wishlist"
            >
              <Heart size={19} />
              <i>{wishlist.length}</i>
            </button>
            <button
              className={`bag ${cartBump ? "bump" : ""}`}
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open shopping bag"
            >
              <ShoppingBag size={19} />
              <i>{cart.reduce((a, x) => a + x.quantity, 0)}</i>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div
            className="mobile-nav-panel"
            id="mobile-nav-panel"
            aria-label="Mobile navigation"
          >
            <button
              className="mobile-nav-link"
              type="button"
              onClick={goHomeTop}
            >
              Home
            </button>
            <button
              className="mobile-nav-link mobile-nav-accordion"
              type="button"
              onClick={() => setMobileCategoriesOpen((value) => !value)}
              aria-expanded={mobileCategoriesOpen}
              aria-controls="mobile-category-list"
            >
              <span>Categories</span>
              <ChevronDown size={15} aria-hidden="true" />
            </button>
            {mobileCategoriesOpen && (
              <div className="mobile-category-panel" id="mobile-category-list">
                <div className="mobile-category-grid">
                  {navCategories.map((item) => (
                    <button
                      className="mobile-category-item"
                      type="button"
                      key={item.category}
                      onClick={() => openShop(item.category)}
                    >
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </button>
                  ))}
                </div>
                <div className="mobile-featured-links">
                  <button type="button" onClick={openOutfits}>
                    <strong>Styled Outfits</strong>
                    <small>Complete looks, thoughtfully paired</small>
                  </button>
                  <button type="button" onClick={openPersonalShopper}>
                    <strong>Personal Shopper</strong>
                    <small>Personal sourcing, guided by your brief</small>
                  </button>
                </div>
                <div className="mobile-menu-footer">
                  <button type="button" onClick={() => openShop("All")}>
                    View all categories{" "}
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => goHomeSection("edit")}>
                    Shop the Full Edit{" "}
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
            <button
              className="mobile-nav-link"
              type="button"
              onClick={openOutfits}
            >
              Styled Outfits
            </button>
            <button
              className="mobile-nav-link"
              type="button"
              onClick={openPersonalShopper}
            >
              Personal Shopper
            </button>
            <button
              className="mobile-nav-link"
              type="button"
              onClick={openJournalNotice}
            >
              Blog
            </button>
            <div className="mobile-nav-contact">
              <a
                className="utility-outline-pill"
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
              <a
                className="utility-outline-pill"
                href={styleSessionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Style Session
              </a>
            </div>
          </div>
        )}
      </nav>
      {searchOpen && (
        <form
          ref={searchPopoverRef}
          id="site-search"
          className="search-popover"
          style={{ top: `${searchTop}px` }}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchOpen(false);
            setPage("shop");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Search size={17} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the edit"
          />
          <button type="submit">Search</button>
        </form>
      )}
      {page === "admin" ? (
        <AdminDashboard
          back={() => {
            setPage("home");
            window.history.replaceState(null, "", "#top");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : page === "home" ? (
        <main>
          <section className="hero reveal is-visible">
            <div>
              <small>✦ THE NEW SEASON EDIT</small>
              <h1>
                Made for <em>your</em> becoming.
              </h1>
              <p>Modern pieces, softly tailored for every version of you.</p>
              <button
                className="cta"
                onClick={() => {
                  setPage("shop");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
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
            <div
              className="hero-art hero-photo"
              aria-label="THEXIAS PLACE hero fashion photograph"
            />
          </section>
          <section
            className="editorial-categories reveal"
            id="edit"
            aria-label="Explore THEXIAS PLACE"
          >
            <div className="editorial-category-grid">
              {homeEditCards.map((card) => (
                <button
                  type="button"
                  className="editorial-category-card"
                  key={card.title}
                  aria-label={`${card.title}: ${card.description} ${card.action}`}
                  onClick={() => {
                    setSubcategory("");
                    setQ("");
                    if (card.destination === "outfits") setPage("outfits");
                    else if (card.destination === "shopper") setPage("shopper");
                    else if (card.destination === "services")
                      setPage("services");
                    else {
                      setCat("All");
                      setPage("shop");
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <picture className="editorial-category-media">
                    <source
                      type="image/webp"
                      srcSet={`${card.image}-480.webp 480w, ${card.image}-960.webp 960w`}
                      sizes={card.sizes}
                    />
                    <img
                      src={`${card.image}.jpg`}
                      alt=""
                      width={card.width}
                      height={card.height}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </picture>
                  <span className="editorial-category-copy">
                    <small>{card.title}</small>
                    <strong>{card.description}</strong>
                    <span className="editorial-category-cta">
                      {card.action} <ArrowRight size={13} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section
            className="travel-edit-section reveal"
            aria-labelledby="travel-edit-title"
          >
            <div className="travel-edit-photo">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/category-cards/the_edit-480.webp 480w, /category-cards/the_edit-960.webp 960w"
                  sizes="(max-width: 850px) calc(100vw - 36px), (max-width: 1240px) 42vw, 500px"
                />
                <img
                  src="/category-cards/the_edit.jpg"
                  alt="A woman in a cream tailored suit carrying a dark handbag in a warm interior."
                  width={1632}
                  height={2592}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </picture>
            </div>
            <div className="travel-edit-panel">
              <div className="travel-edit-intro">
                <small>THE TRAVEL EDIT</small>
                <h2 id="travel-edit-title">
                  Curated for where <em>you’re going.</em>
                </h2>
                <p>
                  Tell us your destination, itinerary and how you want to feel.
                  We’ll curate looks for the journey—from airport arrivals to
                  dinners, beach days and everything in between.
                </p>
                <a
                  className="cta travel-edit-cta"
                  href={`https://wa.me/2347048969953?text=${encodeURIComponent("Hi THEXIAS_PLACE, I’d love help curating a travel wardrobe for my trip.")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Curate my trip <ArrowRight size={16} />
                </a>
              </div>
              <ul
                className="travel-edit-options"
                aria-label="Travel Edit collections"
              >
                {travelEditOptions.map(({ title, description, Icon }) => (
                  <li className="travel-edit-option" key={title}>
                    <Icon size={20} strokeWidth={1.4} aria-hidden="true" />
                    <span>
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </span>
                  </li>
                ))}
              </ul>
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
        </main>
      ) : page === "shop" ? (
        <ShopPage
          list={list}
          cat={cat}
          setCat={setCat}
          setSubcategory={setSubcategory}
          setQ={setQ}
          sort={sort}
          setSort={setSort}
          setSelected={setSelected}
          add={add}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      ) : page === "outfits" ? (
        <StyledOutfitsPage
          add={add}
          back={() => {
            setPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : page === "shopper" ? (
        <PersonalShopperPage
          back={() => {
            setPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : page === "about" ? (
        <AboutPage
          back={() => {
            setPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : (
        <ServicesPage
          back={() => {
            setPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          openShopper={() => {
            setPage("shopper");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
      <footer>
        <Logo
          onHome={(e) => {
            e.preventDefault();
            setPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        <p>An intentional wardrobe for the woman in motion.</p>
        <section className="newsletter" aria-labelledby="newsletter-title">
          <small>THE PRIVATE EDIT</small>
          <h3 id="newsletter-title">A little closer to what’s next.</h3>
          <p>
            Receive first access to new arrivals, private edits and considered
            styling notes — only when there is something worth opening.
          </p>
          {!newsletterSubscribed ? (
            <form onSubmit={subscribeNewsletter}>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
              />
              <button type="submit" aria-label="Subscribe to the private edit">
                <ArrowRight size={17} />
              </button>
            </form>
          ) : (
            <span className="newsletter-confirmed">
              You’re on the list. Welcome to the private edit.
            </span>
          )}
          <small className="newsletter-note">
            No noise. Just the pieces and stories we think you’ll love.
          </small>
        </section>
        <a href="https://wa.me/2347048969953">
          Chat with us on WhatsApp <ArrowRight size={15} />
        </a>
        <small>© 2024 THEXIAS PLACE · Made for the becoming.</small>
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
              directly to the private THEXIAS PLACE prelaunch form.
            </p>
            <iframe
              className="waitlist-form-frame"
              title="THEXIAS PLACE prelaunch waitlist"
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

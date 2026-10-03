/**
 * Service pages. The service list comes from Mann's public Facebook listing —
 * CONFIRM with the owner before launch and delete any service they don't offer
 * (removing an entry removes its page, nav links, form option and sitemap entry).
 *
 * Copy is written as practical homeowner guidance, not claims about the company.
 */

export type IllustrationKey =
  | "kitchen"
  | "bath"
  | "basement"
  | "floor"
  | "trim"
  | "deck"
  | "addition";

export type Service = {
  slug: string;
  name: string;
  /** Card / nav label */
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** One-line card summary */
  summary: string;
  intro: string[];
  illustration: IllustrationKey;
  includes: string[];
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    short: "Kitchens",
    metaTitle: "Kitchen Remodeling in Monroe, MI",
    metaDescription:
      "Kitchen remodeling in Monroe, Michigan — cabinets, countertops, layout changes, flooring and trim. Request a written estimate from Mann's Home Improvement.",
    h1: "Kitchen remodeling in Monroe, Michigan",
    summary: "Cabinets, counters, layout changes and the finish work that makes it look built-in.",
    intro: [
      "A kitchen remodel is the project most homeowners live with every single day afterward — so the details matter: drawers that clear the handles on the range, trim that meets the ceiling cleanly, an outlet where you actually set the coffee maker.",
      "Mann's Home Improvement focuses on interior finish work, which is where a kitchen either looks custom or looks assembled.",
    ],
    illustration: "kitchen",
    includes: [
      "Cabinet installation and replacement",
      "Countertop and backsplash updates",
      "Layout changes and wall removal planning",
      "Flooring, trim and crown molding",
      "Pantry, island and built-in storage",
      "Lighting and fixture updates (with licensed trades where required)",
    ],
    sections: [
      {
        heading: "Refresh, replace or reconfigure",
        body: [
          "Most kitchen projects land in one of three places. A refresh keeps the layout and updates surfaces — counters, backsplash, hardware, lighting, paint. A replacement swaps cabinets and counters in the same footprint. A reconfiguration moves things: opening a wall, adding an island, relocating the sink or range.",
          "Cost and timeline climb sharply with each step, mostly because moving plumbing, gas and electrical brings in licensed trades, permits and inspections. Knowing which category you're in is the first thing to settle.",
        ],
      },
      {
        heading: "What to decide before the estimate",
        body: [
          "You don't need finished plans, but it helps to know what bothers you about the current kitchen, whether the sink and range stay where they are, and the rough budget you're comfortable with. Photos of kitchens you like are useful too — they communicate style faster than descriptions.",
        ],
      },
      {
        heading: "Living through a kitchen remodel",
        body: [
          "Plan for a stretch without a working kitchen. A temporary setup in a dining room or basement — microwave, coffee maker, a folding table — makes the weeks far easier. Ask for a schedule with the estimate so you know when the kitchen will be out of commission.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a permit to remodel my kitchen?",
        a: "Cosmetic work like new cabinets in the same spot, counters and backsplash usually doesn't. Moving walls, plumbing, gas lines or adding circuits usually does. Your city or township building department makes the final call, and it's part of what gets discussed during the estimate.",
      },
      {
        q: "Can you keep my existing cabinets?",
        a: "Often, if the boxes are solid. New doors, hardware, paint, crown molding and better lighting can change a kitchen dramatically for a fraction of a full replacement.",
      },
      {
        q: "How long does a kitchen remodel take?",
        a: "It depends almost entirely on scope and material lead times — cabinets and countertops are often the longest wait. You'll get a timeline with the written estimate.",
      },
    ],
    related: ["finish-carpentry", "hardwood-flooring", "home-additions"],
  },
  {
    slug: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    short: "Bathrooms",
    metaTitle: "Bathroom Remodeling in Monroe, MI",
    metaDescription:
      "Bathroom remodeling in Monroe, Michigan — tub-to-shower conversions, tile, vanities and full gut renovations. Request an estimate from Mann's Home Improvement.",
    h1: "Bathroom remodeling in Monroe, Michigan",
    summary: "Showers, tile, vanities and full renovations, waterproofed properly behind the finish.",
    intro: [
      "A bathroom is small, but it's the hardest-working room in the house: water, steam and daily use every day for decades. What separates a bathroom that lasts from one that fails in five years is mostly hidden — waterproofing behind the tile, proper slope to the drain, and ventilation that actually moves air outside.",
    ],
    illustration: "bath",
    includes: [
      "Full bathroom renovations",
      "Tub-to-shower conversions",
      "Tile floors, walls and shower surrounds",
      "Vanities, mirrors and storage",
      "Accessibility updates like grab-bar blocking and curbless showers",
      "Trim, doors and finish carpentry",
    ],
    sections: [
      {
        heading: "What's behind the tile matters most",
        body: [
          "Tile and grout aren't waterproof on their own. A long-lasting shower needs a continuous waterproof layer behind the tile and a pan that slopes to the drain. When an older bathroom is opened up, it's common to find damaged subfloor or framing from slow leaks — something a good estimate accounts for as a possibility.",
        ],
      },
      {
        heading: "Ventilation in Michigan homes",
        body: [
          "Long winters mean windows stay shut and moisture stays in. A properly sized exhaust fan, vented to the outside rather than into the attic, is the cheapest insurance against peeling paint, mildew and swollen trim.",
        ],
      },
      {
        heading: "Planning for the long term",
        body: [
          "If you plan to stay in the house, it's worth thinking ahead while the walls are open. Adding wood blocking for future grab bars costs almost nothing during a remodel and saves tearing out tile later. A wider shower entry or a low curb is far easier to build now than retrofit.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you convert my tub to a walk-in shower?",
        a: "In most bathrooms, yes. The main questions are drain location, the floor structure under the tub, and whether you want to keep a tub somewhere else in the house for resale.",
      },
      {
        q: "How long will my bathroom be out of service?",
        a: "It depends on the scope and how long tile and waterproofing need to cure. If it's your only bathroom, mention that up front so the schedule can be planned around it.",
      },
    ],
    related: ["kitchen-remodeling", "finish-carpentry", "basement-remodeling"],
  },
  {
    slug: "basement-remodeling",
    name: "Basement Remodeling",
    short: "Basements",
    metaTitle: "Basement Finishing in Monroe, MI",
    metaDescription:
      "Basement finishing and remodeling in Monroe, Michigan — family rooms, bedrooms, bathrooms and storage. Request an estimate from Mann's Home Improvement.",
    h1: "Basement finishing and remodeling in Monroe, Michigan",
    summary: "Turn unfinished square footage into rooms you'll use — planned around moisture first.",
    intro: [
      "A finished basement is usually the least expensive way to add usable living space to a house. In Southeast Michigan, though, the first conversation isn't about paint colors — it's about water. Finishing over a moisture problem just hides it until it ruins the drywall and flooring.",
    ],
    illustration: "basement",
    includes: [
      "Framing, insulation and drywall",
      "Family rooms, offices and guest rooms",
      "Basement bathrooms (with licensed trades for plumbing)",
      "Flooring suited to below-grade spaces",
      "Trim, doors and built-in storage",
      "Ceiling options that keep utilities accessible",
    ],
    sections: [
      {
        heading: "Check for moisture before you frame",
        body: [
          "Look for efflorescence (white, chalky deposits) on the walls, water stains at the floor line, or a musty smell after heavy rain. Gutters and downspouts that dump water against the foundation are the most common — and cheapest — fix. Any active leaks should be resolved before the basement is finished.",
        ],
      },
      {
        heading: "Bedrooms need an egress window",
        body: [
          "If a finished basement will include a bedroom, building code requires an emergency escape opening — usually an egress window with a window well — sized so a person can climb out. It's one of the most common surprises in basement projects, so plan for it early.",
        ],
      },
      {
        heading: "Choose materials that tolerate a basement",
        body: [
          "Below-grade spaces stay cooler and damper than the rest of the house. Moisture-resistant drywall, insulation suited to concrete walls, and flooring like luxury vinyl or engineered wood hold up far better than standard carpet pad or solid hardwood.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a permit to finish my basement?",
        a: "Almost always. Finishing a basement typically involves framing, electrical and sometimes plumbing, which require permits and inspections from your city or township.",
      },
      {
        q: "Can I put hardwood floors in my basement?",
        a: "Solid hardwood isn't recommended directly over concrete below grade. Engineered wood or luxury vinyl plank give a similar look and handle basement conditions much better.",
      },
    ],
    related: ["hardwood-flooring", "bathroom-remodeling", "finish-carpentry"],
  },
  {
    slug: "hardwood-flooring",
    name: "Hardwood Flooring",
    short: "Hardwood Floors",
    metaTitle: "Hardwood Floor Installation in Monroe, MI",
    metaDescription:
      "Hardwood floor installation in Monroe, Michigan — solid and engineered wood, stair treads and transitions. Request an estimate from Mann's Home Improvement.",
    h1: "Hardwood floor installation in Monroe, Michigan",
    summary: "Solid and engineered wood floors, installed to handle Michigan's seasonal swings.",
    intro: [
      "Wood moves. It expands in humid Michigan summers and shrinks when the furnace runs all winter. A hardwood floor that stays flat and tight for decades starts with letting the wood acclimate, a flat subfloor, and the right expansion gaps hidden under the trim.",
    ],
    illustration: "floor",
    includes: [
      "Solid hardwood installation",
      "Engineered hardwood installation",
      "Subfloor preparation and leveling",
      "Stair treads, nosing and risers",
      "Thresholds and transitions between rooms",
      "Baseboard and shoe molding",
    ],
    sections: [
      {
        heading: "Solid or engineered?",
        body: [
          "Solid hardwood is one piece of wood top to bottom and can be refinished many times. Engineered hardwood has a real wood wear layer bonded to a stable core, which makes it much less prone to cupping and gapping — and the better choice over concrete, in basements, or over radiant heat.",
        ],
      },
      {
        heading: "Acclimation and humidity",
        body: [
          "Flooring should sit in the house before installation so its moisture content matches the home. Keeping indoor humidity reasonably steady year-round — a humidifier in winter, air conditioning in summer — is the single best thing you can do to keep gaps and cupping in check.",
        ],
      },
      {
        heading: "Finish details that make it look right",
        body: [
          "Clean transitions at doorways, properly scribed baseboard and shoe molding, and stair nosing that matches the field flooring are what make a new floor look like it was always part of the house.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can hardwood go in a kitchen?",
        a: "Yes, with sensible care — wipe up spills and use mats at the sink. Many homeowners like how it connects the kitchen to the rest of the house.",
      },
      {
        q: "Should I refinish or replace my existing floors?",
        a: "If the boards are solid hardwood with enough thickness left and no major water damage, refinishing is usually far less expensive. Badly damaged, cupped or thin-worn floors are better candidates for replacement.",
      },
    ],
    related: ["finish-carpentry", "kitchen-remodeling", "basement-remodeling"],
  },
  {
    slug: "finish-carpentry",
    name: "Finish Carpentry & Crown Molding",
    short: "Finish Carpentry",
    metaTitle: "Finish Carpentry & Crown Molding, Monroe MI",
    metaDescription:
      "Finish carpentry in Monroe, Michigan: crown molding, baseboard, door and window casing, wainscoting and built-ins. Request an estimate from Mann's.",
    h1: "Finish carpentry and crown molding in Monroe, Michigan",
    summary: "Crown molding, trim, wainscoting and built-ins — the details that make a room feel finished.",
    intro: [
      "Finish carpentry is the work you see every day: crown molding, baseboard, door and window casing, wainscoting, built-in shelving. It's also the work that shows every shortcut. Gaps at the corners, caulk filling for bad cuts, and trim that wanders with an uneven ceiling are hard to unsee.",
      "Interior finishes are a core focus for Mann's Home Improvement.",
    ],
    illustration: "trim",
    includes: [
      "Crown molding",
      "Baseboard and shoe molding",
      "Door and window casing",
      "Interior door installation",
      "Wainscoting, board-and-batten and accent walls",
      "Built-in shelving, benches and window seats",
    ],
    sections: [
      {
        heading: "Older homes are rarely square",
        body: [
          "Ceilings dip, walls bow, and corners are seldom 90 degrees — especially in older Monroe homes. Good trim work accounts for that: coped inside corners that stay tight as the house moves, scribed pieces that follow an uneven floor, and crown sized so small ceiling variations aren't obvious.",
        ],
      },
      {
        heading: "Scale the trim to the room",
        body: [
          "Trim that's too small looks like an afterthought; trim that's too big crowds the room. Ceiling height, window size and the style of the house all factor in. Matching the profiles already in an older home is often the best choice when only part of the house is being updated.",
        ],
      },
      {
        heading: "Built-ins add storage and character",
        body: [
          "Bookshelves flanking a fireplace, a mudroom bench with hooks and cubbies, or a window seat with drawers underneath use space that's otherwise wasted — and they look like they belong to the house.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you match the existing trim in my older home?",
        a: "Often, yes — many classic profiles are still available, and close matches can be built up from multiple stock pieces. Bring it up during the estimate, ideally with a sample or photo.",
      },
      {
        q: "Is crown molding worth it in a room with 8-foot ceilings?",
        a: "Yes, as long as it's scaled properly. A modest crown profile adds a finished look without making the ceiling feel lower.",
      },
    ],
    related: ["kitchen-remodeling", "hardwood-flooring", "bathroom-remodeling"],
  },
  {
    slug: "decks",
    name: "Deck Building",
    short: "Decks",
    metaTitle: "Deck Building in Monroe, MI",
    metaDescription:
      "Deck building and replacement in Monroe, Michigan: wood and composite decks, stairs and railings built for Michigan winters. Request an estimate.",
    h1: "Deck building in Monroe, Michigan",
    summary: "Wood and composite decks, stairs and railings, built for freeze-thaw winters.",
    intro: [
      "A deck lives outside through Michigan winters — freeze, thaw, snow load and spring rain. The parts that decide whether it lasts are the parts you don't see: footings below the frost line, a properly flashed ledger where it attaches to the house, and fasteners rated for treated lumber.",
    ],
    illustration: "deck",
    includes: [
      "New decks",
      "Deck replacement and rebuilding",
      "Pressure-treated and composite decking",
      "Stairs and landings",
      "Railings",
      "Repairs to boards, stairs and railings",
    ],
    sections: [
      {
        heading: "Footings below the frost line",
        body: [
          "Michigan's residential code requires footings to extend below the frost line — 42 inches deep in most of the state — so the ground freezing and heaving doesn't lift the deck. Shallow footings are one of the most common reasons older decks go out of level.",
        ],
      },
      {
        heading: "Wood or composite?",
        body: [
          "Pressure-treated lumber costs less up front but needs regular cleaning and sealing. Composite costs more initially, won't splinter, and needs little beyond occasional washing. The framing underneath is pressure-treated either way, so it deserves the same care.",
        ],
      },
      {
        heading: "Permits and inspections",
        body: [
          "Decks attached to the house or more than about 30 inches off the ground generally require a permit. Your city or township will inspect footings and framing — a useful second set of eyes on the parts that hold the deck up.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can my old deck be resurfaced instead of replaced?",
        a: "Sometimes. If the framing, ledger and footings are sound, new decking and railings on the existing structure can save money. If the framing is soft or the footings are shallow, rebuilding is the safer choice.",
      },
      {
        q: "When is the best time to build a deck?",
        a: "Spring and summer are busiest, so starting the conversation in late winter helps get on the schedule. Footings need unfrozen ground to dig.",
      },
    ],
    related: ["home-additions", "finish-carpentry"],
  },
  {
    slug: "home-additions",
    name: "Home Additions",
    short: "Additions",
    metaTitle: "Home Additions in Monroe, MI",
    metaDescription:
      "Home additions in Monroe, Michigan: room additions, expanded kitchens and new living space designed to match your house. Request an estimate.",
    h1: "Home additions in Monroe, Michigan",
    summary: "More room without moving — planned to match the house you already have.",
    intro: [
      "An addition is the biggest home improvement project most families take on. Done well, it looks like the house was always built that way: matching rooflines, siding and trim, floors that meet at the same height, and a layout that connects naturally to the existing rooms.",
    ],
    illustration: "addition",
    includes: [
      "Room additions",
      "Kitchen and family room expansions",
      "Primary suite additions",
      "Sunrooms and enclosed porches",
      "Interior finish work tying old and new spaces together",
      "Coordination with design, permitting and inspections",
    ],
    sections: [
      {
        heading: "Start with what the lot allows",
        body: [
          "Before design starts, your city or township's zoning rules determine how close to the property lines you can build, how much of the lot can be covered, and how tall the addition can be. A quick check with the zoning office early can save a redesign later.",
        ],
      },
      {
        heading: "Matching the existing house",
        body: [
          "The difference between an addition that looks original and one that looks tacked on is in the details: roof pitch, window sizes and placement, siding exposure, and interior trim that matches the rest of the house. Interior finish work is where Mann's Home Improvement focuses.",
        ],
      },
      {
        heading: "What to expect",
        body: [
          "Additions involve drawings, permits, foundations, framing, roofing, mechanical work and multiple inspections. They take longer than interior remodels and have more variables. A clear written scope and a realistic schedule up front matter more on an addition than on any other project.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it cheaper to add on or finish my basement?",
        a: "Finishing existing space is almost always less expensive per square foot, because the foundation, walls and roof already exist. An addition makes sense when you need space a basement can't provide — like a larger kitchen or a first-floor bedroom.",
      },
      {
        q: "Do I need an architect for an addition?",
        a: "Most additions need drawings for the permit. Depending on size and complexity, those may come from an architect or a residential designer. It's part of the conversation during the estimate.",
      },
    ],
    related: ["kitchen-remodeling", "decks", "basement-remodeling"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

import { site } from "./site";

/** Homepage FAQ. Answers avoid claims the owner hasn't confirmed. */
export const homeFaqs = [
  {
    q: "What kinds of projects does Mann's Home Improvement take on?",
    a: `Interior remodeling and finish work is the focus — ${site.specialty} — along with basements, hardwood flooring, decks and home additions.`,
  },
  {
    q: "Where do you work?",
    a: `Mann's Home Improvement is based in ${site.location.city}, ${site.location.regionName}. If you're nearby and not sure whether you're in range, call or send the form with your town and we'll let you know.`,
  },
  {
    q: "How do I get an estimate?",
    a: `Call ${site.phone.display} or use the estimate form. Tell us what you're thinking of changing; we'll follow up to talk it through and arrange a time to see the space.`,
  },
  {
    q: "How much does a remodel cost?",
    a: "It depends on the size of the space, the materials you choose, and whether anything structural, plumbing or electrical has to move. Those are exactly the questions a site visit answers, which is why estimates are written after seeing the room.",
  },
  {
    q: "Do I need a building permit?",
    a: "Cosmetic updates usually don't. Structural changes, new plumbing or electrical, finished basements, additions and most attached decks usually do. Your city or township building department decides, and it's covered as part of planning the project.",
  },
];

# ASJ Tours & Travels — digital presence: plan, build, and 30-day strategy

**Business:** ASJ Tours & Travels, Ongole, Prakasam district, Andhra Pradesh
**Proprietor:** Krishna Tulluri · 94401 44104 · krishnatullurijy@gmail.com
**Premises:** Abhilash Car Center, opposite Ratnamahal Theatre, near Nellore Bus Stand, Ongole 523001
**Trading since:** 1997 (29 years)
**Website:** https://jak2.github.io/asj-travels-09-sept/
**Google Business Profile:** https://asjtourstravels.business.site
**Report date:** 10 September 2026 · **Status:** built, live, awaiting rate sign-off

---

## Read this first

Two audiences, two different questions.

**If you are assessing this for credit:** the website is not the business and does not
generate the revenue. It is a ₹0-cost sales instrument supporting an existing 29-year
trading history. Section 3 (unit economics), Section 7 (monetisation) and Section 9 (risk)
are the ones that matter. The honest summary is in Section 10: *the fixed monthly-duty
contract is the asset; the website exists to win those contracts.*

**If you are assessing this as an engineer:** Section 5 (architecture), Section 6
(engineering decisions) and Section 8 (SEO implementation) carry the technical substance.
The short version: three static HTML pages, no framework, no build, no dependencies, no
backend, deployed free, with an executable check suite guarding both correctness and
factual claims.

**One disclosure that belongs at the top, not buried:** every price on the site is still an
estimate produced during design, not a rate the proprietor has confirmed. Nine route prices,
six ancillary charges and three monthly bands. They must be signed off before any money is
spent on advertising. This is tracked as C6 in `CONTENT.md` and is the single open item
between here and a live campaign.

---

## 1. The situation

ASJ is a two-car, owner-driven travels business in a tier-3 town. It has 29 years of trading
and a clean repayment record. What it does not have: a cash buffer, a salaried team, or any
digital presence beyond an unmanaged Google Business Profile.

The competitive reality in Ongole is not Ola and Uber — neither operates meaningfully there.
It is a dozen similar local operators, all discovered the same way: someone asks a friend for
a number. That referral channel already works. What it cannot do is:

1. **Survive a search.** A referred customer searches the name before calling. Finding
   nothing makes a 29-year business look like a one-week one.
2. **Travel without the referrer.** A phone number in a WhatsApp message carries no price,
   no proof, no scope.
3. **Pass a procurement check.** A bank or hospital admin evaluating vendors for a monthly
   contract needs something to forward to their manager. A phone number is not that.

The website addresses exactly these three failures. It is not a lead-generation machine and
was never designed as one.

## 2. The idea

Sell **published fixed prices** as the differentiator.

Every competitor in Ongole quotes over the phone, per customer, per mood. Publishing a rate
card is a small act with a disproportionate effect: it converts an opaque negotiation into a
transparent transaction, which is precisely what a first-time customer and a procurement
officer both want. It is also nearly costless to do and awkward for competitors to copy —
copying it means giving up per-call price discretion.

Second idea, and the commercially serious one: **shift revenue mix from retail trips to
monthly duty contracts.** A retail trip is a one-off that must be won again tomorrow. A
monthly contract is recurring revenue with a named counterparty, predictable utilisation,
and — from a lender's perspective — a receivable rather than a hope.

## 3. Unit economics

Figures below are the operating structure. **Every rupee amount is an estimate awaiting the
proprietor's confirmation** (C6, C7).

**Retail trip (indicative — Ongole to Tirupati, return, 2 days)**

| Line | Estimate |
|------|----------|
| Quoted price, sedan | ₹9,500 |
| Fuel, ~560 km at current diesel | ~₹4,200 |
| Driver bata, 2 days | ₹800 |
| Tolls, parking (billed at actuals to customer) | pass-through |
| Maintenance provision | ~₹1,100 |
| **Contribution** | **~₹3,400** |

**Monthly duty contract (indicative — Band A)**

| Line | Estimate |
|------|----------|
| Monthly fee | ₹45,000 |
| Driver salary | ~₹15,000 |
| Fuel, 2,000 km | ~₹15,000 |
| Maintenance, insurance, permit provision | ~₹6,000 |
| **Contribution** | **~₹9,000/month per vehicle** |

The contract is worth materially less per kilometre and materially more per month, because it
is *contracted*. One Band A contract is roughly equivalent to three Tirupati trips a month,
guaranteed, with no acquisition cost after signing and no idle days.

**Why this matters for credit:** two owned vehicles on monthly contracts produce a
predictable monthly contribution against a known cost base. Retail revenue does not.

## 4. What was built

Three pages, each with one job.

| Page | Job | Audience |
|------|-----|----------|
| **Home** | Establish a 29-year business in 30 seconds | Referred customer checking you out |
| **Rate card** | Be forwardable into a WhatsApp group | Price-comparing customer |
| **Monthly duty** | Survive a vendor evaluation | Bank / hospital / factory admin |

Home carries eleven sections: hero, trust strip, five services, a four-route rate preview, a
monthly-duty pitch, the fleet, why-ASJ with the proprietor named, references, distances from
Ongole, a six-question FAQ, and contact with the Google listing linked.

The monthly-duty page carries what a procurement reader actually asks for: what the contract
includes, who it suits, reliability specifics, three price bands with defined hours and
kilometres, a **printable one-page capability summary**, and a four-field enquiry form that
opens WhatsApp with the details pre-filled.

Every conversion path is a phone call or a WhatsApp thread. There is no booking engine and no
payment gateway, deliberately — see Section 6.

## 5. Architecture

| Layer | Choice |
|-------|--------|
| Markup | Hand-written HTML5, 3 files |
| Styling | One CSS file, 625 lines, custom properties |
| Behaviour | 87 lines of vanilla JavaScript |
| Build step | None |
| Dependencies | None. No `package.json`, no lockfile, no supply chain |
| Backend | None |
| Hosting | GitHub Pages, free tier |
| Testing | Node `assert`, `node check.js` |
| **Total running cost** | **₹0/month.** A domain, if bought, is ~₹800/year |

The site works on any browser back to roughly 2017, needs no polyfill, and its entire
content is present in the HTML — so a search crawler, a WhatsApp link preview, and a phone
with a failing script all see the same thing.

## 6. Engineering decisions, and the reasoning

Twelve decisions are recorded in `DECISIONS.md`, each with the condition that would reverse
it. The five that carry weight:

**Static files, zero recurring cost.** The family has no cash buffer. Any choice that could
produce a monthly invoice was rejected: no CMS, no hosting plan, no form service, no
analytics subscription. The second reason matters more long-term — nobody here will patch a
dependency tree or fix a build that broke unattended. A folder of HTML still works in five
years, untouched.

**No React, no framework.** This is three pages of text with one accordion and one form.
A UI runtime would ship ~45 KB of JavaScript to render content that never changes. The
site currently ships 87 lines.

**WhatsApp as the only conversion path.** No backend means no form to break, no database to
secure, no personal data held, and no compliance surface. The enquiry leaves as a pre-filled
WhatsApp message the sender can read and edit before sending. The proprietor already lives in
WhatsApp; the site meets him there.

**A bilingual Telugu toggle was built, then deleted.** It covered 18 strings out of roughly
200, so switching produced a Telugu-font page of English text, and the corporate page had no
toggle of its own — a one-way trip with no way back. It was also the only reason the rate
card was rendered in JavaScript, which left the rate page shipping an empty container: no
crawlable prices and nothing in a link preview. One unfinished feature was causing four
separate defects. Deleting it fixed all four. Telugu returns as a proper static build when
real copy exists and a native speaker has reviewed it.

**Truthfulness enforced in code, not in good intentions.** The design tool that produced the
layout invented plausible business facts to make the mockups look finished: six vehicles
including an Innova, an owner name, a GSTIN, four customer testimonials, nine drivers. All of
it was catalogued in `CONTENT.md` as C1–C14 and either corrected or flagged. The test suite
now **fails the build** if any page mentions a vehicle the business does not own. The four
invented testimonials were deleted outright on 10 September and replaced with a references
section pointing at the real Google listing.

That last decision is the one worth dwelling on for a credit assessment: the business's
entire pitch is *published prices, no surprises*. A site carrying fabricated customer quotes
would contradict the proposition it exists to sell.

## 7. Monetisation

The website earns nothing directly. It converts existing demand at three points:

| Path | Mechanism | Revenue |
|------|-----------|---------|
| Referred retail customer | Searches name, finds site, taps Call | Trip contribution ~₹3,400 |
| Forwarded rate card | One link into a family WhatsApp group | Trip, plus reach beyond the referrer |
| Corporate enquiry | Capability summary printed or WhatsApped to a manager | ₹45k–68k/month recurring |

**The corporate path is the whole business case.** Retail trips pay for diesel. Contracts pay
for the vehicle. The site is deliberately weighted toward the second: monthly duty appears in
the main navigation, as an emphasised services card, as its own home-page section, and as a
dedicated page with a printable leave-behind.

**Target mix at 12 months:** two vehicles on monthly contracts (~₹18,000/month contribution,
recurring) with retail trips filling evenings, weekends and wedding season on top.

## 8. SEO — audit and what was done

### Audit findings (before, 10 September)

| Finding | Severity |
|---------|----------|
| `robots.txt` contained `Disallow: /` — the entire site told Google not to index it | **Blocking** |
| No structured data of any kind — invisible to local search features | High |
| No canonical URLs | Medium |
| No `sitemap.xml` | Medium |
| Titles and descriptions written for humans only, no location or route keywords | High |
| No favicon — no brand mark in tabs, bookmarks or search results | Low |
| Placeholder phone number and a Google Maps link pointing at maps.google.com generally | **Blocking** |
| `lang="en"`, not `en-IN` | Low |
| Testimonials fabricated — a Google Ads policy problem, not only an ethical one | **Blocking for ads** |

Two things were already right and worth noting: all page content is in the HTML rather than
rendered by script, and each page has exactly one `<h1>` in a correct heading hierarchy.

### Implemented

- **`robots.txt` opened** to crawlers, with the sitemap declared
- **`TaxiService` structured data** on every page: legal name, proprietor, founding year,
  real address, phone, email, opening hours, price range, payment methods, and eight
  `areaServed` entries — Ongole, Prakasam district, Tirupati, Vijayawada, Hyderabad, Chennai,
  Guntur, Nellore
- **`FAQPage` structured data** generated *from the rendered FAQ markup at build time*, so
  the schema and the visible page can never drift apart
- **`BreadcrumbList`** on the two deep pages
- **Canonical URLs**, `og:url`, `og:site_name`, `og:locale`, Twitter card
- **Titles and descriptions rewritten** around the queries people actually type:
  *"ASJ Tours & Travels — Car Rental in Ongole | Tirupati, Vijayawada, Hyderabad"*,
  *"Ongole Car Rental Rates — Tirupati, Vijayawada, Hyderabad, Chennai"*
- **`sitemap.xml`**, **`favicon.svg`** in the business's own black-and-red, `theme-color`
- **`lang="en-IN"`**
- **Real contact details throughout** — phone, proprietor, address, email, and the actual
  Google Business Profile link replacing a generic Maps URL
- **Fabricated testimonials deleted**

Six new assertions were added to the test suite so these cannot silently regress: canonical
present, exactly one `<h1>`, description within length bounds, all structured data parses as
valid JSON, `robots.txt` not blocking, sitemap covers every page.

### The honest limit

**Organic search will not deliver customers in 30 days.** The site is on a
`github.io` subdomain with no domain authority and no backlinks. For competitive terms it
will not rank this quarter. What the SEO work actually buys:

1. **Branded search works.** Someone searching "ASJ Tours and Travels Ongole" finds it —
   which is the credibility job, and the highest-value query the business has.
2. **The Google Business Profile gets stronger.** Structured data and a linked website are
   both local-ranking signals. The GBP, not the website, is what appears in the map pack.
3. **Google Ads gets a compliant landing page.** Ads requires a functional site with clear
   contact details and no misleading claims. That is now true.

Anyone promising first-page organic rankings in a month is selling something.

## 9. 30-day plan to first customers

Ordered by cost-effectiveness, not by effort.

**Week 1 — free, highest return**

1. **Confirm the rates.** Nine routes, six charges, three bands. Nothing else may proceed
   until these are numbers the proprietor will honour on the phone. *Blocking.*
2. **Claim and complete the Google Business Profile.** Hours, all services, service area,
   the website link, and the two phone numbers. This is the single highest-return action
   available — in a tier-3 town the map pack *is* local search.
3. **Photograph the cars.** Seven placeholder boxes are waiting. Phone photos are fine; the
   layout was built for imperfect images. Post them to the GBP as well.
4. **Ask ten past customers for a Google review.** Ten genuine reviews will outperform every
   technical measure in this document combined.

**Week 2 — Google Ads**

- Campaign type: **Search**, not Display or Performance Max
- Geography: Ongole + 40 km radius. Nothing wider — the vehicles cannot serve it
- Suggested opening budget: **₹300–500/day (₹9,000–15,000/month)**
- Ad groups, each pointed at the most relevant page:

| Ad group | Example keywords | Landing page |
|----------|------------------|--------------|
| Airport transfer | ongole to vijayawada airport taxi, ongole airport cab | `rates.html` |
| Tirupati | ongole to tirupati car package, tirupati trip from ongole | `rates.html` |
| Local & hospital | car rental ongole, ongole to guntur hospital cab | `index.html` |
| Corporate | monthly car rental ongole, staff cab contract ongole | `corporate.html` |

- **Call extensions and call-only ads** carry this market. Most customers will tap to call,
  not fill a form.
- Expected cost per click in this geography is low — typically ₹8–25. At ₹400/day that is
  roughly 20–40 clicks daily.
- **Corporate keywords are the ones to protect budget for.** A ₹45,000/month contract
  justifies a materially higher cost per acquisition than a ₹3,200 airport drop.

**Weeks 3–4 — direct outreach, which will beat both**

Print the capability summary. Walk it into ten bank branches, three hospitals and five
granite units in Chimakurthy. In this market a printed one-pager handed to an office manager
converts better than any digital channel, and the page was built to be that leave-behind.

**Honest expectation for day 30:** a handful of retail trips attributable to ads and the GBP,
and one or two corporate conversations in progress. Contracts take weeks to close. If a
single Band A contract signs in month two, the entire year's ad spend is repaid.

## 10. Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Rates published before sign-off** | **High** | Blocking item. No ad spend until confirmed |
| Two vehicles cap capacity — a second contract may exceed the fleet | High | Attached-network relationships already exist; a third vehicle is a financing question, not a demand one |
| Owner-dependence: one person answers every call | High | The site sells this as a feature. It is also a single point of failure, and the reason contracts specify a named backup driver |
| Ad spend without answered calls | Medium | Do not run ads on days the phone cannot be answered |
| Fuel price movement against fixed contracts | Medium | Contracts state no mid-term fuel revision; bands should be re-priced annually |
| Domain still `github.io`, not owned | Low | ~₹800/year, buy before ads scale — a branded domain measurably improves click-through |
| No GSTIN on the capability sheet | Medium | Some procurement processes require it. Deliberately left blank rather than faked |

## 11. What this cost, and what it would have cost

| Item | This build | Typical agency |
|------|-----------|----------------|
| Design and build | ₹0 | ₹25,000–60,000 |
| Hosting | ₹0/month | ₹500–2,000/month |
| CMS licence | ₹0 | ₹0–1,500/month |
| Maintenance | ₹0 | ₹1,000–3,000/month |
| Domain | ~₹800/year | ~₹800/year |
| **Year one** | **~₹800** | **₹43,000–120,000** |

The saving is real, and it comes from the architecture rather than from cutting corners: no
recurring cost exists because nothing recurring was built.

## 12. Where it stands today

**Done:** three pages built and live; business-card palette applied; real contact details
throughout; invented testimonials removed; full SEO layer; automated checks covering
correctness, colour contrast, factual claims and SEO structure; deployed at ₹0.

**Open, in order:**

1. Rate sign-off — *blocking everything downstream*
2. Photographs for seven image slots
3. GSTIN, or a decision to omit it permanently
4. Which of the two numbers is the booking line
5. Accessibility verification — designed for, not yet measured
6. Real-device test on a budget Android on 4G
7. Domain purchase
8. Telugu, properly, as a static second build

---

### Appendix — documents in the project

| File | Contents |
|------|----------|
| `README.md` | What the site is for, house rules |
| `DECISIONS.md` | D1–D12, each with rationale and reversal condition |
| `FEATURES.md` | Full feature map, tech stack, launch gate |
| `CONTENT.md` | C1–C14: every placeholder fact and what it must become |
| `STATUS.md` | Blockers, owner questions, phase tracking, changelog |
| `check.js` | Executable checks: logic, contrast, factual claims, SEO |

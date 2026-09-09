/* Self-check for the non-trivial bits of site.js: run `node check.js`. */
const assert = require("assert");
const s = require("./assets/js/site.js");

// share link is a valid, encoded wa.me URL
const share = s.shareHref(s.SHARE_TEXT);
assert.ok(share.startsWith("https://wa.me/?text="));
assert.ok(!/[\n ]/.test(share), "share text must be encoded");
assert.strictEqual(decodeURIComponent(share.slice("https://wa.me/?text=".length)), s.SHARE_TEXT);

// form validation
const ok = { company: "Bank", contact: "Ramesh", route: "town duty", phone: "9848045123" };
assert.strictEqual(s.validateEnquiry(ok), "");
assert.strictEqual(s.validateEnquiry(Object.assign({}, ok, { phone: "+91 98480 45123" })), "");
assert.match(s.validateEnquiry(Object.assign({}, ok, { company: "" })), /Please fill/);
assert.match(s.validateEnquiry(Object.assign({}, ok, { company: "  " })), /Please fill/);
assert.match(s.validateEnquiry(Object.assign({}, ok, { phone: "12345" })), /10-digit/);
assert.match(s.validateEnquiry(Object.assign({}, ok, { phone: "not a phone" })), /10-digit/);
assert.match(s.validateEnquiry(Object.assign({}, ok, { phone: "----------" })), /10-digit/);
assert.match(s.validateEnquiry(Object.assign({}, ok, { phone: "1234567890" })), /10-digit/); // no Indian mobile starts with 1

// enquiry link carries every field, encoded, to the right number
const href = s.enquiryHref({ company: "Bank & Co", contact: "Ramesh", route: "town duty", phone: "9848045123" }, s.WA);
assert.ok(href.startsWith("https://wa.me/" + s.WA + "?text="));
const body = decodeURIComponent(href.split("?text=")[1]);
["Bank & Co", "Ramesh", "town duty", "9848045123"].forEach((v) => assert.ok(body.includes(v), `missing ${v}`));

// the rate card must not contradict the fleet: no vehicle we do not own or attach
const pages = ["index.html", "rates.html", "corporate.html"].map((f) => require("fs").readFileSync(f, "utf8"));
pages.forEach((html, i) => {
  assert.ok(!/Innova|Ertiga|Dzire/.test(html), `invented vehicle in page ${i}`);
});

// every page must carry a WhatsApp preview, since the link is meant to be forwarded
pages.forEach((html, i) => assert.ok(/property="og:title"/.test(html), `page ${i} has no og:title`));

// Palette contrast (D12). Three reds exist only because one cannot pass on both
// grounds; this fails if someone "simplifies" them back into one.
const css = require("fs").readFileSync("assets/css/site.css", "utf8");
const token = (name) => {
  const m = css.match(new RegExp("--" + name + ":\\s*(#[0-9A-Fa-f]{6})"));
  assert.ok(m, `token --${name} missing from site.css`);
  return m[1];
};
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
[
  ["red fill / white label", "red", "paper", 4.5],
  ["red text on white", "red-deep", "paper", 4.5],
  ["red text on black", "red-bright", "ink", 4.5],
  ["body text on white", "body", "paper", 4.5],
  ["white text on black", "paper", "ink", 4.5]
].forEach(([label, a, b, min]) => {
  const r = ratio(token(a), token(b));
  assert.ok(r >= min, `${label}: ${r.toFixed(2)}:1, needs ${min}:1`);
});

console.log("ok — all checks passed");

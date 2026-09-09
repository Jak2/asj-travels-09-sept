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

console.log("ok — all checks passed");

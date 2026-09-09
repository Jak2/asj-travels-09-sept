/* ASJ Tours & Travels — FAQ accordion, WhatsApp share, quote form.
   No framework, no build. All page content is in the HTML; this file only adds behaviour. */

var WA = "919440144104";            // TODO(owner): verify — booking number, digits only
var PHONE = "+91 94401 44104";      // TODO(owner): same number, display form

/* TODO(owner): these five prices repeat rates.html. Change both together. See CONTENT.md C6. */
var SHARE_TEXT = "ASJ Tours & Travels, Ongole — published rate card\n\n" +
  "Tirupati return (2 days): sedan ₹9,500 / SUV ₹13,500\n" +
  "Vijayawada airport drop: ₹3,200 / ₹4,400\n" +
  "Hyderabad drop: ₹7,500 / ₹10,500\n" +
  "Chennai airport drop: ₹7,800 / ₹11,000\n" +
  "Local 8hr/80km: ₹2,200 / ₹3,000\n\n" +
  "Tolls and parking at actuals. Driver bata ₹400/day.\n" +
  "Call " + PHONE;

/* ---------- pure helpers (exercised by check.js) ---------- */

function shareHref(text) {
  return "https://wa.me/?text=" + encodeURIComponent(text);
}

// Returns "" when the enquiry is valid, otherwise the message to show.
function validateEnquiry(form) {
  if (!form.company.trim() || !form.contact.trim() || !form.route.trim()) {
    return "Please fill company, contact person and requirement.";
  }
  // Indian mobile: 10 digits starting 6-9, optionally with +91 and separators.
  var digits = form.phone.replace(/[^0-9]/g, "").replace(/^91/, "");
  if (!/^[6-9][0-9]{9}$/.test(digits)) {
    return "Please enter a 10-digit mobile number.";
  }
  return "";
}

// No backend: the enquiry leaves as a prefilled WhatsApp message.
function enquiryHref(form, wa) {
  var text = "Monthly duty enquiry\n\n" +
    "Company: " + form.company.trim() + "\n" +
    "Contact: " + form.contact.trim() + "\n" +
    "Requirement: " + form.route.trim() + "\n" +
    "Phone: " + form.phone.trim();
  return "https://wa.me/" + wa + "?text=" + encodeURIComponent(text);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { shareHref: shareHref, validateEnquiry: validateEnquiry, enquiryHref: enquiryHref, SHARE_TEXT: SHARE_TEXT, WA: WA };
}

/* ---------- DOM ---------- */

if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", function () {

  // Answers are in the HTML and readable without JS; this only collapses them.
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var answer = btn.nextElementSibling;
      var sign = btn.querySelector(".faq-sign");
      answer.hidden = !answer.hidden;
      if (sign) sign.textContent = answer.hidden ? "+" : "–";
      btn.setAttribute("aria-expanded", answer.hidden ? "false" : "true");
    });
  });

  document.querySelectorAll("[data-share]").forEach(function (a) {
    a.href = shareHref(SHARE_TEXT);
  });

  var form = document.getElementById("quote-form");
  if (form) {
    var error = document.getElementById("form-error");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var values = {
        company: form.company.value,
        contact: form.contact.value,
        route: form.route.value,
        phone: form.phone.value
      };
      var message = validateEnquiry(values);
      error.textContent = message;
      error.hidden = !message;
      if (message) return;
      window.open(enquiryHref(values, WA), "_blank", "noopener");
    });
  }
});

(function () {
  var root = document.getElementById("product-detail");
  if (!root) return;
  var products = window.BTJ_PRODUCTS || [];
  var slug = new URLSearchParams(location.search).get("slug") || "";
  var item = products.filter(function (product) { return product.slug === slug; })[0];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  if (!item) {
    root.innerHTML = '<h1>Model not found</h1><p><a href="products.html">Back to products</a></p>';
    return;
  }

  var title = window.BTJ_productTitle ? window.BTJ_productTitle(item) : item.name;
  var sku = window.BTJ_modelCode ? window.BTJ_modelCode(item) : item.name;
  document.title = title + " · Bateja";
  var specs = (item.specs || []).map(function (row) {
    return "<tr><th>" + esc(row.label) + "</th><td>" + esc(row.value) + "</td></tr>";
  }).join("");
  root.innerHTML =
    '<article class="detail">' +
      '<div class="gallery">' +
        (item.image ? '<img src="' + esc(item.image) + '" alt="' + esc(title) + '">' : "") +
      "</div>" +
      "<div class=\"buy\">" +
        '<p class="sku">SKU ' + esc(sku) + "</p>" +
        "<h1>" + esc(title) + "</h1>" +
        '<p class="price">' + esc(item.price || "Ask") + "</p>" +
        '<p class="moq">MOQ 10 pcs · USD list price</p>' +
        '<form class="qty-row" id="inquire-form">' +
          '<label>Quantity <input type="number" name="qty" min="10" value="10" step="1"></label>' +
          '<button class="btn" type="submit">Inquire</button>' +
        "</form>" +
      "</div>" +
    "</article>" +
    (specs ? '<h2 class="spec-title">Specifications</h2><table class="specs">' + specs + "</table>" : "");

  var form = document.getElementById("inquire-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var qty = form.querySelector("[name=qty]").value || "10";
    location.href = "contact.html?model=" + encodeURIComponent(title) + "&qty=" + encodeURIComponent(qty);
  });
})();

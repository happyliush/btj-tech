(function () {
  var products = window.BTJ_PRODUCTS || [];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function card(item) {
    var price = item.price || "Ask";
    var detail = "product.html?slug=" + encodeURIComponent(item.slug);
    var image = item.image
      ? '<a class="shot" href="' + detail + '"><img src="' + esc(item.image) + '" alt="' + esc(item.name) + '"></a>'
      : "";
    return (
      '<article class="pcard">' + image +
      '<h3><a href="' + detail + '">' + esc(item.name) + "</a></h3>" +
      '<p class="pmeta">' + esc(price) + " · from 10 pcs</p>" +
      '<a class="btn" href="' + detail + '">View more</a></article>'
    );
  }

  var home = document.getElementById("home-products");
  if (home) {
    var picked = [];
    ["print", "digital"].forEach(function (cat) {
      products.filter(function (item) { return item.category === cat && item.image; })
        .slice(0, 4)
        .forEach(function (item) { picked.push(item); });
    });
    home.innerHTML = picked.map(card).join("");
  }

  var grid = document.getElementById("product-grid");
  if (!grid) return;
  var state = { cat: "all", q: "" };

  function render() {
    var list = products.filter(function (item) {
      var catOk = state.cat === "all" || item.category === state.cat;
      var q = state.q;
      var text = (item.name + " " + item.slug).toLowerCase();
      return catOk && (!q || text.indexOf(q) !== -1);
    });
    grid.innerHTML = list.map(card).join("") || "<p>No models match.</p>";
    var count = document.getElementById("product-count");
    if (count) count.textContent = String(list.length);
  }

  document.querySelectorAll("[data-cat]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.cat = button.getAttribute("data-cat");
      document.querySelectorAll("[data-cat]").forEach(function (item) {
        item.classList.toggle("on", item === button);
      });
      render();
    });
  });

  var search = document.getElementById("product-search");
  if (search) {
    search.addEventListener("input", function () {
      state.q = search.value.trim().toLowerCase();
      render();
    });
  }
  render();
})();

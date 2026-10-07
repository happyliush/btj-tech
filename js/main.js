(function () {
  var page = document.body.getAttribute("data-page");
  var header = document.getElementById("site-header");
  var footer = document.getElementById("site-footer");
  if (!header || !footer) return;

  var links = [
    ["index.html", "home", "Home"],
    ["custom.html", "custom", "OEM/ODM"],
    ["products.html", "products", "Products"],
    ["blog.html", "blog", "Blog"],
    ["about.html", "about", "About"],
    ["contact.html", "contact", "Contact"]
  ];

  var menu = links.map(function (item) {
    var current = item[1] === page ? ' aria-current="page"' : "";
    return '<a href="' + item[0] + '"' + current + ">" + item[2] + "</a>";
  }).join("");

  header.innerHTML =
    '<header class="nav"><div class="nav-inner">' +
    '<a class="brand" href="index.html"><img src="assets/logo-mark.svg" alt="" />' +
    "<div><strong>BATEJA</strong><span>Children's Camera</span></div></a>" +
    '<button class="menu-toggle" type="button" aria-expanded="false">Menu</button>' +
    '<nav class="menu">' + menu + '</nav></div></header>';

  footer.innerHTML =
    '<footer><div class="footer-inner"><div class="footer-grid">' +
    "<div><strong>Shenzhen Bateja Technology Co., Ltd.</strong><p class=\"muted\">Dahong High tech Park, Bao’an District, Shenzhen, Guangdong Province, China</p></div>" +
    "<div><strong>Visit</strong><p><a href=\"custom.html\">OEM/ODM</a><br><a href=\"products.html\">Products</a><br><a href=\"blog.html\">Blog</a><br><a href=\"about.html\">About us</a></p></div>" +
    "<div><strong>Contact</strong><p>E-mail: <a href=\"mailto:sales@bateja.com\">sales@bateja.com</a><br>WhatsApp: <a href=\"https://wa.me/8618923897186\" target=\"_blank\" rel=\"noopener\">+86 189 2389 7186</a></p></div>" +
    "</div><p class=\"legal\">Your brand. Our factory. From sample to small batch.</p></div></footer>" +
    '<div class="float"><a class="wa" href="https://wa.me/8618923897186" target="_blank" rel="noopener">WA</a></div>';

  var toggle = header.querySelector(".menu-toggle");
  var nav = header.querySelector(".menu");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

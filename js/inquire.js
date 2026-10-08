(function () {
  var form = document.getElementById("inquire-form");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var title = form.getAttribute("data-model") || "";
    var qty = form.querySelector("[name=qty]").value || "10";
    location.href = "/contact.html?model=" + encodeURIComponent(title) + "&qty=" + encodeURIComponent(qty);
  });
})();

(function () {
  function textOf(item) {
    var parts = [item.name || ""];
    (item.specs || []).forEach(function (row) {
      parts.push(row.label || "", row.value || "");
    });
    return parts.join(" ");
  }

  function modelOf(name) {
    var out = [];
    var tokens = String(name || "").trim().split(/\s+/);
    for (var i = 0; i < tokens.length && out.length < 2; i++) {
      var token = tokens[i].replace(/[,/;：:]+$/g, "");
      if (!token) continue;
      if (!out.length && /^[A-Za-z][A-Za-z]*\d[\w.+\-]*$/.test(token)) {
        out.push(token);
        continue;
      }
      if (out.length === 1 && /^[A-Z]$/.test(token)) {
        out.push(token);
        continue;
      }
      break;
    }
    return out.join(" ");
  }

  function collapseRepeats(text) {
    var words = String(text || "").trim().split(/\s+/);
    var changed = true;
    while (changed) {
      changed = false;
      for (var len = 3; len >= 1 && !changed; len--) {
        for (var i = 0; i + len * 2 <= words.length; i++) {
          var left = words.slice(i, i + len).join(" ").toLowerCase();
          var right = words.slice(i + len, i + len * 2).join(" ").toLowerCase();
          if (left === right) {
            words.splice(i + len, len);
            changed = true;
            break;
          }
        }
      }
    }
    return words.join(" ");
  }

  function themeOf(name) {
    var found = "";
    ["unicorn", "bear", "dinosaur", "kitty", "panda", "rabbit"].some(function (word) {
      if (new RegExp("\\b" + word + "\\b", "i").test(name || "")) {
        found = word.charAt(0).toUpperCase() + word.slice(1);
        return true;
      }
      return false;
    });
    return found;
  }

  function productType(item, blob) {
    var name = item.name || "";
    var low = (name + " " + blob).toLowerCase();
    if (item.category === "walkie" || /\bwalkie\b/.test(low)) return "Kids Video Walkie Talkie";
    if (/magnifier/.test(low)) return "Kids Phone Magnifier";
    if (/microscope/.test(low)) return "Kids Microscope Camera";
    if (item.category === "electronics" && /200\s*dpi|thermal/.test(low) && !/camera/.test(name.toLowerCase())) {
      return "Kids Thermal Printer";
    }
    if (item.category === "print" || /instant print|print camera|instant photo/.test(low)) {
      return "Kids Instant Print Camera";
    }
    if (/\bthumb\b/.test(low)) return "Kids Thumb Camera";
    if (/\bccd\b/.test(low)) return "Kids CCD Camera";
    return "Kids Digital Camera";
  }

  function featuresOf(blob) {
    var low = blob.toLowerCase();
    var list = [];
    if (/(^|[^a-z0-9])5k([^a-z0-9]|$)/.test(low)) list.push("5K Video");
    else if (/4k/.test(low)) list.push("4K Video");
    else if (/2\.7\s*k/.test(low)) list.push("2.7K Video");
    else if (/2\.5\s*k/.test(low)) list.push("2.5K Video");
    else if (/1080\s*p/.test(low)) list.push("1080P Video");
    else if (/720\s*p/.test(low)) list.push("720P Video");

    var mp = low.match(/(\d+(?:\.\d+)?)\s*mp/);
    if (mp && parseFloat(mp[1]) >= 8) list.push(mp[1] + "MP Photo");

    if (/dual\s*screen/.test(low)) list.push("Dual Screen");
    else if (/dual\s*(camera|lens)/.test(low)) list.push("Dual Camera");

    var zoom = low.match(/(\d+)\s*x\s*zoom/);
    if (zoom) list.push(zoom[1] + "X Zoom");

    var screen = low.match(/(\d+(?:\.\d+)?)\s*(?:inch|")/);
    if (screen) list.push(screen[1] + '" IPS Screen');

    if (/200\s*dpi/.test(low)) list.push("200DPI");
    if (/\bwifi\b/.test(low)) list.push("WiFi");
    if (/bluetooth/.test(low)) list.push("Bluetooth");
    if (/touch\s*screen|touchscreen|touchphone/.test(low)) list.push("Touch Screen");
    return list.slice(0, 3);
  }

  function productTitle(item) {
    var blob = textOf(item);
    var model = modelOf(item.name);
    var theme = themeOf(item.name);
    var type = productType(item, blob);
    var parts = [];
    var named = false;
    if (model) parts.push(model);
    else if (item.name) {
      parts.push(collapseRepeats(item.name));
      named = true;
    }
    if (theme && parts.join(" ").toLowerCase().indexOf(theme.toLowerCase()) === -1) parts.push(theme);
    var lead = parts.join(" ");
    if (!(named && /camera|printer|walkie|magnifier|microscope/i.test(lead))) parts.push(type);
    var modelKey = model.toLowerCase().replace(/[^a-z0-9]/g, "");
    featuresOf(blob).forEach(function (feature) {
      var featureKey = feature.toLowerCase();
      if (parts.join(" ").toLowerCase().indexOf(featureKey) !== -1) return;
      if (modelKey && /dual/.test(featureKey) && modelKey.indexOf("dual") !== -1) return;
      if (modelKey && /5k/.test(featureKey) && modelKey.indexOf("5k") !== -1) return;
      parts.push(feature);
    });
    return parts.join(" ");
  }

  window.BTJ_modelCode = function (item) {
    return modelOf(item && item.name) || collapseRepeats(item && item.name) || "";
  };
  window.BTJ_productTitle = productTitle;
})();

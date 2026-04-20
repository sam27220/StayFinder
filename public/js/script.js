// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  let today = new Date();
  let tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);

  // format YYYY-MM-DD
  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  let todayStr = formatDate(today);
  let tomorrowStr = formatDate(tomorrow);

  let checkin = document.getElementById("checkin");
  let checkout = document.getElementById("checkout");

  // Past disable
  checkin.setAttribute("min", todayStr);
  checkout.setAttribute("min", todayStr);


  checkin.value = todayStr;
  checkout.value = tomorrowStr;

  checkin.addEventListener("change", () => {
    let selected = new Date(checkin.value);
    selected.setDate(selected.getDate() + 1);

    let minCheckout = formatDate(selected);

    checkout.setAttribute("min", minCheckout);
    checkout.value = minCheckout;
  });
});


let taxSwitch = document.getElementById("switchCheckDefault");
if (taxSwitch) {
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".wishlist-icon").forEach((icon) => {
    icon.addEventListener("click", async (e) => {
      e.preventDefault();

      let id = icon.getAttribute("data-id");

      let res = await fetch(`/listings/wishlist/${id}`, {
        method: "POST",
      });
      // Toggle UI
      icon.classList.toggle("active");
    });
  });
});





document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");
  var openModalBtn = document.getElementById("openModalBtn");
  var closeModalBtns = document.querySelectorAll(".close");
  var successModal = document.getElementById("successModal");
  var contactForm = document.getElementById("contactForm");

  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModalBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      modal.style.display = "none";
      resetForm();
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      resetForm();
    }
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      storeFormData();
      showSuccessModal();
      modal.style.display = "none";
      resetForm();
    }
  });

  function validateForm() {
    var name = document.getElementById("name").value.trim();
    var address = document.getElementById("address").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    var nameError = document.getElementById("nameError");
    var addressError = document.getElementById("addressError");
    var phoneError = document.getElementById("phoneError");
    var emailError = document.getElementById("emailError");
    var messageError = document.getElementById("messageError");

    nameError.textContent = "";
    addressError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    var isValid = true;

    if (name === "") {
      nameError.textContent = "Name is required";
      isValid = false;
    }

    if (address === "") {
      addressError.textContent = "Address is required";
      isValid = false;
    }

    var phoneRegex = /^\+94\d{9}$/;
    if (phone !== "" && !phoneRegex.test(phone)) {
      phoneError.textContent = "Invalid phone number format (+94XXXXXXXXX)";
      isValid = false;
    }

    var emailRegex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (email !== "" && !emailRegex.test(email)) {
      emailError.textContent = "Invalid email format";
      isValid = false;
    }

    if (message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters long";
      isValid = false;
    }

    return isValid;
  }

  function storeFormData() {
    var formData = {
      name: document.getElementById("name").value.trim(),
      address: document.getElementById("address").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    localStorage.setItem("contactFormData", JSON.stringify(formData));
  }

  function showSuccessModal() {
    successModal.style.display = "block";
    setTimeout(function () {
      successModal.style.display = "none";
    }, 3000);
  }

  function resetForm() {
    contactForm.reset();
    var errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach(function (error) {
      error.textContent = "";
    });
  }
});

$(document).ready(function () {
  //согласие
  let consent = $(".consent");
  modalСonsent = $("[data-toggle = consent]");
  closeСonsent = $(".consent__close");

  //благодарность
  let modalSend = $(".modalSend");
  modalBtnSend = $("[data-toggle = modalSend]");
  closeBtnSend = $(".modalSend__close");

  //благодарность
  modalBtnSend.on("click", function () {
    //присваееваем класс
    modalSend.toggleClass("modalSend--visible");
  });

  closeBtnSend.on("click", function () {
    //присваееваем класс
    modalSend.toggleClass("modalSend--visible");
  });
  //закрытие по esc
  $(document).keyup("click", function (event) {
    if (event.which == "27") {
      $(".modalSend").removeClass("modalSend--visible");
    }
  });
  // закрытие по клику вне окна
  $(document).click(function (e) {
    if ($(e.target).is(".modalSend")) {
      modalSend.toggleClass("modalSend--visible");
    }
  });

  //согласие
  modalСonsent.on("click", function () {
    //присваееваем класс
    consent.toggleClass("consent--visible");
  });

  //закрытие по esc
  $(document).keyup("click", function (event) {
    if (event.which == "27") {
      $(".consent").removeClass("consent--visible");
    }
  });
  // закрытие по клику вне окна
  $(document).click(function (e) {
    if ($(e.target).is(".consent")) {
      consent.toggleClass("consent--visible");
    }
  });
  closeСonsent.on("click", function () {
    //присваееваем класс
    consent.toggleClass("consent--visible");
  });

  //анимация
  new WOW().init();

  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
      delay: 8000,
    },
  });

  //валидация форм
  $(".request__form").validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15,
      },
      userPhone: "required",
      checkBoxRequest: "required",
      // правило- обьект
      userEmail: {
        required: true,
        email: true,
      },
    },
    //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче 2 символов",
        maxlength: "Имя не длиньше 15 символов",
      },

      userPhone: "Телефон обязателен",
      checkBoxRequest: "Подтвердите свое согласие",

      userEmail: {
        required: "Обязательно укажите email",
        email: "Введите в формате: name@domain.com",
      },
    },
    //отправка формы через аякс
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "request.php",
        data: $(".request__form").serialize(), //Преобразует данные формы в строку, пригодную для использования в URL
        success: function (response) {
          $(form)[0].reset(); // чистит поля после отправки формы
          $(".modalSend").fadeIn();
        },
      });
    },
  });

  //маска для номера телефона
  $("[type=tel]").mask("+7(000)000-00-00", {
    placeholder: "Ваш номер телефона:",
  });
});
//плавный якорь
$(function () {
  $('a[href^="#"]').on("click", function (event) {
    // отменяем стандартное действие
    event.preventDefault();

    var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
    /*
     * sc - в переменную заносим информацию о том, к какому блоку надо перейти
     * dn - определяем положение блока на странице
     */

    $("html, body").animate({
        scrollTop: dn,
      },
      1000
    );

    /*
     * 1000 скорость перехода в миллисекундах
     */
  });
});
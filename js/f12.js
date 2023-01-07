document.onkeydown = function (e) {
    (123 == e.keyCode ||
      (e.ctrlKey &&
        e.shiftKey &&
        (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) ||
      (e.ctrlKey && 85 === e.keyCode)) &&
      debounce(function () {
        new Vue({
          data: function () {
            this.$notify({
              title: "你已被发现😜",
              message: "小伙子，扒源记住要遵循GPL协议！",
              position: "top-left",
              offset: 50,
              showClose: !0,
              type: "warning",
              duration: 5e3,
            });
          },
        });
      }, 300);
  }
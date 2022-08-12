
$(function () {
  function display(bool) {
      if (bool) {
          $("#container").show();
      } else {
          $("#container").hide();
      }
  }

  display(false)

  window.addEventListener('message', function(event) {
      var item = event.data;
      if (item.type === "ui") {
          if (item.status == true) {
              display(true)
          } else {
              display(false)
          }
      }
    })

  // if the person uses the escape key, it will exit the NUI
  document.onkeyup = function (data) {
      if (data.which == 27) {
          $.post(`https://${GetParentResourceName()}/exit`, JSON.stringify({}));
          return
      }
  };
  // if the person clicks the close button, it will exit the NUI
  $("#close").click(function () {
      $.post(`https://${GetParentResourceName()}/exit`, JSON.stringify({}));
      return
  })
  
  //when the user clicks on the submit button, it will run
  $("#submit").click(function () {
      let inputValue = $("#input").val()
      if (inputValue.length >= 100) {
          $.post(`https://${GetParentResourceName()}/error`, JSON.stringify({
              error: "Input was greater than 100"
          }))
          return
      } else if (!inputValue) {
          $.post(`https://${GetParentResourceName()}/error`, JSON.stringify({
              error: "There was no value in the input field"
          }))
          return
      }
      // if there are no errors from above, we can send the data back to the original callback and handle it from there
      $.post(`https://${GetParentResourceName()}/main`, JSON.stringify({
          text: inputValue,
      }));
      return;
  })
})

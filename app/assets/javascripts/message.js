$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    message.image.url == null ? image_html = `` : image_html = `<p class = "lower-message__image"><img src ="${message.image.url}" width="120" height="180"</p>`
    var html =
  `<div class='message' data-message-id="${message.id}">
    <div class='upper-message'>
      <div class='upper-message__user-name'>
        ${message.name}
      </div>
      <div class='upper-message__date'>
        ${message.date}
      </div>
    </div>
    <div class='lower-meesage'>
      <p class='lower-message__content'>
        ${message.content}
      </p>
      ${image_html}
    </div>
  </div>`

    return html;
  }

  function moveToBottom() {
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.form__submit').prop("disabled", false);
      moveToBottom();
    })
    .fail(function(){
      $('.form__message').val("");
      $('.hidden').val("");
      $('.form__submit').prop("disabled", false);
      alert('error!');
    })
  });

  $(function(){
    setInterval(update, 5000);
   });

    function update(){
    var message_id = $(".message").last().data("message-id");
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        id: message_id },
      dataType: 'json'
    })
    .done(function(data){
     data.forEach(function(newMessage){
      var html = buildHTML(newMessage);
      $('.messages').append(html)
      $('form')[0].reset();
      $(".form__submit").attr('disabled', false);
      moveToBottom();
      });
    });
    }
});

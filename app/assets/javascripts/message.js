$(function(){

  function buildHTML(message){
    message.image == null ? image_html = `` : image_html = `<div class = "lower-message__content"><img src ="${message.image.url}" width="120" height="180"</div>`
    var html =
  `<div class='message' id='message.id'>
    <div class='upper-message'>
      <div class='upper-message__user-name'>
        ${message.name}
      </div>
      <div class='upper-message__date'>
        ${message.created_at}
      </div>
    </div>
    <div class='lower-meesage'>
      <p class='lower-message__content'>
        ${message.text}
        ${image_html}
      </p>
    </div>
  </div>`

    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    //console.log(this)
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      $('.form__message').val("");
      $('.hidden').val("");
      $('.form__submit').prop("disabled", false);
      alert('error!');
    })
  });
});

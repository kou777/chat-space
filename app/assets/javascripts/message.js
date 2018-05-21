$(document).on('turbolinks:load', function() {
  pageReload();

  function buildHTML(message){
    message.image.url == null ? image_html = `` : image_html = `<p class = "lower-message__image"><img src ="${message.image.url}" width="120" height="180"</p>`
    var html =
  `<div class='message' id='message.id'>
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

function pageReload(){
  if (window.location.href.match(/messages/)) {
    setInterval(function() {
      $.ajax({
        type: 'GET',
        url: './messages',
        dataType: 'json'
      })
      .done(function(data) {
        var old_num = $('.message').length;
        var new_num = data.messages.length;
        var html = '';
        for(var i = old_num; i < new_num; i++) {
          html += buildHTML(data.messages[i]);
        };
        if(old_num < new_num){
        $('.messages').append(html);
        moveToBottom();
      }
      })
      .fail(function() {
        alert('メッセージを読み込めませんでした。');
      })
    },5000);
  };
 }
});

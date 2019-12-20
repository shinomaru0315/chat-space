$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = 
        `<div class="message" data-message-id ="${message.id}">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image}>
        </div>`
      return html;
    } 
    else if (message.content) {
      var html = 
        `<div class="message" data-message-id="${message.id}">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    } 
    else if (message.image) {
      var html = 
        `<div class="message" data-message-id= "${message.id}" >
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <img src= "${message.image}">
          </div>
        </div>`
      return html;
    };
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main__chat').append(html);
       $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
       $('form')[0].reset();
     })
     .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
    $('submit').prop('disabled', true);
    return false;
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "./api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message)
      })
      $('.main__chat').append(insertHTML);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
    })
    .fail(function() {

    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
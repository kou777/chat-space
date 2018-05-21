json.array! @new_message do |message|
  json.name     message.user.name
  json.date     message.created_at.to_s(:published_on)
  json.content  message.content
  json.image    message.image
  json.id       message.id
end

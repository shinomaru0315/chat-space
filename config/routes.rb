Rails.application.routes.draw do
  get 'messages/index'

  root "messages#index"
  get 'message/index'
end

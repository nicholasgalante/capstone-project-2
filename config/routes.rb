Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get "/mentors" => "mentors#index"
  get "/mentors/:id" => "mentors#show"

  get "/students" => "students#index"
  get "/students/:id" => "students#show"

  #sign up routes
  post "/signup/mentors" => "mentors#create"
  post "signup/students" => "students#create"

  #session routes
  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/user" => "sessions#show"

  #meeting routes
  resources :meetings, only: [:index, :show, :create, :update, :destroy]

  #resource routes
  resources :resources, only: [:index, :show, :create, :destroy]

  #meeting resource routes
  resources :meeting_resources, only: [:create, :destroy]
  
end

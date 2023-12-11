Rails.application.routes.draw do
  resources :meeting_resources
  resources :resources
  resources :meetings
  resources :student_applications
  resources :mentor_applications
  resources :students
  resources :mentors
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  #index all mentors
  get "/mentors" => "mentors#index"
  get "/mentors/:id" => "mentors#show"
  get "/students" => "students#index"
  get "/students/:id" => "students#show"
  post "/mentors" => "mentors#create"
  post "/students" => "students#create"
  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
end

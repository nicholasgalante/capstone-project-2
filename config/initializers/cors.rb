# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:4000"
    # origin ? origin : '*'

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
    # cors.allow_methods %w(GET POST PATCH PUT DELETE OPTIONS)
    # cors.allow_headers %w(Content-Type Authorization Accept)
    # Add `Cookie` and any other relevant headers for session access
    # cors.expose_headers %w(Content-Length Content-Type Authorization)
  end
end

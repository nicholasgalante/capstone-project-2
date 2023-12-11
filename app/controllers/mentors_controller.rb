class MentorsController < ApplicationController
   skip_before_action :authorize, only: [:show, :index]

   def index
      mentors = Mentor.all
      render json: mentors, status: :ok
   end
   
   def show
      mentor = Mentor.find_by(id: session[:mentor_id])
      render json: mentor, status: :ok
   end
   
   def create
      mentor = Mentor.create(mentor_params)
      if mentor.valid?
         session[:mentor_id] = mentor.id
         render json: mentor
      else
         render json: { errors: mentor.errors.full_messages }, status: :unprocessable_entity
      end
   end
   
   private
   
   def mentor_params
      params.permit(:name, :email, :password, :password_confirmation)
   end
end

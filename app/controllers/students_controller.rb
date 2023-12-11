class StudentsController < ApplicationController
   before_action :authorize, only: [:show]
   
   def show
      student = Student.find_by(id: session[:student_id])
      render json: student
   end
   
   def create
      student = Student.create(student_params)
      if student.valid?
         session[:student_id] = student.id
         render json: student
      else
         render json: { errors: student.errors.full_messages }, status: :unprocessable_entity
      end
   end
   
   private
   
   def student_params
      params.permit(:name, :email, :password, :password_confirmation)
   end
end

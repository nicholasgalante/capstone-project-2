class StudentsController < ApplicationController
  before_action :authorize, only: [:show]

  def index
    students = Student.all
    render json: students, status: :ok
  end

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
    params.require(:student).permit(:first_name, :last_name, :email_address, :password, :password_confirmation, :university_name, :degree_type, :area_of_study, :expected_graduation_date)
  end
end

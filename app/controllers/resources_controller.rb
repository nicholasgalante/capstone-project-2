class ResourcesController < ApplicationController
  def index
    resources = Resource.all
    render json: resources, status: :ok
  end

  def my_resources
    if session[:user_type] == "mentor"
      resources = Mentor.find(session[:user_id]).resources
    elsif session[:user_type] == "student"
      resources = Student.find(session[:user_id]).resources
    end
    # resources = Resource.all
    render json: resources, status: :ok
  end

  def create
    resource = Resource.create(resource_params)
    render json: resource, status: :created
  end

  def show
    resource = Resource.find(params[:id])
    render json: resource, status: :ok
  end

  def destroy
    resource = Resource.find(params[:id])
    resource.destroy
    head :no_content
  end

  private

  def resource_params
    params.require(:resource).permit(:title, :url, :description)
  end
end

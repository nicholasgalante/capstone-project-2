class ResourcesController < ApplicationController
   def index
      #render only all resources between a mentor and their student
      resources = Resource.all
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

   def update
      resource = Resource.find(params[:id])
      resource.update(resource_params)
      render json: resource, status: :ok
   end

   def destroy
      resource = Resource.find(params[:id])
      resource.destroy
      head :no_content
   end

   private

   def resource_params
      params.require(:resource).permit(:name, :url, :description)
   end
end

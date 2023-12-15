class StudentApplicationSerializer < ActiveModel::Serializer
  attributes :id, :application_status, :current_gpa, :major, :motivation, :portfolio_url, :goals_aspirations
end
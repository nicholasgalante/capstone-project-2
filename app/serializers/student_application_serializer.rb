class StudentApplicationSerializer < ActiveModel::Serializer
  attributes :id, :application_status, :expected_graduation, :current_gpa, :major, :motivation, :portfolio_url, :goals_aspirations
end

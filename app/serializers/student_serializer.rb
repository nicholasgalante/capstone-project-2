class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email_address, :university_name, :degree_type, :area_of_study, :expected_graduation_date, :mentor_id
  has_many :meetings
  has_one :student_application
  has_one :mentor
end

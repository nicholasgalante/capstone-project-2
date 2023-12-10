class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email_address, :password_digest, :university_name, :degree_type, :area_of_study
end

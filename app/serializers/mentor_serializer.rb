class MentorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email_address, :password_digest, :company_name, :job_title
  has_many :meetings
  has_one :mentor_application
  has_one :student
end

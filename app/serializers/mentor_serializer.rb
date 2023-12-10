class MentorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email_address, :pasword_digest, :company_name, :job_title
end

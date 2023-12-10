class MentorApplicationSerializer < ActiveModel::Serializer
  attributes :id, :application_status, :resume_url, :motivation, :skills_expertise, :philosophy
end

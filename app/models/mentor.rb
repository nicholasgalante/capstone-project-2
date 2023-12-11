class Mentor < ApplicationRecord
   has_secure_password

   has_one :student
   has_many :meetings, dependent: :destroy

   validates :first_name, :last_name, :email_address, :company_name, :job_title, presence: true
   validates :password, confirmation: true
   validates :email_address, uniqueness: true
end

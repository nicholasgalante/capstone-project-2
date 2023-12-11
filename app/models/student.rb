class Student < ApplicationRecord
   has_secure_password

   belongs_to :mentor
   has_many :meetings, dependent: :destroy

   validates :password, confirmation: true
   validates :first_name, :last_name, :email_address, :degree_type, :area_of_study, :expected_graduation_date, :university_name, presence: true
   validates :password, length: { minimum: 8, message: "must be at least 8 characters long" }
   validates :email_address, uniqueness: true

end


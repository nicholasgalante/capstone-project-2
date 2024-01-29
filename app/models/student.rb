class Student < ApplicationRecord
  has_secure_password

  belongs_to :mentor, optional: true
  has_many :meetings, dependent: :destroy
  has_one :student_application
  has_many :resources, as: :owner, dependent: :destroy

  validates :first_name, :last_name, :email_address, :degree_type, :area_of_study, :university_name, presence: true
  validates :password, confirmation: true
  # validates :password, length: { minimum: 5, message: "must be at least 5 characters long" }
  validates :email_address, uniqueness: { message: "This email address is already in use, please try another." }
end

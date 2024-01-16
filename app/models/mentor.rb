class Mentor < ApplicationRecord
  has_secure_password
  before_save :downcase_email

  has_one :student
  has_one :mentor_application
  has_many :meetings, dependent: :destroy
  has_many :resources, as: :owner, dependent: :destroy

  validates :first_name, :last_name, :email_address, :company_name, :job_title, presence: true
  validates :password, confirmation: true
  #validates :password, length: { minimum: 6, message: "must be at least 6 characters long" }
  validates :email_address, uniqueness: true

  private

  def downcase_email
    self.email_address = email_address.downcase
  end
end

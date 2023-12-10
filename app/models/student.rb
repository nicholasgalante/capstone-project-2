class Student < ApplicationRecord
   has_secure_password

   belongs_to :mentor
   has_many :meetings, dependent: :destroy

   validates :first_name, :last_name, :email_address, presence: true
   validates :email_address, uniqueness: true

end


class Mentor < ApplicationRecord
   has_secure_password

   has_one :student
   has_many :meetings, dependent: :destroy
   
end

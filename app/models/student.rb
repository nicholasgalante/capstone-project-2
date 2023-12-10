class Student < ApplicationRecord
   has_secure_password

   belongs_to :mentor
   has_many :meetings, dependent: :destroy
   
end


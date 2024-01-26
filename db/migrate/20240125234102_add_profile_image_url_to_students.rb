class AddProfileImageUrlToStudents < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :profile_image_url, :string
  end
end

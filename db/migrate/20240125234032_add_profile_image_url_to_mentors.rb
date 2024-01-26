class AddProfileImageUrlToMentors < ActiveRecord::Migration[7.1]
  def change
    add_column :mentors, :profile_image_url, :string
  end
end

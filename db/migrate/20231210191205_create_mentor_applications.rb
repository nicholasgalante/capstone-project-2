class CreateMentorApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :mentor_applications do |t|
      t.string :application_status
      t.string :resume_url
      t.text :motivation
      t.text :skills_expertise
      t.text :philosophy

      t.timestamps
    end
  end
end

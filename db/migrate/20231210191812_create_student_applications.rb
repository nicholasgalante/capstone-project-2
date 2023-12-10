class CreateStudentApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :student_applications do |t|
      t.string :application_status
      t.date :expected_graduation
      t.integer :current_gpa
      t.string :major
      t.text :motivation
      t.string :portfolio_url
      t.text :goals_aspirations

      t.timestamps
    end
  end
end

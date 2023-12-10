class CreateStudents < ActiveRecord::Migration[7.1]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.string :email_address
      t.string :password_digest
      t.string :university_name
      t.string :degree_type
      t.string :area_of_study
      t.integer :mentor_id  # foreign key for mentor

      t.timestamps
    end
  end
end

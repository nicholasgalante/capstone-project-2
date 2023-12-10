class CreateMentors < ActiveRecord::Migration[7.1]
  def change
    create_table :mentors do |t|
      t.string :first_name
      t.string :last_name
      t.string :email_address
      t.string :pasword_digest
      t.string :company_name
      t.string :job_title

      t.timestamps
    end
  end
end

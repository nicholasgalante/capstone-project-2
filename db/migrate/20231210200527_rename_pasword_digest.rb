class RenamePaswordDigest < ActiveRecord::Migration[7.1]
  def change
    rename_column :mentors, :pasword_digest, :password_digest
  end
end

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require "bcrypt"

puts "Clearing the database..."
[Mentor, Student, Meeting, MentorApplication, StudentApplication, Resource, MeetingResource].each do |model|
  model.delete_all
end

puts "🌱 Seeding..."

Mentor.create!(
  first_name: "John",
  last_name: "Doe",
  email_address: "john.doe@example.com",
  password_digest: BCrypt::Password.create("password"),
  company_name: "Acme Corp",
  job_title: "Senior Software Engineer",
)

Mentor.create!(
  first_name: "Jane",
  last_name: "Doe",
  email_address: "jane.doe@example.com",
  password_digest: BCrypt::Password.create("password"),
  company_name: "TechCo",
  job_title: "Data Scientist",
)

MentorApplication.create!(
  application_status: "Approved",
  resume_url: "https://example.com/john_doe_resume.pdf",
  motivation: "I'm passionate about helping students succeed in their careers. I believe mentorship can be a powerful tool for growth and development.",
  skills_expertise: "Software development, leadership, team collaboration",
  philosophy: "I believe in creating a positive and supportive environment where students can learn and grow.",
  mentor_id: Mentor.find_by(first_name: "John").id,
)

MentorApplication.create!(
  application_status: "Approved",
  resume_url: "https://example.com/jane_doe_resume.pdf",
  motivation: "I enjoy sharing my knowledge and experience with others. I'm excited to help students achieve their academic and career goals.",
  skills_expertise: "Data science, machine learning, statistics",
  philosophy: "I believe in providing personalized guidance and support to each student.",
  mentor_id: Mentor.find_by(first_name: "Jane").id,
)

Student.create!(
  first_name: "Alice",
  last_name: "Smith",
  email_address: "alice.smith@example.com",
  password_digest: BCrypt::Password.create("password"),
  university_name: "University of California, Berkeley",
  degree_type: "Bachelor of Science",
  area_of_study: "Computer Science",
  expected_graduation_date: Date.new(2025, 5, 31),
  mentor_id: Mentor.find_by(first_name: "John").id,
)

Student.create!(
  first_name: "Bob",
  last_name: "Johnson",
  email_address: "bob.johnson@example.com",
  password_digest: BCrypt::Password.create("password"),
  university_name: "Massachusetts Institute of Technology",
  degree_type: "Master of Science",
  area_of_study: "Data Science",
  expected_graduation_date: Date.new(2024, 8, 15),
  mentor_id: Mentor.find_by(first_name: "Jane").id,
)

StudentApplication.create!(
  application_status: "Accepted",
  current_gpa: 4.0,
  major: "Data Science",
  motivation: "I'm passionate about using data to solve real-world problems and make a positive impact on society.",
  portfolio_url: "https://example.com/bob_johnson_portfolio",
  goals_aspirations: "Pursue a research career in data science",
  student_id: Student.find_by(first_name: "Alice").id,
)

StudentApplication.create!(
  application_status: "Accepted",
  current_gpa: 3.8,
  major: "Computer Science",
  motivation: "I'm eager to learn from an experienced professional and gain valuable insights into the software development industry.",
  portfolio_url: "https://example.com/alice_smith_portfolio",
  goals_aspirations: "Develop mobile applications and work at a leading tech company",
  student_id: Student.find_by(first_name: "Bob").id,
)

Resource.create!(title: "Effective Software Development Practices", url: "https://www.amazon.com/Effective-Software-Development-Practices-Edition/dp/0134694774")
Resource.create!(title: "The Data Science Handbook", url: "https://www.amazon.com/Data-Science-Handbook-Field-Guide/dp/1491910370")
Resource.create!(title: "Cracking the Coding Interview", url: "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850")

meeting1 = Meeting.create!(
  organizer_id: Student.find_by(first_name: "Alice").id,
  meeting_datetime: DateTime.new(2024, 01, 15, 14, 00),
  location: "Acme Corp Conference Room",
  topics_discussed: "Career goals, software development projects",
  next_steps: "Work on portfolio website, attend coding bootcamp",
)

meeting2 = Meeting.create!(
  organizer_id: Student.find_by(first_name: "Bob").id,
  meeting_datetime: DateTime.new(2024, 02, 01, 10, 00),
  location: "TechCo Coffee Shop",
  topics_discussed: "Machine learning algorithms, data analysis techniques",
  next_steps: "Complete online data science courses, participate in hackathons",
)

MeetingResource.create!(meeting_id: meeting1.id, resource_id: Resource.find_by(title: "Cracking the Coding Interview").id)
MeetingResource.create!(meeting_id: meeting2.id, resource_id: Resource.find_by(title: "The Data Science Handbook").id)

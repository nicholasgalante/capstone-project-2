# Read Me

## Project: TechBridge - Connecting Students and Mentors

TechBridge facilitates one-to-one mentorship between university students studying IT degrees and experienced professionals in the field.

**Please note:** This is a capstone project currently under development. While functional, some features and functionalities are still being actively implemented and improved.

### Overview:

* Mentors: Share their knowledge and experience, guide students on career paths, and provide valuable feedback.
* Students: Gain insights into the working world, receive personalized advice, and develop skills to excel in their careers.

### Unique Selling Proposition:

* Personalized: One-to-one mentorship offers deeper connections and tailored support compared to group interactions.
* Career-focused: Mentors with industry experience provide real-world advice and help students prepare for their desired careers.
* Skill development: Students gain practical skills through project guidance and discussions with experienced professionals.

### Tech Stack:

* Frontend: React provides a dynamic and user-friendly interface, while Tailwind CSS ensures beautiful and responsive design.
* Backend: Ruby on Rails delivers a robust and scalable backend with its powerful framework and rich gem ecosystem.

### System Architecture:

* One-to-one relationships: A mentor can have one student and a student can belong to one mentor. 
* One-to-many relationships: Students and Mentors can have many meetings.
* Polymorphic relationships: Mentors and students can have many resources using `owner_type` and `owner_id` attributes
* Many-to-many relationships: Students and Mentors can have many resources through meetings using the `MeetingResource` joins table. 
* RESTful client-side routing: Seamless navigation between pages using React Router.
* Password protection and user authentication: Secure access with user accounts and login functionalities.
* Full CRUD operations: Create, Read, Update, and Delete functionality for all models, adhering to REST conventions.
* Validations and error handling: Ensure data integrity and user experience with comprehensive validation rules and informative error messages.

### Deployment and Hosting:

Deployed and hosted on AWS: Reliable and scalable cloud infrastructure ensures high availability and performance.

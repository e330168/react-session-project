Dynamic user creation from todos: user1–user10 with default password 123456.
Local JSON database (db.json) defines additional users with roles: admin, manager, user, guest, each with the default password 123456.
Login system authenticates users from either generated users or db.json.
Role-based access control and secure routing:
  Admin (id=1) can view all todos and dashboards.
  Other users see only their own todos or pages according to their permissions.
Todo dashboard displays total todos and the first/last todo IDs.
Mock backend: Run a local JSON server to serve db.json:
  json-server --watch db.json --port 3001
Demonstrates authentication, permissions, conditional UI, and protected routes using a local JSON server.


Todos Data

The app also uses todos from the JSON API:

Each todo has:
- userId -> which user it belongs to
- id -> unique todo ID
- title -> task description
- completed -> status (true/false)

Todos are filtered by user:
- Admin (id=1) can see all todos
- Other users see only their own todos



Local JSON database (db.json)
The app uses a local db.json file as a mock backend:

1. Users: stores id, username, password, role, and permissions.
2. Sessions: stores id, title, summary, description, duration, date, image, and price.

1. Users – defines users, roles, and permissions:
- Admin (id=1) -> view_dashboard, view_sessions, edit_session, delete_session
- Manager (id=2) -> view_dashboard, view_sessions, edit_session
- User (id=3) -> view_todos, view_dashboard, view_sessions
- Guest (id=4) -> view_dashboard

2. Sessions – contains session details:
- id: unique session ID (e.g., sess01)
- title: session title
- summary: short description
- description: full content
- duration: in hours
- date: session date
- image: image reference
- price: session cost

Session Actions

Users can perform the following actions based on their permissions:

- Book a session – create a new session
- Filter sessions – by date, month, or whether they are expired/upcoming
- Search sessions – using a search bar
- Delete a session – if they have delete_session permission
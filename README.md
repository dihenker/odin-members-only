# Member's Only!

## Overview

Member's only is an exclusive messaging board that allows members to read and write posts. Non-members (i.e. users not registered) will still be able to read posts. Members can become VIP by entering the secret password, which then allows them to view the author and creation date of posts. 

This project is part of [The Odin Project's](https://www.theodinproject.com/) cirriculum - specifically the [Member's Only](https://www.theodinproject.com/lessons/node-path-nodejs-members-only) proejct. The project employs user authentication, authorization, and database modeling. 

## Live Website Demo

## Tech Stack

- **Frontend:** EJS Templating (server-side rendering), CSS
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL, Supabase
- **Authentication:** Passport.js (local strategy), bcryptjs

## Features

- **User Authentication**
  - Signup, login, and logout functionality using Passport.js
  - Passwords securely hashed with bcryptjs
  - Manage sessions with express-sessions + Passport sessions
- **Message Board**
  - Members can create new posts
  - Non-members can see messages
- **VIP Status**
  - Members can claim VIP status by entering a secret password
  - VIPs can view post authors and date/time posted
- **Admin Permissions**
  - Admin users can delete messsages
- **Form Validation**
  - Custom validation for password requirements and confirmation
  - Input sanitation for user-submitted data (TODO for all inputs)

## Demo

#### Todo
- Input sanitation for all inputs
- Incorporate more relationship between database tables (instead of storing username directly, store user id)
  

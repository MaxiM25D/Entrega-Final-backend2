src
│
├── config
│ ├── db
│ │ └── connect.config.js
│ └── env.config.js
│
├── dao
│ ├── user.dao.js
│ ├── product.dao.js
│ └── cart.dao.js
│
├── dto
│ ├── user.dto.js
│ └── product.dto.js
│
├── repositories
│ ├── user.repository.js
│ ├── product.repository.js
│ └── cart.repository.js
│
├── services
│ ├── user.service.js
│ ├── product.service.js
│ └── cart.service.js
│
├── controllers
│ ├── user.controller.js
│ ├── product.controller.js
│ ├── cart.controller.js
│ └── session.controller.js
│
├── routes
│ ├── user.router.js
│ ├── product.router.js
│ ├── cart.router.js
│ └── session.router.js
│
├── middlewares
│ ├── auth.middleware.js
│ ├── jwt.middleware.js
│ └── role.middleware.js
│
├── models
│ ├── user.model.js
│ ├── product.model.js
│ └── cart.model.js
│
├── utils
│ ├── bcrypt.js
│ └── jwt.js
│
├── server
│ └── server.app.js
│
app.js

El objetivo es agregar:

Arquitectura profesional
Seguridad
Roles
DTO
Repository pattern
Mailing
Sistema de compra robusto

Ticket schema
{
code: String,
purchase_datetime: Date,
amount: Number,
purchaser: String
}

# format

src/
├── app/   MAIN FOLDER (must be under src)
│   ├── api/                    BACKEND_FOLDER
│   │   │
│   │   ├── expenses/            BACKEND_EXPENSES
│   │   │   ├── [expenseId]/  
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   │  
│   │   ├── groups/             BACKEND_GROUPS
│   │   │   └── [groupId]           
│   │   │       └──route.ts             
│   │   │ 
│   │   └── users/              BACKEND_USERS
│   │       ├── [userId]/
│   │       │   └── route.ts
│   │       │
│   │       ├── login/   
│   │       │   └── route.ts
│   │       │
│   │       ├── logout/  
│   │       │   └── route.ts
│   │       │       
│   │       ├── me/ 
│   │       │   └── route.ts
│   │       │      
│   │       ├── search/ 
│   │       │   └── route.ts
│   │       │        
│   │       └── signup/ 
│   │           └── route.ts
│   │
│   ├── groups          FRONTEND
│   │   └── [groupId]/
│   │       └── page.tsx
│   │
│   ├── login/          FRONTEND
│   │   └── page.tsx
│   │
│   ├── profile/         FRONTEND
│   │   └── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   │
│   ├── signup/         FRONTEND
│   │   └── page.tsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
│
├── components/     EXTRA
│   ├── ConditionalLayout.tsx
│   ├── ConditionalNavbar.tsx
│   ├── ExpenseForm.tsx
│   ├── Home.tsx
│   └── Navbar.tsx
│
├── dbConfig/   EXTRA
│   └── dbConfig.ts
│
├── helpers/    EXTRA
│   └── getDataFromToken.ts
│
└── models/     EXTRA
│   ├── expenseModel.js
│   ├── groupModel.js
│   └── userModel.js
│
└── middleware.ts   EXTRA_FILE





# With detail

src/
├── app/   MAIN FOLDER (must be under src)
│   ├── api/                    BACKEND_FOLDER
│   │   │
│   │   ├── expenses/            BACKEND_EXPENSES
│   │   │   ├── [expenseId]/  
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   │  
│   │   ├── groups/             BACKEND_GROUPS
│   │   │   └── [groupId]           
│   │   │       └──route.ts             
│   │   │ 
│   │   └── users/              BACKEND_USERS
│   │       ├── [userId]/
│   │       │   └── route.ts
│   │       │
│   │       ├── login/   
│   │       │   └── route.ts
│   │       │
│   │       ├── logout/  
│   │       │   └── route.ts
│   │       │       
│   │       ├── me/ 
│   │       │   └── route.ts
│   │       │      
│   │       ├── search/ 
│   │       │   └── route.ts
│   │       │        
│   │       └── signup/ 
│   │           └── route.ts
# 3. route - connect to db, export POST request
# get the user info from the signup/page, verify email and username is unique, hash password and store newUser in db.
│   │
│   ├── groups          FRONTEND
│   │   └── [groupId]/
│   │       └── page.tsx
│   │
│   ├── login/          FRONTEND
│   │   └── page.tsx
│   │
│   ├── profile/         FRONTEND
│   │   └── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   │
│   ├── signup/         FRONTEND
│   │   └── page.tsx
# 2. page - export signup page.
# On signup it will pass the user detail and wait for response from api/users/signup/

│   │
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
│
├── components/     EXTRA
│   ├── ConditionalLayout.tsx
│   ├── ConditionalNavbar.tsx
│   ├── ExpenseForm.tsx
│   ├── Home.tsx
│   └── Navbar.tsx
│
├── dbConfig/   EXTRA
│   └── dbConfig.ts
# 4. dbConfig - create a connection with mongoDB database.
│
├── helpers/    EXTRA
│   └── getDataFromToken.ts
│
└── models/     EXTRA
│   ├── expenseModel.js
│   ├── groupModel.js
│   └── userModel.js
# 5. userModel - create a userModel to store data in db.
│
└── middleware.ts
# 1. middleware - use cookies to verify that user is loged in or not. And restrict path accordingly.

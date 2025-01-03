```
StockComedy/
│
├── index.html                   # Main landing page
│
├── pages/                       # Folder for individual HTML pages
│   ├── about.html               # About page
│   ├── stock-list.html          # Stock list page
│   ├── stock-detail.html        # Stock detail page
│   ├── download.html            # Download page
│   ├── leaderboard.html         # Leaderboard page
│   ├── crypto-list.html         # Crypto list page
│   ├── ipo-list.html            # IPO list page
│   ├── news.html                # News page
│
├── assets/                      # Folder for static assets (CSS, JS, images)
│   ├── css/                     # Folder for CSS files
│   │   ├── global.css           # Global styles (layout, typography, etc.)
│   │   ├── stock.css            # Stock-specific styles
│   │   ├── stock-detail.css     # Stock detail-specific styles
│   │   ├── crypto.css           # Crypto-specific styles
│   │   ├── ipo.css              # IPO-specific styles
│   │   ├── leaderboard.css      # Leaderboard-specific styles
│   │   ├── download.css         # Download page styles
│   │   ├── news.css             # News-specific styles
│   │   ├── about.css            # About page styles
│
│   ├── js/                      # Folder for JavaScript files
│   │   ├── global.js            # Global interactions (e.g., navigation)
│   │   ├── stock.js             # Stock interactions (price updates, charts)
│   │   ├── stock-detail.js      # Stock detail interactions
│   │   ├── crypto.js            # Crypto interactions
│   │   ├── ipo.js               # IPO-related interactions
│   │   ├── leaderboard.js       # Leaderboard interactions
│   │   ├── download.js          # Download page interactions
│   │   ├── news.js              # News page interactions
│   │   ├── about.js             # About page interactions
│
│   ├── images/                  # Folder for image files (logos, icons, etc.)
│   │   ├── logo.png             # Main logo image
│   │   ├── stock-icon.png       # Icon for stock section
│   │   ├── crypto-icon.png      # Icon for crypto section
│   │   ├── ipo-icon.png         # Icon for IPO section
│   │   ├── news-icon.png        # Icon for news section
│   │   ├── footer-bg.jpg        # Background image for footer
│   │   ├── hero-banner.jpg      # Hero banner image for landing page
│
├── firebase/                    # Folder for Firebase configuration and services
│   ├── config.js                # Firebase configuration settings
│   ├── service.js               # Firebase interaction logic (CRUD operations)
│
├── backend/                     # Folder for Node.js backend
│   ├── server.js                # Main server file using Express (handles API requests)
│   ├── controllers/             # Folder for handling API logic
│   │   ├── stockController.js   # Controller for stock-related API logic
│   │   ├── cryptoController.js  # Controller for crypto-related API logic
│   │   ├── ipoController.js     # Controller for IPO-related API logic
│   │   ├── newsController.js    # Controller for news-related API logic
│   ├── routes/                  # Folder for API route definitions
│   │   ├── stockRoutes.js       # Routes for stock-related requests
│   │   ├── cryptoRoutes.js      # Routes for crypto-related requests
│   │   ├── ipoRoutes.js         # Routes for IPO-related requests
│   │   ├── newsRoutes.js        # Routes for news-related requests
│   ├── services/                # Folder for services handling Firebase data operations
│   │   ├── firebaseService.js   # Firebase CRUD logic used in backend
│   ├── utils/                   # Folder for utility functions
│   │   ├── priceUpdater.js      # Logic for updating stock and crypto prices
│
├── .gitignore                   # Git ignore file (to exclude node_modules, etc.)
├── package.json                 # Node.js dependencies and project configuration
└── README.md                    # Project documentation (setup, usage, etc.)
```

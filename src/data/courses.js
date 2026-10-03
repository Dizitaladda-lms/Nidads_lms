export const courses = [
  {
    id: 1,
    title: "Diploma in Data Science & AI",
    level: "diploma",
    slug: "diploma-in-data-science-and-ai",
    category: "data-science",
    duration: "12 Months",
    mode: "Hybrid Learning",
    rating: 4.8,
    students: 450,
    price: "₹99,999",
    monthlyPrice: "₹8,499",
    image: "/courseCards/1.webp",
    metaTitle: "Diploma in Data Science & AI – Enroll 2026",
    metaDescription:
      "Enroll in our Diploma in Data Science & AI and gain industry-ready skills, hands-on projects, certification, and placement support.",
    description:
      "For beginners and working pros alike. Master Python, R, Machine Learning, Deep Learning, SQL, Statistics and BI tools through real projects.",
    fullDescription:
      "This comprehensive 12-month diploma program is designed for beginners and working professionals who want to build a strong foundation in Data Science and AI. Master Python, SQL, Statistics, Machine Learning, Deep Learning, Big Data, Cloud Computing and MLOps through hands-on real-world projects, from foundational tools like Excel and GitHub all the way to production-grade model deployment. Career outcomes include Data Scientist, ML Engineer, and AI Specialist roles.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience in machine learning and data science",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: [
      "Python",
      "GitHub",
      "Excel",
      "NumPy & Pandas",
      "Data Visualization",
      "Statistics",
      "SQL & NoSQL",
      "Machine Learning",
      "Deep Learning",
      "Big Data & Cloud",
      "Model Deployment",
      "MLOps"
    ],
    seoKeywords: [
      "diploma in data science and ai",
      "diploma in data science",
      "data science and ai course",
      "b tech in ai and data science",
      "ai and data science courses in india",
      "master in ai ml and data science"
    ],
    whatYouWillLearn: [
      "Set up and navigate the full Data Science toolchain: Anaconda, Jupyter, VS Code, Colab, and GitHub",
      "Master Python, NumPy and Pandas for data manipulation and analysis",
      "Build effective data visualizations with Matplotlib, Seaborn and Plotly",
      "Apply descriptive and inferential statistics, hypothesis testing and A/B testing",
      "Write advanced SQL queries and work with NoSQL databases like MongoDB",
      "Build and evaluate supervised and unsupervised machine learning models",
      "Design and train deep neural networks including CNNs and RNNs with TensorFlow/Keras",
      "Process large-scale data using Apache Spark and PySpark",
      "Deploy ML models to the cloud using Docker, Kubernetes and MLOps best practices",
      "Build production-ready REST APIs for ML models with Flask and FastAPI",
      "Monitor, maintain and retrain production models, including CI/CD pipelines",
      "Build a placement-ready GitHub portfolio and prepare for technical interviews"
    ],
    curriculum: [
      {
        section: "Month 1: Foundations & Setup",
        lectures: [
          { title: "Week 1: Welcome to Data Science World — definition, scope, roadmap, career paths (Data Scientist, Data Analyst, ML Engineer, Business Analyst), CRISP-DM workflow, and real-world DS applications (Netflix, Google, Uber, Amazon)", duration: "1 Week", type: "video" },
          { title: "Week 2: Essential Tools & Environment Setup — Python vs SQL, IDE ecosystem (Anaconda, Jupyter, VS Code, Colab), GPU/TPU usage and Colab collaboration features", duration: "1 Week", type: "video" },
          { title: "Week 3: GitHub Foundation — version control, Git vs GitHub, repository management, README writing, issue tracking, forking/pull requests, and GitHub Pages portfolio creation", duration: "1 Week", type: "video" },
          { title: "Week 4: Excel Foundation — interface, formulas, pivot tables/charts, data validation, basic macros, and data import/export", duration: "1 Week", type: "video" },
          { title: "Project 1: Business Data Dashboard — data cleaning, SUM/AVERAGE/VLOOKUP/IF formulas, dynamic charts, interactive pivot tables, and professional reporting", duration: "8 hours", type: "project" }
        ]
      },
      {
        section: "Month 2: Python for Data Science",
        lectures: [
          { title: "Week 5-6: Data Structures & NumPy — lists, tuples, dictionaries, sets, array operations, broadcasting, and linear algebra functions", duration: "2 Weeks", type: "video" },
          { title: "Project 2: Student Grade Analysis System — data structure implementation, statistical calculations with NumPy, grade distribution and performance metrics", duration: "1 Week", type: "project" },
          { title: "Week 7-8: Pandas Foundation — DataFrames and Series, loading data from multiple sources, data cleaning/preprocessing, grouping, merging and reshaping", duration: "2 Weeks", type: "video" }
        ]
      },
      {
        section: "Month 3: Data Visualization & Exploratory Data Analysis",
        lectures: [
          { title: "Week 9-10: Visualization Foundations — principles of effective visualization, Matplotlib fundamentals, Seaborn statistical plots, and chart-type selection", duration: "2 Weeks", type: "video" },
          { title: "Project 4: Sales Performance Visualization Suite — multi-dimensional visualization, interactive dashboards, executive summary reports", duration: "1 Week", type: "project" },
          { title: "Week 11-12: Advanced Visualization & EDA — Plotly interactive visualizations, geographical data visualization, and EDA techniques", duration: "2 Weeks", type: "video" },
          { title: "Major Project 5: E-commerce Customer Behavior Analysis — full EDA workflow, customer segmentation visualization, business insights, presentation-ready dashboards", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Month 4: Statistics & Probability",
        lectures: [
          { title: "Week 13-14: Descriptive Statistics — central tendency, dispersion, probability distributions, correlation/covariance, hypothesis testing fundamentals", duration: "2 Weeks", type: "video" },
          { title: "Week 15-16: Inferential Statistics — confidence intervals, t-tests, ANOVA, Chi-square tests, Bayesian statistics intro, and A/B testing methodology", duration: "2 Weeks", type: "video" },
          { title: "Major Project 6: Marketing Campaign Effectiveness Analysis — statistical significance testing, campaign performance metrics, ROI analysis and recommendations", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Month 5: SQL & NoSQL",
        lectures: [
          { title: "Week 17-18: SQL Fundamentals — database design principles, SQL syntax/operations, joins, subqueries, window functions, database optimization", duration: "2 Weeks", type: "video" },
          { title: "Week 19-20: Advanced SQL & NoSQL — advanced SQL functions, stored procedures and triggers, introduction to NoSQL with MongoDB", duration: "2 Weeks", type: "video" },
          { title: "Major Project 7: Retail Inventory Management System — database design, complex query optimization, real-time data processing, performance analytics dashboard", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Month 6: Machine Learning Fundamentals",
        lectures: [
          { title: "Week 21-22: ML Foundations — introduction to ML, supervised/unsupervised/reinforcement learning, train-test split, cross-validation, model evaluation metrics", duration: "2 Weeks", type: "video" },
          { title: "Week 23-24: Supervised Learning — linear and logistic regression, decision trees, random forest, support vector machines, k-nearest neighbors", duration: "2 Weeks", type: "video" },
          { title: "Major Project 8: Prediction Model — feature engineering, model selection and tuning, performance optimization, deployment pipeline", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Month 7: Advanced Machine Learning",
        lectures: [
          { title: "Week 25-26: Unsupervised Learning — K-Means and hierarchical clustering, Principal Component Analysis (PCA), association rule mining, anomaly detection", duration: "2 Weeks", type: "video" },
          { title: "Week 27-28: Ensemble Methods & Model Optimization — bagging and boosting, XGBoost and LightGBM, hyperparameter tuning, feature selection techniques", duration: "2 Weeks", type: "video" },
          { title: "Major Project 9: Customer Segmentation & Recommendation System — clustering implementation, recommendation algorithms, business strategy development", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Month 8: Deep Learning & Neural Networks",
        lectures: [
          { title: "Week 29-30: Neural Network Fundamentals — perceptrons, multi-layer networks, backpropagation, activation functions/optimizers, TensorFlow & Keras introduction", duration: "2 Weeks", type: "video" },
          { title: "Week 31-32: Deep Learning Applications — Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN/LSTM), transfer learning, model deployment strategies", duration: "2 Weeks", type: "video" },
          { title: "Major Project 10: Image Classification & Sentiment Analysis — CNN for image recognition, RNN for text analysis, model comparison and optimization", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Month 9: Big Data & Cloud Computing",
        lectures: [
          { title: "Week 33-34: Big Data Fundamentals & Apache Spark — the 4 Vs of Big Data, distributed computing, Spark architecture, PySpark (RDDs/DataFrames/Datasets), Spark SQL, data partitioning and optimization", duration: "2 Weeks", type: "video" },
          { title: "Hands-on: Spark environment setup (local & cluster), RDD operations, DataFrame API, performance tuning and memory management", duration: "1 Week", type: "project" },
          { title: "Week 35-36: Cloud Platforms & MLOps Introduction — AWS/GCP/Azure fundamentals, IaaS vs PaaS, Docker, Kubernetes for ML workloads, MLOps principles, model versioning and experiment tracking", duration: "2 Weeks", type: "video" },
          { title: "Major Project 12: Scalable ML Pipeline on Cloud — end-to-end ML pipeline, automated training/evaluation, cloud-based deployment, monitoring/alerting, cost optimization", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Month 10: Model Deployment & Production Systems",
        lectures: [
          { title: "Week 37-38: Model Deployment Strategies — deployment lifecycle, RESTful APIs with Flask and FastAPI, model serialization (Pickle, Joblib, ONNX), containerization, load balancing and scaling, API documentation", duration: "2 Weeks", type: "video" },
          { title: "Hands-on: API Development Workshop — building RESTful ML APIs, request/response handling, input validation, Swagger/OpenAPI documentation", duration: "1 Week", type: "project" },
          { title: "Week 39-40: Production Monitoring & Maintenance — model performance monitoring, data drift/model decay detection, A/B testing, CI/CD, retraining strategies, production troubleshooting", duration: "2 Weeks", type: "video" },
          { title: "DevOps Integration: Git workflows for ML projects, automated testing, GitHub Actions for CI/CD, model registry/version control, rollback and disaster recovery", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 11: Advanced Specializations & Capstone Project",
        lectures: [
          { title: "Week 41-42: Advanced Machine Learning & AI — advanced ensemble techniques, AutoML and Neural Architecture Search, Federated Learning, Explainable AI (XAI), Reinforcement Learning fundamentals", duration: "2 Weeks", type: "video" },
          { title: "Specialized Projects: AutoML pipeline development, Explainable AI dashboard, Reinforcement learning game agent", duration: "1 Week", type: "project" },
          { title: "Major Project 13: Production-Ready ML System — complete MLOps pipeline, automated deployment, real-time monitoring dashboard, A/B testing framework, performance optimization, documentation", duration: "10 hours", type: "project" },
          { title: "Week 43-44: Capstone Project Development — choose E-commerce Recommendation Engine, Financial Risk Management Platform, or Supply Chain Optimization System; planning, implementation, testing and documentation", duration: "2 Weeks", type: "project" }
        ]
      },
      {
        section: "Month 12: Career Preparation & Placement",
        lectures: [
          { title: "Week 45: Portfolio & Resume Building — GitHub portfolio optimization, ATS-friendly resume development, LinkedIn profile enhancement", duration: "1 Week", type: "video" },
          { title: "Week 46: Technical Interview Preparation — coding challenges (DSA, Python, SQL), ML algorithm explanations, statistics & probability, system design basics, mock technical interviews", duration: "1 Week", type: "video" },
          { title: "Week 47: Aptitude, Logical Reasoning & Behavioral Prep — quantitative aptitude, data interpretation, STAR method training, salary negotiation, full mock interview simulations", duration: "1 Week", type: "video" },
          { title: "Week 48: Placement Preparation & Career Launch — industry networking, job portal registration, referral/alumni network building, personality development, final project presentation and certification", duration: "1 Week", type: "video" }
        ]
      }
    ],
    requirements: [
      "Basic knowledge of mathematics",
      "Interest in programming and data analysis",
      "Laptop with minimum 8GB RAM",
      "Commitment to 10-12 hours per week"
    ],
    targetAudience: [
      "Beginners looking to start a career in Data Science",
      "Working professionals wanting to transition to Data Science",
      "Fresh graduates interested in AI and ML",
      "Anyone passionate about Data Science and AI"
    ],
    includes: [
      "150+ hours of video content",
      "13+ major hands-on projects plus weekly mini-projects",
      "Industry-standard tools: Python, SQL, GitHub, Docker, Kubernetes, Spark",
      "Cloud and MLOps training (AWS/GCP/Azure)",
      "Lifetime access to course materials",
      "Recognized diploma certificate",
      "Job assistance and placement support",
      "1-on-1 mentoring sessions",
      "GitHub portfolio and mock interview preparation"
    ],
    reviews: [
      {
        name: "Rahul Kumar",
        rating: 5,
        comment: "Excellent course! The instructors are very knowledgeable and the projects are really practical.",
        date: "2024-11-15"
      },
      {
        name: "Priya Singh",
        rating: 4.5,
        comment: "Great content and good pace. Would have liked more real-world industry examples.",
        date: "2024-11-10"
      }
    ]
  },
  {
    id: 2,
    title: "Diploma in Data Analytics & AI | Get Job-Ready",
    level: "diploma",
    slug: "diploma-in-data-analytics-and-ai",
    category: "data-analytics",
    duration: "12 Months",
    mode: "Hybrid Learning",
    rating: 4.7,
    students: 520,
    price: "₹89,999",
    monthlyPrice: "₹9,000",
    image: "/courseCards/2.webp",
    metaTitle: "Diploma in Data Analytics & AI | Placement Support",
    metaDescription:
      "Earn your Diploma in Data Analytics & AI with hands-on SQL, Python, Power BI and ML projects. Get certification, career support and placement assistance.",
    description:
      "Enroll in our Diploma in Data Analytics & AI to gain industry-ready skills, hands-on projects, certification, and placement support.",
    fullDescription:
      "This comprehensive 12-month diploma program is ideal for aspiring data analysts. Master Excel, SQL, Python, Statistics, Machine Learning and Power BI through hands-on work with real business datasets. Career outcomes include Data Analyst, Business Analyst, and Analytics Consultant roles.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: [
      "Excel Advanced",
      "SQL",
      "Python",
      "Statistics",
      "Machine Learning",
      "Power BI"
    ],
    seoKeywords: [
      "Diploma in Data Analytics & AI",
      "ai for data analytics course",
      "data analysis with ai",
      "ai business analytics",
      "postgraduate diploma in data analytics",
      "business analytics and artificial intelligence",
      "diploma courses in data analytics",
      "diploma in data analytics in delhi"
    ],
    whatYouWillLearn: [
      "Master Excel for advanced analytics",
      "SQL for complex data queries and databases",
      "Python programming for data analysis",
      "Statistical analysis and hypothesis testing",
      "Machine Learning fundamentals and applications",
      "Power BI for business intelligence",
      "Work with real business datasets",
      "Create compelling dashboards and reports",
      "Data cleaning and preprocessing",
      "Business analytics and insights generation"
    ],
    curriculum: [
      {
        section: "Month 1: Data Fundamentals",
        lectures: [
          { title: "Week 1: Introduction to Data & Excel Fundamentals (data types, career paths, Excel interface, rows/columns/worksheets)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Personal Budget Tracker", duration: "1 Week", type: "project" },
          { title: "Week 2: Excel Formulas & Basic Functions (SUM, AVERAGE, COUNT, IF, AND/OR, CONCATENATE, TODAY/DATEDIF, error handling)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Grade Calculator & Employee Timesheet + Assignment: Personal Expense Tracker", duration: "1 Week", type: "project" },
          { title: "Week 3: Data Organization & Basic Analysis (validation, sorting/filtering, conditional formatting, charts, data cleaning)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Sales Data Organization Dashboard", duration: "1 Week", type: "project" },
          { title: "Week 4: Advanced Excel Functions & Pivot Tables (VLOOKUP/HLOOKUP, COUNTIF/SUMIF/AVERAGEIF, Pivot Tables & Charts)", duration: "1 Week", type: "video" },
          { title: "Major Project: Retail Store Performance Analysis + Month 1 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 2: Advanced Excel & Introduction to Business Intelligence",
        lectures: [
          { title: "Week 5: Excel Power Features (advanced Pivot Tables, Power Query, What-If Analysis, Goal Seek/Solver, dashboards)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Monthly Sales Dashboard", duration: "1 Week", type: "project" },
          { title: "Week 6: Introduction to Power BI (BI overview, Power BI Desktop setup, data sources, basic visualizations)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Personal Finance Dashboard in Power BI", duration: "1 Week", type: "project" },
          { title: "Week 7: Power BI Data Modeling Basics (data models, relationships, calculated columns, measures, KPIs)", duration: "1 Week", type: "video" },
          { title: "Mini Project: School Management Dashboard", duration: "1 Week", type: "project" },
          { title: "Week 8: Power BI Visualization & Sharing (advanced visuals, formatting, filters/slicers, publishing & sharing)", duration: "1 Week", type: "video" },
          { title: "Major Project: Company Performance Dashboard + Month 2 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 3: Database Fundamentals & SQL",
        lectures: [
          { title: "Week 9: Introduction to Databases (databases vs spreadsheets, SQL intro, DBMS overview, setup)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Personal Library Database", duration: "1 Week", type: "project" },
          { title: "Week 10: Basic SQL Queries (SELECT, WHERE, ORDER BY, COUNT/SUM/AVG, DISTINCT, NULL handling)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Customer Database Queries", duration: "1 Week", type: "project" },
          { title: "Week 11: Intermediate SQL Operations (GROUP BY/HAVING, JOINs, subqueries, INSERT/UPDATE/DELETE)", duration: "1 Week", type: "video" },
          { title: "Mini Project: E-commerce Order Analysis", duration: "1 Week", type: "project" },
          { title: "Week 12: SQL for Data Analysis (CASE statements, string/date functions, window functions, views)", duration: "1 Week", type: "video" },
          { title: "Major Project: Customer Behavior Analysis with SQL + Month 3 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 4: Introduction to Programming & Python",
        lectures: [
          { title: "Week 13: Programming Fundamentals (Python install/Anaconda, syntax, variables, Jupyter Notebooks)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Simple Calculator in Python", duration: "1 Week", type: "project" },
          { title: "Week 14: Python Data Structures & Control Flow (lists, tuples, dictionaries, sets, loops, functions, file I/O)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Student Management System", duration: "1 Week", type: "project" },
          { title: "Week 15: Introduction to Pandas (Series/DataFrame, loading CSV/Excel, inspection, filtering)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Movie Dataset Exploration", duration: "1 Week", type: "project" },
          { title: "Week 16: Basic Data Analysis with Python (describe, grouping, missing data, Matplotlib basics)", duration: "1 Week", type: "video" },
          { title: "Major Project: City Weather Data Analysis + Month 4 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 5: Data Visualization & Storytelling",
        lectures: [
          { title: "Week 17: Advanced Excel Visualization (chart types, dashboard layouts, interactive charts, sparklines)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Regional Sales Performance Dashboard", duration: "1 Week", type: "project" },
          { title: "Week 18: Data Visualization Principles (effective viz, color theory, chart selection, storytelling)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Before and After Visualization Makeover", duration: "1 Week", type: "project" },
          { title: "Week 19: Python Visualization Libraries (Matplotlib, Seaborn, Plotly, styling & export)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Data Visualization Dashboard", duration: "1 Week", type: "project" },
          { title: "Week 20: Advanced Power BI Techniques (DAX basics, time intelligence, bookmarks, performance optimization)", duration: "1 Week", type: "video" },
          { title: "Major Project: Executive Business Intelligence Dashboard + Month 5 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 6: Statistics & Data Analysis",
        lectures: [
          { title: "Week 21: Statistics Fundamentals (central tendency, variability, distributions, percentiles)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Employee Salary Analysis", duration: "1 Week", type: "project" },
          { title: "Week 22: Exploratory Data Analysis (EDA methodology, patterns, correlation, outlier detection)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Customer Demographics Analysis", duration: "1 Week", type: "project" },
          { title: "Week 23: Introduction to Inferential Statistics (sampling, confidence intervals, hypothesis testing, t-tests, p-values)", duration: "1 Week", type: "video" },
          { title: "Practice Project: A/B Testing Analysis for Marketing", duration: "1 Week", type: "project" },
          { title: "Week 24: Business Statistics Applications (quality control, segmentation, forecasting, risk analysis)", duration: "1 Week", type: "video" },
          { title: "Major Project: Business Performance Statistical Analysis + Month 6 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 7: Advanced Data Analysis Techniques",
        lectures: [
          { title: "Week 25: Advanced Pandas Operations (multi-indexing, advanced grouping, time series, merging)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Multi-source Data Integration", duration: "1 Week", type: "project" },
          { title: "Week 26: Data Cleaning & Preprocessing (data quality framework, missing data, duplicates, validation rules)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Messy Dataset Cleanup Challenge", duration: "1 Week", type: "project" },
          { title: "Week 27: Introduction to Machine Learning Concepts (ML types, supervised vs unsupervised, scikit-learn)", duration: "1 Week", type: "video" },
          { title: "Practice Project: ML Concept Exploration", duration: "1 Week", type: "project" },
          { title: "Week 28: Basic Predictive Modeling (linear & logistic regression, model training/testing, evaluation metrics)", duration: "1 Week", type: "video" },
          { title: "Major Project: Sales Prediction Model + Month 7 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 8: Automation & Efficiency",
        lectures: [
          { title: "Week 29: Excel Automation with Macros (VBA, recording macros, interfaces, automated reports)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Automated Monthly Report Generator", duration: "1 Week", type: "project" },
          { title: "Week 30: Power Query & Data Transformation (advanced Power Query, M language, scheduled refresh)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Multi-source Data Integration Pipeline", duration: "1 Week", type: "project" },
          { title: "Week 31: Python Automation for Data Tasks (file operations, openpyxl, email automation, task scheduling)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Automated Data Processing Pipeline", duration: "1 Week", type: "project" },
          { title: "Week 32: Dashboard Automation & Performance (Power BI service automation, parameterized reports, mobile optimization)", duration: "1 Week", type: "video" },
          { title: "Major Project: Enterprise-Level Automated Dashboard + Month 8 Assessment", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 9: Industry Applications & Case Studies",
        lectures: [
          { title: "Week 33: Retail & E-commerce Analytics (customer segmentation, sales analysis, market basket analysis, CLV)", duration: "1 Week", type: "video" },
          { title: "Week 34: Financial Data Analysis (financial KPIs, budget vs actual, trend analysis, risk assessment)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Company Financial Health Dashboard", duration: "1 Week", type: "project" },
          { title: "Week 35: Marketing Analytics (campaign performance, attribution modeling, CAC, ROI/ROAS)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Marketing Campaign Effectiveness Analysis", duration: "1 Week", type: "project" },
          { title: "Week 36: HR & People Analytics (performance metrics, attrition analysis, recruitment analytics, D&I metrics)", duration: "1 Week", type: "video" },
          { title: "Major Project: Comprehensive HR Analytics Dashboard", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 10: Advanced Machine Learning Applications",
        lectures: [
          { title: "Week 37: Classification Problems (decision trees, random forests, feature importance, imbalanced datasets)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Customer Segmentation with ML", duration: "1 Week", type: "project" },
          { title: "Week 38: Regression & Forecasting (multiple/polynomial regression, time series forecasting, seasonal decomposition)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Demand Forecasting System", duration: "1 Week", type: "project" },
          { title: "Week 39: Clustering & Unsupervised Learning (K-means, hierarchical clustering, PCA, recommendation systems)", duration: "1 Week", type: "video" },
          { title: "Practice Project: Customer Behavior Clustering Analysis", duration: "1 Week", type: "project" },
          { title: "Week 40: Model Deployment Basics (saving/loading models, web interfaces, Excel/Power BI integration, monitoring)", duration: "1 Week", type: "video" },
          { title: "Major Project: End-to-End ML Solution for Business", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 11: Specialization & Advanced Projects",
        lectures: [
          { title: "Week 41: Choose Your Specialization Track", duration: "1 Week", type: "video" },
          { title: "Track A: Business Intelligence Specialist (advanced Power BI, enterprise dashboards, data governance, BI strategy)", duration: "1 Week", type: "video" },
          { title: "Track B: Data Analysis & Reporting Expert (advanced Excel/automation, statistical mastery, stakeholder communication)", duration: "1 Week", type: "video" },
          { title: "Track C: Beginner Data Scientist (advanced Python, more ML algorithms, feature engineering, model selection)", duration: "1 Week", type: "video" },
          { title: "Week 42: Specialization Project Development (deep dive, mentor guidance, advanced project, portfolio enhancement)", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 12: Capstone Project & Career Preparation",
        lectures: [
          { title: "Week 43: Capstone Project Planning (scope definition, data acquisition, technical architecture, timeline)", duration: "1 Week", type: "video" },
          { title: "Week 44: Project Finalization & Presentation (testing & optimization, presentation prep, peer review, portfolio integration)", duration: "1 Week", type: "project" },
          { title: "Week 45: Career Launch & Placement Preparation (resume/LinkedIn optimization, mock interviews, salary negotiation, alumni network)", duration: "1 Week", type: "video" }
        ]
      }
    ],
    requirements: [
      "Basic computer literacy",
      "Interest in data and business analytics",
      "High school level mathematics",
      "8-10 hours per week availability"
    ],
    targetAudience: [
      "Future data analysts",
      "Business professionals wanting to leverage data",
      "Recent graduates looking for analytics careers",
      "Anyone aspiring to become a business analyst"
    ],
    includes: [
      "140+ hours of video content",
      "40+ analytics projects",
      "Industry tools access (Excel, Power BI)",
      "Lifetime course access",
      "Recognized diploma certificate",
      "Career coaching and placement support"
    ],
    reviews: [
      {
        name: "Amit Patel",
        rating: 4.8,
        comment: "Perfect course for aspiring analysts. The business datasets made it very practical.",
        date: "2024-11-08"
      }
    ]
  },
  {
    id: 3,
    title: "Advanced Certification in Data Science & AI Program",
    level: "advanced",
    slug: "advanced-certification-in-data-science-and-ai",
    category: "data-science",
    duration: "6 Months",
    mode: "Hybrid Learning",
    rating: 4.9,
    students: 380,
    price: "₹79,999",
    monthlyPrice: "₹13,333",
    image: "/courseCards/3.webp",
    metaTitle: "Advanced Certification in Data Science & AI | Placement",
    metaDescription:
      "Earn an Advanced Certification in Data Science & AI with hands-on projects, expert mentorship, industry tools, and placement support.",
    description:
      "Earn an Advanced Certification in Data Science & AI. Master ML, deep learning, NLP & generative AI with expert mentors and placement support. Apply now!",
    fullDescription:
      "This intensive 6-month advanced certification is designed for professionals with basic analytics knowledge looking to specialize in Data Science and AI. Deep-dive into advanced Machine Learning, AI model deployment, and sophisticated statistical techniques. Career outcomes include mid-level Data Science and AI roles.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Advanced ML", "AI Deployment", "Statistical Techniques", "Deep Learning", "MLOps"],
    seoKeywords: [
      "Advanced Certification in Data Science & AI",
      "data science certification with placement",
      "AI data science course with certificate",
      "Data Science Certification Course",
      "Data Science and AI Course with Placement"
    ],
    whatYouWillLearn: [
      "Master advanced machine learning algorithms",
      "Deploy AI models to production",
      "Advanced statistical modeling techniques",
      "Deep learning architectures and applications",
      "MLOps best practices and tools",
      "Model optimization and fine-tuning",
      "Scalable ML systems design",
      "Advanced feature engineering",
      "Production-grade AI systems development"
    ],
    curriculum: [
      {
        section: "Foundations & Setup",
        lectures: [
          { title: "Week 1: Welcome to Data Science World — roadmap, career paths, CRISP-DM workflow, real-world DS success stories", duration: "1 Week", type: "video" },
          { title: "Week 2: Essential Tools & Environment Setup — Anaconda, Jupyter, VS Code, Google Colab", duration: "1 Week", type: "video" },
          { title: "Week 3: GitHub Foundation — version control, repository management, GitHub Pages portfolio", duration: "1 Week", type: "video" },
          { title: "Week 4: Excel Foundation — formulas, pivot tables, data validation, macros", duration: "1 Week", type: "video" }
        ]
      },
      {
        section: "Advanced Machine Learning",
        lectures: [
          { title: "Advanced ML Algorithms", duration: "18 hours", type: "video" },
          { title: "Ensemble Methods", duration: "14 hours", type: "video" },
          { title: "Advanced Feature Engineering", duration: "12 hours", type: "video" },
          { title: "Project: Advanced ML Models", duration: "12 hours", type: "project" }
        ]
      },
      {
        section: "Deep Learning & Neural Networks",
        lectures: [
          { title: "Advanced Neural Networks", duration: "16 hours", type: "video" },
          { title: "CNNs and Computer Vision", duration: "14 hours", type: "video" },
          { title: "NLP and Transformers", duration: "14 hours", type: "video" },
          { title: "Project: Deep Learning Application", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Statistical Techniques",
        lectures: [
          { title: "Advanced Statistical Modeling", duration: "14 hours", type: "video" },
          { title: "Bayesian Methods", duration: "12 hours", type: "video" },
          { title: "Time Series Analysis", duration: "10 hours", type: "video" },
          { title: "Project: Statistical Analysis", duration: "8 hours", type: "project" }
        ]
      },
      {
        section: "AI Deployment & MLOps",
        lectures: [
          { title: "Model Deployment Strategies — Flask/FastAPI, model serialization, containerization", duration: "12 hours", type: "video" },
          { title: "MLOps and Production Systems — Docker, Kubernetes, CI/CD", duration: "12 hours", type: "video" },
          { title: "Model Monitoring and Maintenance — data drift detection, A/B testing, retraining", duration: "10 hours", type: "video" },
          { title: "Capstone: Production AI System", duration: "25 hours", type: "project" }
        ]
      }
    ],
    requirements: [
      "Basic knowledge of analytics and programming",
      "Familiarity with Python and ML concepts",
      "Understanding of statistics fundamentals",
      "10+ hours per week commitment"
    ],
    targetAudience: [
      "Analytics professionals seeking specialization",
      "Data analysts transitioning to data science",
      "Junior data scientists looking to advance",
      "Professionals with basic ML knowledge"
    ],
    includes: [
      "100+ hours of advanced video content",
      "30+ advanced projects",
      "Access to GPU compute resources",
      "Lifetime access to updated materials",
      "Advanced certificate",
      "Industry network and mentoring"
    ],
    reviews: [
      {
        name: "Sneha Kapoor",
        rating: 5,
        comment: "Best advanced course for moving to mid-level DS roles. The deployment section was invaluable.",
        date: "2024-11-12"
      }
    ]
  },
  {
    id: 4,
    title: "Advanced Certification in Data Analytics & AI",
    level: "advanced",
    slug: "advanced-certification-in-data-analytics-and-ai",
    category: "data-analytics",
    duration: "6 Months",
    mode: "Hybrid Learning",
    rating: 4.8,
    students: 290,
    price: "₹69,999",
    monthlyPrice: "₹11,666",
    image: "/courseCards/4.webp",
    metaTitle: "Advanced Certification in Data Analytics & AI | Placement",
    metaDescription:
      "Earn an Advanced Certification in Data Analytics & AI. Master Power BI, SQL, Python and generative AI with expert mentors and placement support. Apply now!",
    description:
      "For upskillers in analytics. Gain advanced expertise in data modeling, ML applications, dashboards and BI tools.",
    fullDescription:
      "This advanced 6-month certification is perfect for analytics professionals looking to upskill. Gain advanced expertise in data modeling, Machine Learning applications, advanced dashboards, and BI tools. Career outcomes include Senior Data Analyst and Analytics Consultant roles.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Data Modeling", "ML Applications", "Advanced Dashboards", "BI Tools", "Advanced Analytics"],
    seoKeywords: [
      "advanced certification in data analytics",
      "certification in data analytics",
      "business analytics certification",
      "data analyst certification for beginners",
      "data analyst certification course",
      "certification courses for data analytics"
    ],
    whatYouWillLearn: [
      "Master advanced data modeling techniques",
      "Apply Machine Learning to analytics problems",
      "Create advanced interactive dashboards",
      "Expert-level BI tools proficiency",
      "Advanced analytics methodologies",
      "Predictive analytics and forecasting",
      "Complex data architecture design",
      "Business intelligence strategy",
      "Advanced reporting and visualization"
    ],
    curriculum: [
      {
        section: "Month 1: Foundation of Data Analytics",
        lectures: [
          { title: "Week 1: Data Analytics Fundamentals (types/applications, Analyst vs Scientist vs BA, analytics life cycle, structured vs unstructured data, intro to BI)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Excel Interface, Cell References, SUM/AVERAGE/COUNT/MIN/MAX, Sales Data Analysis", duration: "1 Week", type: "project" },
          { title: "Week 2: Excel Formulas & Functions (IF/AND/OR/NOT, CONCATENATE/LEFT/RIGHT/MID, Date & Time, IFERROR/ISERROR)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Nested IFs, COUNTIF/SUMIF/AVERAGEIF, Data Validation, Employee Performance Analysis", duration: "1 Week", type: "project" },
          { title: "Week 3: Data Management in Excel (sorting/filtering, conditional formatting, data tables, pivot table fundamentals)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Monthly Sales Performance Dashboard", duration: "1 Week", type: "project" },
          { title: "Week 4: Advanced Excel & Power Query (VLOOKUP/HLOOKUP/XLOOKUP, INDEX-MATCH, array formulas, Power Query intro)", duration: "1 Week", type: "video" },
          { title: "Major Project: Retail Chain Performance Analysis", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 2: Power BI & Data Visualization",
        lectures: [
          { title: "Week 5: Power BI Fundamentals (ecosystem overview, desktop architecture, data sources, data model concepts)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Power BI navigation, multi-source import, Power Query, basic visualizations", duration: "1 Week", type: "project" },
          { title: "Week 6: Data Modeling & Relationships (star vs snowflake schema, relationships, intro to DAX)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Calculated columns vs measures, basic DAX functions, interactive dashboards", duration: "1 Week", type: "project" },
          { title: "Week 7: Advanced Power BI & DAX (SUM/AVERAGE/COUNT, YTD/MTD/QTD, filter & row context, DAX best practices)", duration: "1 Week", type: "video" },
          { title: "Mini Project: HR Analytics Dashboard (complex DAX, time-based analysis, treemap/waterfall/funnel visuals)", duration: "1 Week", type: "project" },
          { title: "Week 8: Data Storytelling & Advanced Visualizations (storytelling principles, color theory, dashboard best practices)", duration: "1 Week", type: "video" },
          { title: "Major Project: Executive Sales Performance Dashboard (custom visuals, slicers/bookmarks/drill-through, mobile design)", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 3: SQL for Data Analysis",
        lectures: [
          { title: "Week 9: SQL Fundamentals (RDBMS, SQL syntax, database design, data types/constraints)", duration: "1 Week", type: "video" },
          { title: "Hands-on: MySQL/PostgreSQL setup, SELECT/WHERE/ORDER BY, E-commerce Database Queries", duration: "1 Week", type: "project" },
          { title: "Week 10: Intermediate SQL Operations (COUNT/SUM/AVG/MIN/MAX, GROUP BY/HAVING, JOINs, UNION/UNION ALL)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Customer Order Analysis (complex aggregations, multi-table joins, data cleaning with SQL)", duration: "1 Week", type: "project" },
          { title: "Week 11: Advanced SQL Techniques (subqueries, CTEs, window functions, CASE statements)", duration: "1 Week", type: "video" },
          { title: "Major Project: Banking Transaction Analysis (complex subqueries, window functions, string/date manipulation)", duration: "1 Week", type: "project" },
          { title: "Week 12: SQL Optimization & Real-world Applications (query optimization, indexing, performance tuning, SQL in BI)", duration: "1 Week", type: "video" },
          { title: "Capstone SQL Project: Multi-dimensional Business Analysis (views, stored procedures, Power BI integration)", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 4: Python for Data Analysis",
        lectures: [
          { title: "Week 13: Python Programming Fundamentals (installation, syntax, variables/operators, functions/modules)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Jupyter setup, lists/dictionaries/tuples/sets, file I/O, data processing scripts", duration: "1 Week", type: "project" },
          { title: "Week 14: NumPy & Pandas Foundations (NumPy arrays, broadcasting, DataFrame structure, data loading/saving)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Student Grade Analysis (array manipulations, DataFrame indexing, data filtering, cleaning)", duration: "1 Week", type: "project" },
          { title: "Week 15: Advanced Pandas Operations (GroupBy, pivot tables, merging/joining, aggregation techniques)", duration: "1 Week", type: "video" },
          { title: "Major Project: E-commerce Customer Segmentation (complex manipulations, multi-level indexing, transformation)", duration: "1 Week", type: "project" },
          { title: "Week 16: Data Visualization with Python (Matplotlib, Seaborn, Plotly, visualization best practices)", duration: "1 Week", type: "video" },
          { title: "Portfolio Project: COVID-19 Data Analysis Dashboard", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 5: Statistics & Advanced Analytics",
        lectures: [
          { title: "Week 17: Exploratory Data Analysis (EDA workflow, descriptive statistics, distributions, correlation vs causation)", duration: "1 Week", type: "video" },
          { title: "Mini Project: Housing Market Analysis (comprehensive EDA, outlier detection, missing value analysis)", duration: "1 Week", type: "project" },
          { title: "Week 18: Statistical Analysis & Hypothesis Testing (inferential stats, hypothesis testing, t-tests, chi-square, p-values)", duration: "1 Week", type: "video" },
          { title: "Week 19: Data Preprocessing & Feature Engineering (data quality, missing data, outlier treatment, feature scaling)", duration: "1 Week", type: "video" },
          { title: "Capstone Prep: Comprehensive Data Preprocessing (advanced cleaning, feature creation/selection, transformation pipeline)", duration: "1 Week", type: "project" },
          { title: "Week 20: Machine Learning Basics & Predictive Analytics (intro to ML, supervised vs unsupervised, regression/classification, evaluation metrics)", duration: "1 Week", type: "video" }
        ]
      },
      {
        section: "Month 6: Capstone Projects & Career Preparation",
        lectures: [
          { title: "Week 21: Industry Case Studies & Domain Expertise (healthcare, finance, retail, HR analytics — choose 1 domain project)", duration: "1 Week", type: "video" },
          { title: "Week 22: End-to-End Capstone Project - Week 1 (data collection, cleaning in Python, SQL database design, Power BI dashboard)", duration: "1 Week", type: "project" },
          { title: "Week 23: End-to-End Capstone Project - Week 2 (advanced analytics implementation, dashboard optimization, documentation, performance testing)", duration: "1 Week", type: "project" },
          { title: "Week 24: Portfolio Finalization & Placement Preparation (GitHub portfolio, LinkedIn, resume, mock interviews, capstone presentation, final assessments)", duration: "1 Week", type: "video" }
        ]
      }
    ],
    requirements: [
      "Prior experience in data analytics",
      "Proficiency in SQL and basic BI tools",
      "Understanding of analytics fundamentals",
      "10+ hours per week commitment"
    ],
    targetAudience: [
      "Data analysts looking to advance",
      "BI professionals seeking expertise",
      "Analytics team leads",
      "Professionals aiming for consultant roles"
    ],
    includes: [
      "90+ hours of advanced video content",
      "25+ advanced analytics projects",
      "Access to premium BI tools",
      "Lifetime access to materials",
      "Advanced certificate",
      "Career advancement support"
    ],
    reviews: [
      {
        name: "Rohit Sharma",
        rating: 4.8,
        comment: "Perfect for upskilling to senior roles. The ML applications section was game-changing.",
        date: "2024-11-18"
      }
    ]
  },
  {
    id: 5,
    title: "Certification in Data Analytics & AI",
    level: "certificate",
    slug: "certification-in-data-analytics-and-ai",
    category: "data-analytics",
    duration: "3 Months",
    mode: "Hybrid Learning",
    rating: 4.6,
    students: 680,
    price: "₹49,999",
    monthlyPrice: "₹16,666",
    image: "/courseCards/5.webp",
    metaTitle: "Data Analytics & AI Certification | Get Job-Ready",
    metaDescription:
      "Get certified in Data Analytics & AI with hands-on training in Power BI, SQL, Python and generative AI. Learn from expert mentors with placement support.",
    description:
      "Intensive fundamentals course. Cover Excel, SQL, Python basics, data visualization and statistical analysis.",
    fullDescription:
      "This intensive 3-month certification covers all the fundamentals needed to start your analytics career. Master Excel, SQL, Python basics, data visualization, and statistical analysis. Perfect for achieving entry-level Analyst positions or internship readiness.",
    instructor: {
      name: "Dr. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Excel", "SQL", "Python Basics", "Data Visualization", "Statistical Analysis"],
    seoKeywords: [
      "Certification in Data Analytics & AI",
      "Data Analytics & AI Course with Placement",
      "Data Analytics & AI Course in Delhi",
      "Data Analytics certification Course with Internship",
      "Data Analytics Certification Course"
    ],
    whatYouWillLearn: [
      "Master Excel for data analysis and reporting",
      "SQL fundamentals for database querying",
      "Python basics for analytics tasks",
      "Create effective data visualizations",
      "Perform statistical analysis",
      "Data cleaning and preparation",
      "Basic analytics methodologies",
      "Dashboard creation fundamentals",
      "Reporting and presentation skills"
    ],
    curriculum: [
      {
        section: "Month 1: Data & Excel Foundations",
        lectures: [
          { title: "Week 1: Data Analytics Fundamentals (landscape, Data Analyst role, structured vs unstructured data, analytics lifecycle, Excel mastery)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Excel navigation & advanced formatting, data validation, dynamic reports with named ranges", duration: "1 Week", type: "project" },
          { title: "Week 2: Advanced Excel Functions & Logic (IF/IFS/AND/OR, COUNTIF/SUMIFS/AVERAGEIFS, IFERROR/ISERROR, text functions)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Nested IF statements, multi-criteria analysis, data cleaning with text functions", duration: "1 Week", type: "project" },
          { title: "Week 3: Lookup Functions & Data Relationships (VLOOKUP vs XLOOKUP, INDEX-MATCH, error handling, dynamic lookups)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Employee database with lookups, product inventory system, cross-referencing data sources", duration: "1 Week", type: "project" },
          { title: "Week 4: Pivot Tables & Power Query Introduction (pivot architecture, grouping/filtering, Power Query ETL, transformation concepts)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Multi-dimensional pivot analysis, dynamic pivot charts/slicers, data cleaning workflows", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 2: Business Intelligence & Analytics",
        lectures: [
          { title: "Week 5: Power BI Fundamentals & Data Modeling (BI concepts, Power BI ecosystem, data modeling, star vs snowflake schema)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Power BI Desktop setup, multi-source connections, basic visualizations & reports", duration: "1 Week", type: "project" },
          { title: "Week 6: Advanced Power BI & DAX (DAX fundamentals, calculated columns vs measures, time intelligence, advanced DAX patterns)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Complex calculated measures, time-based analysis, advanced visualizations (custom charts, maps)", duration: "1 Week", type: "project" },
          { title: "Week 7: SQL & Database Fundamentals (relational databases, SQL syntax, normalization, keys & constraints)", duration: "1 Week", type: "video" },
          { title: "Hands-on: MySQL setup, schema & table creation, SELECT/filtering, sorting and limiting results", duration: "1 Week", type: "project" },
          { title: "Week 8: Advanced SQL & Data Manipulation (JOIN operations, subqueries, window functions)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Complex multi-table joins, GROUP BY aggregations, window functions for ranking", duration: "1 Week", type: "project" }
        ]
      },
      {
        section: "Month 3: Python Analytics & Career Preparation",
        lectures: [
          { title: "Week 9: Python Fundamentals & Pandas (syntax, data structures, NumPy arrays, Pandas architecture)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Anaconda/Jupyter setup, data loading & exploration, cleaning techniques, Netflix dataset analysis", duration: "1 Week", type: "project" },
          { title: "Week 10: Advanced Python & Statistical Analysis (EDA methodology, correlation & hypothesis testing, statistical significance)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Advanced Pandas (groupby/pivot/merge), SciPy statistical analysis, Matplotlib & Seaborn visualization", duration: "1 Week", type: "project" },
          { title: "Week 11: Data Visualization & Storytelling (storytelling principles, chart selection, interactive visualization)", duration: "1 Week", type: "video" },
          { title: "Hands-on: Advanced Matplotlib/Seaborn, interactive Plotly visualizations, compelling data narratives", duration: "1 Week", type: "project" },
          { title: "Week 12: Capstone Project & Career Preparation — choose: E-commerce Analytics Suite, Healthcare Data Analytics, or Financial Risk Assessment", duration: "1 Week", type: "project" },
          { title: "Career Preparation: ATS-friendly resume building, LinkedIn optimization, technical & behavioral interview practice", duration: "1 Week", type: "video" }
        ]
      }
    ],
    requirements: [
      "Basic computer skills",
      "Interest in data analysis",
      "No prior programming experience required",
      "6-8 hours per week commitment"
    ],
    targetAudience: [
      "Complete beginners to analytics",
      "Career switchers",
      "Students seeking internships",
      "Professionals wanting analytics skills"
    ],
    includes: [
      "60+ hours of video content",
      "15+ practical projects",
      "Downloadable resources",
      "Certificate of completion",
      "Entry-level job readiness",
      "Career guidance sessions"
    ],
    reviews: [
      {
        name: "Neha Gupta",
        rating: 4.6,
        comment: "Great intensive course for beginners. Got me ready for my first analyst internship!",
        date: "2024-11-20"
      }
    ]
  },
  {
    id: 6,
    title: "Applied Data Analytics with Python & SQL",
    level: "certificate",
    slug: "applied-data-analytics-with-python-and-sql",
    category: "data-analytics",
    duration: "3 Months",
    mode: "Hybrid Learning",
    rating: 4.7,
    students: 540,
    price: "₹39,999",
    monthlyPrice: "₹13,333",
    image: "/courseCards/6.webp",
    metaTitle: "Applied Data Analytics with Python & SQL | Certification",
    metaDescription:
      "Master Applied Data Analytics with Python and SQL using real datasets, dashboards and hands-on projects. Expert mentors and placement support.",
    description:
      "Focused training on Python data libraries and SQL querying. Analyze and visualize data to derive insights.",
    fullDescription:
      "This focused 3-month program provides intensive training on Python data libraries and advanced SQL querying techniques. Learn to analyze and visualize data effectively to derive actionable business insights. Career outcomes include Data Analyst and BI Reporting roles.",
    instructor: {
      name: "Dr. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Python", "SQL", "Pandas", "NumPy", "Data Analysis", "Data Visualization"],
    seoKeywords: [
      "Applied Data Analytics with Python & SQL",
      "Python for Data Analytics",
      "SQL for Data Analytics",
      "Libraries: Pandas, NumPy",
      "Data Analytics Course with Placement",
      "Applied Data Analytics"
    ],
    whatYouWillLearn: [
      "Master Python for data analysis",
      "Advanced SQL querying and optimization",
      "Pandas library for data manipulation",
      "NumPy for numerical computing",
      "Data cleaning and preprocessing",
      "Statistical analysis with Python",
      "Data visualization techniques",
      "Derive actionable business insights",
      "Real-world data analysis projects"
    ],
    curriculum: [
      {
        section: "Python & SQL Fundamentals",
        lectures: [
          { title: "Python for Data Analysis", duration: "12 hours", type: "video" },
          { title: "Advanced SQL Querying", duration: "12 hours", type: "video" },
          { title: "Database Operations", duration: "8 hours", type: "video" },
          { title: "Project: SQL Data Analysis", duration: "8 hours", type: "project" }
        ]
      },
      {
        section: "Data Analysis with Python",
        lectures: [
          { title: "Pandas for Data Manipulation", duration: "10 hours", type: "video" },
          { title: "NumPy Fundamentals", duration: "8 hours", type: "video" },
          { title: "Data Cleaning Techniques", duration: "8 hours", type: "video" },
          { title: "Project: Data Analysis Pipeline", duration: "8 hours", type: "project" }
        ]
      },
      {
        section: "Visualization & Insights",
        lectures: [
          { title: "Data Visualization with Python", duration: "10 hours", type: "video" },
          { title: "Statistical Analysis", duration: "8 hours", type: "video" },
          { title: "Deriving Business Insights", duration: "8 hours", type: "video" },
          { title: "Final Project: Business Analytics", duration: "12 hours", type: "project" }
        ]
      }
    ],
    requirements: [
      "Basic programming knowledge helpful",
      "Interest in data analysis",
      "Computer with internet connection",
      "6-8 hours per week commitment"
    ],
    targetAudience: [
      "Aspiring data analysts",
      "Professionals wanting Python/SQL skills",
      "Business analysts looking to upskill",
      "Anyone interested in data-driven roles"
    ],
    includes: [
      "60+ hours of focused training",
      "12+ hands-on projects",
      "Python and SQL resources",
      "Certificate of completion",
      "Job readiness for analyst roles",
      "Portfolio development support"
    ],
    reviews: [
      {
        name: "Vikram Singh",
        rating: 4.7,
        comment: "Excellent focused course on Python and SQL. Got a BI analyst role right after!",
        date: "2024-11-14"
      }
    ]
  },
  {
    id: 7,
    title: "Business Intelligence with Power BI",
    level: "certificate",
    slug: "business-intelligence-with-power-bi",
    category: "data-analytics",
    duration: "3 Months",
    mode: "Hybrid Learning",
    rating: 4.8,
    students: 720,
    price: "₹29,999",
    monthlyPrice: "₹10,000",
    image: "/courseCards/7.webp",
    metaTitle: "Business Intelligence with Power BI | Placement Support",
    metaDescription:
      "Join our Power BI course and master Business Intelligence with real dashboards, DAX, data modeling, and placement support. Enroll today!",
    description:
      "Become a Power BI expert. Learn data modeling, DAX formulas and interactive dashboard design.",
    fullDescription:
      "This comprehensive 3-month program is designed to make you a Power BI expert. Master data modeling, DAX formulas, and create stunning interactive dashboards. Career outcomes include BI Developer and Data Visualization Specialist roles.",
    instructor: {
      name: "Dr. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Power BI", "DAX", "Data Modeling", "Interactive Dashboards", "BI Reporting"],
    seoKeywords: [
      "power bi online",
      "power bi dashboard",
      "power bi web",
      "power bi tool",
      "power business intelligence",
      "power bi and tableau",
      "msft power bi",
      "power bi course",
      "power bi certification",
      "business intelligence course",
      "microsoft power bi",
      "power bi training",
      "business intelligence with power bi",
      "power bi course with placement",
      "power bi certification course",
      "power bi data analyst",
      "power bi dashboard",
      "business intelligence training",
      "power bi online course",
      "advanced power bi course",
      "professional power bi certification",
      "power bi developer",
      "data visualization course",
      "power bi training institute",
      "power bi course fees",
      "job oriented power bi course",
      "business intelligence certification",
      "power bi dashboard training",
      "power bi analytics course",
      "power bi and business analytics"
    ],
    whatYouWillLearn: [
      "Master Power BI Desktop and Service",
      "Advanced data modeling techniques",
      "DAX formulas and calculations",
      "Create interactive visualizations",
      "Dashboard design best practices",
      "Power Query for data transformation",
      "Row-level security implementation",
      "Publishing and sharing reports",
      "Real-time dashboard development"
    ],
    curriculum: [
      {
        section: "Power BI Fundamentals",
        lectures: [
          { title: "Power BI Desktop Basics", duration: "10 hours", type: "video" },
          { title: "Data Import and Transformation", duration: "10 hours", type: "video" },
          { title: "Power Query Mastery", duration: "8 hours", type: "video" },
          { title: "Project: Basic BI Report", duration: "8 hours", type: "project" }
        ]
      },
      {
        section: "Data Modeling & DAX",
        lectures: [
          { title: "Data Modeling in Power BI", duration: "12 hours", type: "video" },
          { title: "DAX Formulas and Functions", duration: "12 hours", type: "video" },
          { title: "Advanced DAX Patterns", duration: "10 hours", type: "video" },
          { title: "Project: Complex Data Model", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Dashboard Design & Deployment",
        lectures: [
          { title: "Interactive Dashboard Design", duration: "10 hours", type: "video" },
          { title: "Visualization Best Practices", duration: "8 hours", type: "video" },
          { title: "Publishing and Sharing", duration: "8 hours", type: "video" },
          { title: "Final Project: Professional Dashboard", duration: "12 hours", type: "project" }
        ]
      }
    ],
    requirements: [
      "Basic understanding of data concepts",
      "Familiarity with Excel helpful",
      "Windows computer for Power BI Desktop",
      "6-8 hours per week commitment"
    ],
    targetAudience: [
      "Aspiring BI developers",
      "Data analysts wanting Power BI skills",
      "Business professionals needing BI tools",
      "Visualization specialists"
    ],
    includes: [
      "60+ hours of expert training",
      "15+ Power BI projects",
      "DAX formula reference guide",
      "Certificate of completion",
      "Power BI portfolio development",
      "Career guidance for BI roles"
    ],
    reviews: [
      {
        name: "Anjali Mehta",
        rating: 4.8,
        comment: "Best Power BI course! The DAX section was incredibly detailed. Got a BI Developer role!",
        date: "2024-11-16"
      }
    ]
  },
  {
    id: 8,
    title: "Data Science for Product Managers",
    level: "certificate",
    slug: "data-science-for-product-managers",
    category: "data-science",
    duration: "3 Months",
    mode: "Hybrid Learning",
    rating: 4.6,
    students: 410,
    price: "₹34,999",
    monthlyPrice: "₹11,666",
    image: "/courseCards/8.webp",
    metaTitle: "Data Science for Product Managers | Placement Support",
    metaDescription:
      "Master Data Science for Product Managers with real-world case studies, AI-driven insights, expert mentorship, and placement support.",
    description:
      "Analytics for PMs. Learn to use data in product decisions, run A/B tests, track KPIs, and interpret user data.",
    fullDescription:
      "This specialized 3-month course is designed for product managers to leverage data effectively. Learn to use data in product decisions, run A/B tests, track KPIs, and interpret user data for better product outcomes. Career outcome: Product Manager with strong data analytics skills.",
    instructor: {
      name: "Dr. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Product Analytics", "A/B Testing", "KPIs", "User Data", "Data-Driven Decisions"],
    seoKeywords: [
      "Data Science Product Management Course",
      "certified product manager",
      "Product Management Course",
      "Data Science for Product Managers",
      "A/B Testing for Product Managers",
      "Machine Learning for Product Managers",
      "AI and Data Science for Product Managers"
    ],
    whatYouWillLearn: [
      "Use data effectively in product decisions",
      "Design and run A/B tests",
      "Track and analyze product KPIs",
      "Interpret user behavior data",
      "Make data-driven product decisions",
      "Product metrics and measurement",
      "Analytics tools for product managers",
      "User segmentation and cohort analysis",
      "Data storytelling for stakeholders"
    ],
    curriculum: [
      {
        section: "Product Analytics Fundamentals",
        lectures: [
          { title: "Introduction to Product Analytics", duration: "8 hours", type: "video" },
          { title: "Product Metrics and KPIs", duration: "8 hours", type: "video" },
          { title: "Analytics Tools for PMs", duration: "6 hours", type: "video" },
          { title: "Project: Product Metrics Dashboard", duration: "6 hours", type: "project" }
        ]
      },
      {
        section: "A/B Testing & Experimentation",
        lectures: [
          { title: "A/B Testing Fundamentals", duration: "8 hours", type: "video" },
          { title: "Designing Product Experiments", duration: "8 hours", type: "video" },
          { title: "Analyzing Test Results", duration: "6 hours", type: "video" },
          { title: "Project: A/B Test Implementation", duration: "6 hours", type: "project" }
        ]
      },
      {
        section: "User Data & Decision Making",
        lectures: [
          { title: "User Behavior Analysis", duration: "8 hours", type: "video" },
          { title: "Cohort and Segmentation Analysis", duration: "6 hours", type: "video" },
          { title: "Data-Driven Decision Making", duration: "6 hours", type: "video" },
          { title: "Final Project: Product Strategy with Data", duration: "10 hours", type: "project" }
        ]
      }
    ],
    requirements: [
      "Basic understanding of product management",
      "Interest in data-driven decision making",
      "No coding experience required",
      "6-8 hours per week commitment"
    ],
    targetAudience: [
      "Product managers wanting data skills",
      "Aspiring product leaders",
      "Business analysts moving to PM roles",
      "Startup founders and entrepreneurs"
    ],
    includes: [
      "50+ hours of video content",
      "10+ hands-on projects",
      "Product analytics templates",
      "Certificate of completion",
      "PM analytics toolkit",
      "Access to alumni community"
    ],
    reviews: [
      {
        name: "Karan Malhotra",
        rating: 4.7,
        comment: "Very practical course for PMs. The A/B testing section was incredibly useful!",
        date: "2024-11-12"
      }
    ]
  },
  {
    id: 9,
    title: "Advanced Data Visualization",
    level: "advanced",
    slug: "advanced-data-visualization",
    category: "data-analytics",
    duration: "3 Months",
    mode: "Hybrid Learning",
    rating: 4.9,
    students: 350,
    price: "₹44,999",
    monthlyPrice: "₹14,999",
    image: "/courseCards/9.webp",
    metaTitle: "Advanced Data Visualization | Certification & Placement",
    metaDescription:
      "Learn Advanced Data Visualization with Power BI and Tableau. Build interactive dashboards, storytelling visuals and real-world projects with placement support.",
    description:
      "Elevate your storytelling. Master Tableau and Power BI advanced techniques to present data clearly and persuasively.",
    fullDescription:
      "This advanced 3-month program elevates your data storytelling capabilities. Master advanced techniques in Tableau and Power BI to present data clearly, persuasively, and with maximum impact. Career outcomes include Data Visualization Engineer and Analytics Consultant roles.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor, Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Tableau Advanced", "Power BI Advanced", "Data Storytelling", "Design Principles", "Visual Analytics"],
    seoKeywords: [
      "advanced data visualization",
      "data visualization tools",
      "Data Visualization Course",
      "Data Visualization Certification",
      "Data Visualization with Power BI",
      "Data Visualization with Tableau",
      "Power BI and Tableau Course",
      "Data Visualization Course with Placement"
    ],
    whatYouWillLearn: [
      "Master advanced Tableau techniques",
      "Advanced Power BI visualization methods",
      "Data storytelling and narrative design",
      "Visual design principles for data",
      "Create persuasive data presentations",
      "Interactive visualization development",
      "Dashboard UX/UI best practices",
      "Advanced analytics visualization",
      "Professional portfolio development"
    ],
    curriculum: [
      {
        section: "Advanced Tableau",
        lectures: [
          { title: "Tableau Advanced Calculations", duration: "10 hours", type: "video" },
          { title: "Complex Dashboard Design", duration: "10 hours", type: "video" },
          { title: "Tableau Server and Publishing", duration: "8 hours", type: "video" },
          { title: "Project: Advanced Tableau Dashboard", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Advanced Power BI",
        lectures: [
          { title: "Power BI Advanced Features", duration: "10 hours", type: "video" },
          { title: "Custom Visuals and Extensions", duration: "8 hours", type: "video" },
          { title: "Advanced DAX for Visualization", duration: "8 hours", type: "video" },
          { title: "Project: Power BI Masterpiece", duration: "10 hours", type: "project" }
        ]
      },
      {
        section: "Data Storytelling & Design",
        lectures: [
          { title: "Data Storytelling Principles", duration: "10 hours", type: "video" },
          { title: "Visual Design for Data", duration: "8 hours", type: "video" },
          { title: "Persuasive Data Presentations", duration: "8 hours", type: "video" },
          { title: "Final Project: Data Story Portfolio", duration: "12 hours", type: "project" }
        ]
      }
    ],
    requirements: [
      "Experience with Tableau or Power BI",
      "Understanding of data analysis concepts",
      "Portfolio of basic visualizations",
      "8-10 hours per week commitment"
    ],
    targetAudience: [
      "Data visualization professionals",
      "BI developers seeking mastery",
      "Analytics consultants",
      "Data storytellers and communicators"
    ],
    includes: [
      "60+ hours of advanced training",
      "15+ visualization projects",
      "Design templates and resources",
      "Advanced certificate",
      "Professional portfolio review",
      "Career support for specialist roles"
    ],
    reviews: [
      {
        name: "Priya Desai",
        rating: 4.9,
        comment: "Absolutely the best visualization course! Transformed my career as a viz specialist.",
        date: "2024-11-18"
      }
    ]
  },
  {
    id: 10,
    title: "Degree Program in Artificial Intelligence",
    level: "degree",
    slug: "degree-program-in-ai",
    category: "artificial-intelligence",
    duration: "3 Years",
    mode: "Hybrid Learning",
    rating: 4.9,
    students: 1200,
    price: "Contact for Fees",
    monthlyPrice: "",
    image: "/courseCards/1.webp",
    description:
      "Earn a UGC-approved university degree (DU SOL or Amity Online) combined with 300+ hours of NIDADS AI specialization. Weekly trips, annual expeditions, and social impact projects included.",
    fullDescription:
      "A 3-year undergraduate degree program in Artificial Intelligence combining a UGC-approved university degree with an exclusive NIDADS AI specialization. Choose DU SOL or Amity University Online as your degree institution. 6 semesters covering Python, ML, Deep Learning, NLP, MLOps, and a full industry internship.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor, AI & Data Science",
      bio: "PhD in AI with 15+ years of industry experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "15+ Years Experience"]
    },
    topics: ["Python", "Machine Learning", "Deep Learning", "NLP", "MLOps", "Cloud AI"],
    whatYouWillLearn: [
      "Master Python and mathematics for AI",
      "Build supervised and unsupervised ML models",
      "Design and train deep neural networks",
      "Develop NLP and computer vision applications",
      "Deploy AI models with MLOps best practices",
      "Complete a real industry internship"
    ],
    curriculum: [
      { section: "Foundations of AI & Computing", lectures: [{ title: "Python Programming Foundations", duration: "30 hours" }, { title: "Mathematics for AI", duration: "25 hours" }] },
      { section: "Data Structures & Statistics", lectures: [{ title: "Data Structures & Algorithms", duration: "28 hours" }, { title: "Statistics for ML", duration: "22 hours" }] },
      { section: "Machine Learning Foundations", lectures: [{ title: "Supervised Learning", duration: "30 hours" }, { title: "Unsupervised Learning", duration: "20 hours" }] },
      { section: "Deep Learning, Vision & NLP", lectures: [{ title: "Neural Networks", duration: "32 hours" }, { title: "Computer Vision", duration: "24 hours" }, { title: "NLP", duration: "24 hours" }] },
      { section: "Advanced AI & Cloud", lectures: [{ title: "MLOps & Deployment", duration: "28 hours" }, { title: "Cloud AI Platforms", duration: "22 hours" }] },
      { section: "Capstone & Internship", lectures: [{ title: "AI Product Capstone", duration: "60 hours" }, { title: "Industry Internship", duration: "8 weeks" }] }
    ],
    requirements: ["10+2 or equivalent", "Basic computer literacy", "Commitment to 3 years"],
    targetAudience: ["School leavers starting a career in AI", "Working professionals seeking a degree", "Anyone passionate about Artificial Intelligence"],
    includes: [
      "UGC-approved university degree (DU SOL or Amity)",
      "300+ hours of NIDADS AI specialization",
      "Weekly learning trips",
      "Annual out-of-station business expedition",
      "Social impact projects",
      "Student club memberships",
      "Industry internship",
      "Placement support"
    ],
    reviews: [
      { name: "Arjun Sharma", rating: 5, comment: "Best decision of my career. Placed at Microsoft India before I even graduated.", date: "2024-12-01" },
      { name: "Priya Gupta", rating: 5, comment: "The annual Bangalore trip and club activities added incredible value beyond just academics.", date: "2024-11-15" }
    ]
  },
  {
    id: 11,
    title: "Post Graduation Program in Artificial Intelligence",
    level: "post-graduation",
    slug: "pg-program-in-ai",
    category: "artificial-intelligence",
    duration: "2 Years",
    mode: "Hybrid Learning",
    rating: 4.9,
    students: 600,
    price: "Contact for Fees",
    monthlyPrice: "",
    image: "/courseCards/2.webp",
    description:
      "Advance from practitioner to expert. A 2-year postgraduate AI degree from DU SOL or Amity Online with advanced NIDADS curriculum covering GenAI, LLMs, and a publishable research thesis.",
    fullDescription:
      "A 2-year postgraduate program in Artificial Intelligence combining a UGC-approved master's degree with NIDADS' advanced AI curriculum. 4 semesters covering advanced ML, Generative AI, LLMs, Reinforcement Learning, and a publishable research thesis or industry dissertation.",
    instructor: {
      name: "Miss. Shagun",
      title: "PG Program Director, AI Research",
      bio: "PhD in AI with 15+ years of industry and research experience",
      image: "/shagun.png",
      credentials: ["PhD in AI", "Published Researcher", "15+ Years Experience"]
    },
    topics: ["Advanced ML", "Generative AI", "LLMs", "Computer Vision", "Reinforcement Learning", "Research Methods"],
    whatYouWillLearn: [
      "Master advanced machine learning algorithms",
      "Build and fine-tune Large Language Models",
      "Develop Generative AI systems for production",
      "Apply Reinforcement Learning to real problems",
      "Conduct publishable AI research",
      "Lead AI teams and projects"
    ],
    curriculum: [
      { section: "Advanced Foundations & Research Methods", lectures: [{ title: "Advanced Python & Statistical Modelling", duration: "30 hours" }, { title: "Research Methodology", duration: "20 hours" }] },
      { section: "Deep Learning, Vision & Language", lectures: [{ title: "Advanced Deep Learning", duration: "32 hours" }, { title: "NLP & LLMs", duration: "30 hours" }, { title: "Responsible AI", duration: "16 hours" }] },
      { section: "Generative AI & Edge AI", lectures: [{ title: "Generative AI & Prompt Engineering", duration: "30 hours" }, { title: "Reinforcement Learning", duration: "24 hours" }, { title: "Edge AI & TinyML", duration: "20 hours" }] },
      { section: "Research Thesis & Career Launch", lectures: [{ title: "Research Thesis / Industry Dissertation", duration: "120 hours" }, { title: "AI Entrepreneurship", duration: "16 hours" }] }
    ],
    requirements: ["Bachelor's degree in any discipline", "Basic programming knowledge preferred", "Commitment to 2 years"],
    targetAudience: ["Graduates looking to specialise in AI at PG level", "Working professionals wanting a master's degree", "Researchers entering the AI field"],
    includes: [
      "UGC-approved PG degree (DU SOL or Amity)",
      "Advanced NIDADS AI curriculum",
      "Research thesis supervision",
      "Weekly research excursions",
      "Annual AI industry expedition",
      "AI-for-Good social projects",
      "PG club memberships",
      "Senior placement support"
    ],
    reviews: [
      { name: "Vikram Nair", rating: 5, comment: "My thesis became the foundation of my AI startup. NIDADS gave me depth, not just breadth.", date: "2024-12-05" },
      { name: "Sneha Rao", rating: 5, comment: "The Bangalore expedition led to a direct interview call. I joined the company before graduating.", date: "2024-11-20" }
    ]
  }
];

export function getCourseById(id) {
  return courses.find(course => course.id === parseInt(id));
}

export function getCourseBySlug(slug) {
  return courses.find(course => course.slug === slug);
}
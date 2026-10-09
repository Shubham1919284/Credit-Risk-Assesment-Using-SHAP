# 🛡️ CreditGuard — Smart Credit Risk Assessment

### Understand Loan Default Risk Before Making a Lending Decision

<p align="center">
  <strong>An explainable Machine Learning project that estimates the likelihood of a borrower defaulting on a loan.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12-blue?logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Machine%20Learning-XGBoost-orange" alt="Machine Learning">
  <img src="https://img.shields.io/badge/Explainable%20AI-SHAP-purple" alt="Explainable AI">
  <img src="https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Interface-HTML%20%7C%20CSS%20%7C%20JavaScript-yellow" alt="Frontend">
</p>

---

## 📌 About the Project

**CreditGuard** is a Machine Learning-based application designed to help users understand the potential risk associated with a loan applicant.

Before lending money, banks and financial institutions need to assess whether a borrower is likely to repay the loan or might fail to make repayments.

Traditionally, this assessment involves reviewing financial information, employment history, loan details, and credit history.

CreditGuard uses these types of information to estimate a borrower's probability of default using a trained Machine Learning model.

The application provides a simple interface where users can enter applicant details and receive a risk assessment without needing to understand Machine Learning or write code.

### 💡 The idea in simple words

Imagine a bank receives a loan application.

The bank wants to understand:

- Does the applicant have a high or low estimated risk of default?
- How does the model classify the applicant?
- What probability of default does the model estimate?
- How can Machine Learning support the assessment process?

CreditGuard demonstrates how data and Machine Learning can help answer these questions.

> **Important:** CreditGuard is an educational and experimental project. Its predictions are estimates, not guarantees, and should not be used as the sole basis for real lending decisions.

---

## ✨ Key Features

| Feature | What it does |
|---|---|
| 🤖 Machine Learning prediction | Estimates the probability of loan default using a trained XGBoost-based model. |
| 📊 Risk assessment | Classifies an application as higher or lower risk according to a configurable decision threshold. |
| 🧠 Explainable AI | Uses SHAP analysis to help investigate how input features influence model predictions. |
| 🖥️ User-friendly interface | Lets users enter information through a web form instead of writing code. |
| ⚡ FastAPI backend | Receives applicant information, processes the request, and returns the prediction. |
| 📱 Responsive design | Uses a web interface designed to work across different screen sizes. |
| 🧮 Automatic ratio calculation | Calculates the loan-to-income ratio from the loan amount and annual income in the interface. |
| 🔍 Credit-related inputs | Considers financial details, employment information, loan characteristics, and credit history. |

---

## 🖥️ How the Application Works

The application follows a simple process:

**Enter applicant details → Process the information → Run the ML model → Estimate risk → Display the result**

### The workflow

1. **Enter the details:** Provide the applicant's financial, employment, loan, and credit history information.
2. **Prepare the data:** The backend arranges the submitted values into the format expected by the trained model.
3. **Run the prediction:** The trained model estimates the probability of default.
4. **Apply the decision threshold:** The estimated probability is compared with the threshold saved with the model.
5. **View the result:** The interface displays the estimated risk and the model's classification.

The user does not need to perform these steps manually. The application handles them behind the scenes.

---

## 🧾 What Information Does CreditGuard Use?

The application uses the following 11 input features.

| Input | Simple explanation |
|---|---|
| **Age** | The applicant's age in years. |
| **Annual Income** | The applicant's reported yearly income. |
| **Home Ownership** | Whether the applicant owns, rents, or otherwise occupies their home under the available categories. |
| **Employment Length** | How long the applicant has been employed, measured in years. |
| **Loan Intent** | The purpose of the loan, such as education, medical expenses, or personal needs. |
| **Loan Grade** | The loan's assigned risk grade, represented by a letter such as A, B, or C. |
| **Loan Amount** | The amount of money the applicant wants to borrow. |
| **Interest Rate** | The annual interest rate associated with the loan. |
| **Loan-to-Income Ratio** | The loan amount divided by annual income. |
| **Previous Default History** | Whether the available credit history records a previous default. |
| **Credit History Length** | The number of years represented by the applicant's credit history. |

### What is the loan-to-income ratio?

This ratio compares the requested loan amount with the applicant's annual income.

**Example:**

Suppose an applicant earns ₹5,00,000 annually and requests a loan of ₹1,00,000.

Loan-to-income ratio = ₹1,00,000 ÷ ₹5,00,000 = **0.20, or 20%**

This means the requested loan amount equals 20% of the applicant's annual income.

The ratio is calculated automatically by the interface when the required values are entered.

**Note:** Loan grade is an input to the model. CreditGuard does not independently assign a lender's official loan grade.

---

## 📈 Understanding the Prediction

CreditGuard produces a probability estimate and a classification based on the configured decision threshold.

### Estimated default probability

This is the model's estimated probability that the applicant belongs to the loan-default class.

For example, a model output of 0.20 corresponds to a 20% estimated probability.

This is a model estimate, not a guarantee that the applicant will or will not repay the loan.

### Decision threshold

The threshold is the value used to convert the probability estimate into a classification.

For example, if the threshold were 0.50:

- A probability of 0.70 would be classified as the positive class.
- A probability of 0.20 would be classified as the negative class.

**CreditGuard uses the threshold stored in `best_threshold.pkl`, so the actual threshold may be different from this example.**

### Risk classification

The interface presents the result as higher or lower repayment risk. These labels describe the model's classification, not a definitive judgment about an individual.

A lower-risk classification does not guarantee repayment, and a higher-risk classification does not mean default is certain.

---

## 🧠 Explainable AI with SHAP

Many Machine Learning models can produce predictions without making their reasoning easy to understand.

This creates an important question:

**How can we investigate what influenced a model's prediction?**

CreditGuard's project analysis uses **SHAP (SHapley Additive exPlanations)** to help interpret model behavior.

SHAP is a technique that estimates how individual input features contribute to a prediction.

For example, the analysis can help investigate the influence of features such as:

- Annual income
- Loan amount
- Interest rate
- Employment length
- Previous default history
- Credit history length

### Why is SHAP useful?

- **Interpretability:** Helps examine how features influence model output.
- **Transparency:** Provides a structured way to investigate model behavior.
- **Model analysis:** Helps identify which features have greater influence across predictions.
- **Debugging:** Can reveal unexpected patterns that deserve further investigation.

SHAP explanations describe the behavior of the model. They do not establish that a feature causes a borrower to default.

> **Implementation note:** SHAP analysis is part of the project's explainability workflow. Live, per-applicant SHAP explanations are not claimed as an application feature unless they are explicitly implemented in the running backend.

---

## 🏗️ Project Architecture

The project separates the user interface, prediction API, and trained model artifacts.

```text
User
 │
 ▼
Web Interface
HTML + CSS + JavaScript
 │
 ▼
FastAPI Backend
 │
 ▼
Input Preparation
 │
 ▼
Trained ML Pipeline
Preprocessing + XGBoost-based Model
 │
 ▼
Probability Prediction
 │
 ▼
Saved Decision Threshold
 │
 ▼
Risk Classification
 │
 ▼
Result Displayed to User
```

SHAP analysis supports model interpretation during the model-analysis workflow.

### Main components

- **Frontend:** Collects user input and displays results.
- **FastAPI:** Receives requests and runs the prediction workflow.
- **Preprocessing pipeline:** Handles numerical and categorical features in the format expected by the model.
- **Trained model:** Estimates the probability of default.
- **Decision threshold:** Converts the estimated probability into a classification.
- **SHAP:** Supports the interpretation and analysis of model behavior.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Python | Main programming language |
| Pandas | Organizing and processing data |
| NumPy | Numerical operations |
| Scikit-learn | Preprocessing, model evaluation, and machine learning utilities |
| XGBoost | Core gradient-boosted tree model |
| SHAP | Model explainability and feature contribution analysis |
| Joblib | Saving and loading trained model artifacts |
| FastAPI | Backend API |
| Uvicorn | Running the FastAPI application |
| HTML | Web page structure |
| CSS | Visual design and layout |
| JavaScript | Form interactions and API communication |
| Jupyter Notebook | Model experimentation and analysis |

---

## 📂 Project Structure

```text
Credit-Risk-Assesment-Using-SHAP/
│
├── main.py
│
├── credit_risk_model.pkl
├── best_threshold.pkl
│
├── requirements.txt
├── runtime.txt
├── render.yaml
│
├── Credit_Risk.ipynb
├── credit_risk_dataset.csv
│
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

### What are these files?

| File | Purpose |
|---|---|
| `main.py` | Runs the backend API and connects the submitted data to the prediction model. |
| `credit_risk_model.pkl` | Stores the trained model or model pipeline used for predictions. |
| `best_threshold.pkl` | Stores the decision threshold used to classify predictions. |
| `requirements.txt` | Lists the Python packages required by the application. |
| `runtime.txt` | Specifies a Python runtime version if supported by the deployment platform. |
| `render.yaml` | Contains deployment configuration for Render, if configured for the project. |
| `Credit_Risk.ipynb` | Notebook for model development, experimentation, and analysis. |
| `credit_risk_dataset.csv` | Dataset used for model development, if included in the repository. |
| `static/index.html` | Defines the web interface. |
| `static/style.css` | Controls the interface's appearance. |
| `static/script.js` | Handles client-side calculations, form interactions, and API requests. |

---

## 🚀 Run CreditGuard on Your Computer

You can run the project locally without needing to understand the underlying Machine Learning code.

### Prerequisites

Install the following:

- Python compatible with the project's dependencies
- Git, if you want to clone the repository
- A web browser

### Step 1: Download the project

Clone the repository:

```bash
git clone https://github.com/Shubham1919284/Credit-Risk-Assesment-Using-SHAP.git
```

Move into the project directory:

```bash
cd Credit-Risk-Assesment-Using-SHAP
```

Alternatively, download the repository as a ZIP file from GitHub and extract it.

### Step 2: Create a virtual environment

A virtual environment keeps the project's Python packages separate from other projects.

**Windows:**

```bash
python -m venv .venv
```

Activate it in Command Prompt:

```bash
.venv\Scripts\activate
```

In PowerShell, use:

```powershell
.\.venv\Scripts\Activate.ps1
```

### Step 3: Install dependencies

Run:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

If installation fails, check the Python and package versions supported by the project. The saved model may require compatible versions of XGBoost and other libraries.

### Step 4: Start the application

Run:

```bash
uvicorn main:app --reload
```

Wait until the terminal confirms that the application has started successfully.

### Step 5: Open CreditGuard

Open the following address in your browser:

**http://127.0.0.1:8000**

You should see the web interface.

You can also access the automatically generated API documentation at:

**http://127.0.0.1:8000/docs**

### Troubleshooting

**The application cannot find a model file**

Check that `credit_risk_model.pkl` and `best_threshold.pkl` are present in the expected project directory.

**The model fails to load**

Check the Python, XGBoost, scikit-learn, and serialization-library versions. A model saved with incompatible versions may not load correctly.

**The page opens but the design is missing**

Check that the `static` directory contains `index.html`, `style.css`, and `script.js`, and verify that the backend serves the static assets from the expected paths.

**The prediction request fails**

Check the terminal for backend errors and confirm that the submitted field names and data types match the API's requirements.

---

## 🔬 Machine Learning Workflow

Credit risk assessment involves more than training a model. A typical workflow includes the following stages.

1. **Problem definition:** Define the objective as estimating loan-default risk.
2. **Data preparation:** Organize applicant information and identify numerical and categorical features.
3. **Preprocessing:** Handle missing numerical values and transform categorical inputs into a model-compatible representation.
4. **Model training:** Train and tune an XGBoost-based classifier.
5. **Probability calibration:** Apply probability calibration as part of the model pipeline.
6. **Threshold selection:** Use a saved threshold to convert probability estimates into classifications.
7. **Model interpretation:** Use SHAP analysis to investigate feature contributions.
8. **Application integration:** Load the saved artifacts into the FastAPI backend.
9. **Prediction:** Accept user input and return a risk estimate and classification.

The exact quality of the final model must be established through appropriate evaluation on data that was not used to fit or select the model.

---

## 📊 Model Evaluation

Model evaluation is important because a prediction system should be assessed on how well it performs, not simply on whether it runs.

Useful evaluation measures for a loan-default classifier include:

| Metric | What it tells us |
|---|---|
| Precision | Of the applicants classified as potential defaulters, how many actually defaulted in the evaluation data? |
| Recall | Of the applicants who actually defaulted, how many did the model identify? |
| F1-score | Combines precision and recall into a single measure. |
| ROC-AUC | Measures how well the model ranks positive cases above negative cases across different thresholds. |
| Average Precision | Summarizes precision-recall performance across thresholds, especially useful when the classes are imbalanced. |
| Confusion Matrix | Shows correct and incorrect classifications for both classes. |

**No performance score is advertised here.** Actual results should be added after confirming the final model's evaluation metrics, test methodology, and decision threshold.

A model can have a high overall accuracy and still miss many actual defaulters when default cases are relatively rare. This is why several metrics should be examined together.

---

## 🌍 Real-World Applications

The techniques demonstrated in this project can be relevant to:

- Loan risk assessment research
- Financial analytics
- Credit-risk modeling experiments
- Explainable Machine Learning
- Risk-model prototyping
- Educational demonstrations of automated decision-support systems

The project illustrates how a prediction model can be integrated into a web application so that users can interact with it through a familiar interface.

---

## ⚠️ Limitations and Responsible Use

CreditGuard is a prototype for learning and demonstration, not a production-ready financial decision system.

- **Predictions are estimates:** The model cannot guarantee whether a person will repay a loan.
- **Training data matters:** Results depend on the quality, representativeness, and limitations of the data used to develop the model.
- **Bias is possible:** Historical financial data may contain patterns that lead to unfair outcomes.
- **Thresholds involve trade-offs:** Changing the decision threshold changes the balance between false positives and false negatives.
- **Explainability has limits:** SHAP describes model behavior but does not prove causation or fairness.
- **Real-world validation is required:** A financial institution would need rigorous testing, monitoring, security, privacy controls, and compliance reviews before using a model in real lending decisions.
- **User inputs must be accurate:** Incorrect or unrealistic information can produce misleading estimates.

Do not use this project alone to approve or reject loans, judge an individual's financial reliability, or make consequential financial decisions.

---

## 🔐 Data Privacy

When experimenting with the application:

- Use synthetic or appropriately anonymized applicant information.
- Do not enter real people's sensitive financial details into a publicly accessible deployment.
- Avoid committing private datasets, credentials, or personal information to GitHub.
- Review the deployment configuration before exposing the API publicly.

A public repository does not automatically make a running application secure or private.

---

## 🔮 Future Improvements

Potential enhancements include:

- [ ] Display a visual explanation of the prediction using SHAP.
- [ ] Add interactive charts for feature contributions.
- [ ] Report model evaluation metrics and a confusion matrix.
- [ ] Add automated input validation and clearer error messages.
- [ ] Improve probability calibration and threshold selection using a dedicated validation set.
- [ ] Evaluate performance across relevant applicant groups for potential bias.
- [ ] Add automated tests for API requests and model predictions.
- [ ] Add logging and monitoring suitable for a controlled deployment.
- [ ] Improve accessibility and usability for non-technical users.

These are possible improvements, not claims that all of them are already implemented.

---

## 👨‍💻 About the Developer

**Shubham Kumar Jha**

B.Tech graduate in Computer Science and Engineering, specializing in Data Science.

I am interested in Machine Learning, Data Science, model evaluation, and building practical applications that make data-driven tools easier to use.

This project reflects my interest in combining Machine Learning with explainability and a simple web interface.

- **GitHub:** [Shubham1919284](https://github.com/Shubham1919284)
- **Portfolio:** [View my portfolio](https://shubham1919284.github.io/Portfolio/)
- **Project Repository:** [Credit Risk Assessment Using SHAP](https://github.com/Shubham1919284/Credit-Risk-Assesment-Using-SHAP)

---

## ⭐ Support the Project

If you find this project useful for learning about credit risk assessment, Machine Learning, or Explainable AI:

- ⭐ Star the repository on GitHub.
- 🍴 Fork it to experiment with your own improvements.
- 💬 Share constructive feedback or suggestions.

Every improvement helps make the project more useful and understandable.

---

<p align="center">
  <strong>CreditGuard — Making Machine Learning-based credit risk assessment easier to understand.</strong>
</p>

<p align="center">
  Built with Python, XGBoost, SHAP, and FastAPI.
</p>

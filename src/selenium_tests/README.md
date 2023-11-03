# UI Test Suite with Python Selenium

This repository contains a UI test suite built with Python Selenium for automated testing of a web application. These tests are designed to ensure the functionality and reliability of your web application.

## Prerequisites

Before you can run the tests, make sure you have the following prerequisites installed on your system:

- **Python 3.9**: You need to have Python 3.9 or a higher version installed on your machine. You can download Python from the official website: [Python Downloads](https://www.python.org/downloads/).

## Setup

1. **Clone the Repository**: Start by cloning this repository to your local machine using the following command:

```
git clone https://github.com/GVR-Secure-Solutions/lekkalu-frontend.git
```

2. **Create a Virtual Environment**: It is recommended to create a virtual environment to isolate your project's dependencies. Navigate to the project directory and run:

```
python -m venv venv
```

This will create a virtual environment named `venv` in your project directory.

3. **Activate the Virtual Environment**: Activate the virtual environment by running the appropriate command for your operating system:

- On Windows:

  ```
  venv\Scripts\activate
  ```

- On macOS and Linux:

  ```
  source venv/bin/activate
  ```

4. **Install Dependencies**: Once the virtual environment is activated, install the required dependencies by running:

  ```
  pip install -r requirements.txt
  ```

This will create a virtual environment named `venv` in your project directory.


## Running Tests

The tests are set up to run automatically each time there's a push to the branch. However, you can also run the tests manually using the following command:

```
python main.py
```
This command will execute the UI test suite and provide you with test results.


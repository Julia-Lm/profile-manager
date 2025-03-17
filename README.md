# Profile Manager

## React, TypeScript, Zustand, React Query, React Hook Form, MUI


## Installation

Clone the repository:

```bash
git clone https://github.com/Julia-Lm/profile-manager.git
```

Install dependencies:
```bash
npm install
 ```

##  Running the Project

To start the development server, run:

```bash
npm  run dev
 ```

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser with disable-web-security


## Running with Docker

### 1. Build the Docker image

First, build the Docker image by running the following command in the root directory of the project:
```bash
docker build -t profile-manager-app .
 ```

### 2. Run the Docker container

Once the image is built, you can run the Docker container by executing:
```bash
docker run -d -p 8080:80 profile-manager-app
 ```

This command will run the container in detached mode (-d), mapping port 80 inside the container to port 8080 on your local machine. You can now access the app in your browser by going to http://localhost:8080.
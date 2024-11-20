# E-Commerce-Full-Stack

An implementation of the E-Commerce Web Application Template using Vue3 with Composition API, TypeScript, Express, PostgreSQL and MongoDB.

## Introduction

---
- This project is my second web application.

## Features

---

## Project Structure

- You may check the documentation in the root folder for further information. English version would be slowly updated due to my high academic load...
- 
---

## Installation

---
### Prerequisites

- **Docker** : Use the latest version.
- You May have basic knowledge on TCP/IP, Port Mapping, and Docker CLI.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/csning1998/e-commerce-full-stack.git
   cd e-commerce-full-stack
   ```

2. **Project Setup**

    ```sh
    docker compose up
    ```

3. **In case you need to hot-install some Node packages, you have to find the container ID.**

   ```sh
    docker ps
    ```

4. **Then you can execute the following command to enter the container**
    
   ```sh
    docker exec -it {target-node-container-id} sh
    ```
   
    If the indicator of the terminal turns to `/app #` or similar, you can install the packages using `npm install {package-name}`.

## Usage

---
1. **Open the Game**

   Navigate to `http://127.0.0.1:8080/index.html` in your web browser.

2. **Select Difficulty**

   Choose a difficulty level from the home page:

    - **Easy**
    - **Hard**
    - **Asian**

3. **Play the Game**

   Use the left and right arrow keys to move the paddle and prevent the ball from falling off the screen. Break all the bricks to win the game.

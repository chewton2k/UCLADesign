# UCLA Design

![Image](https://github.com/user-attachments/assets/4af81b32-51c6-4a72-88a4-3ea38cebf67f)

Our project focuses on developing a tool that allows users to design and customize their room layout to align with their preferences and style. Transitioning into a new dorm room presents challenges, particularly for freshmen or individuals unfamiliar with their new environment. Properly planning a room layout and understanding the necessary items can significantly ease this transition.

The tool provides an interactive web app where users can visualize their room setup by rearranging furniture and decorations virtually. In addition to aiding with spatial planning, the tool generates a checklist of recommended items tailored to the specific layout and room dimensions. This functionality reduces the anxiety associated with moving into a new space, enabling users to prepare better and optimize their environment. By integrating these features, the project seeks to enhance the overall moving experience, ensuring it is both efficient and personalized.



# Technologies Used

This is a full-stack web application project built with a **React frontend** and a **Node.js/Express backend** using MongoDB as the database. This project also uses tools like **tailwindcss/vite** and **concurrently** to run the full project. 
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite)

# Features

1. Checklist of What to Bring
This feature generates a comprehensive, customizable checklist tailored to the specific room layout and furniture selected by the user. It ensures that individuals know exactly what items they need, from essentials like bedding and kitchenware to optional decor items. The checklist could be dynamically updated as users make adjustments to their room design, reflecting changes in required items.
2. Database of Common Room Designs
The database will include a curated collection of popular room layouts and designs based on real-world examples from UCLA dorms and other comparable spaces. Each design will come with a breakdown of default furniture placement of decor and furniture.
3. Reviews of Common Room Designs
Users will have the ability to review and provide feedback on existing room designs in the database. Reviews can highlight the pros and cons of specific layouts, such as their practicality, comfort, or aesthetic appeal. This feature also allows new users to browse highly-rated designs and make more informed choices when selecting a template. Additionally, users could filter room designs based on reviews or specific keywords.
4. Search for Room Design
A search function will enable users to quickly find room designs that match their preferences. Users can filter and sort designs based on criteria such as room size, furniture type, budget, or aesthetic themes.
5. Users Are Allowed to Create Their Own Items
This feature empowers users to define custom items within the room design tool. Users can specify details like the dimensions and function of an item. These custom items can then be saved and integrated into their room designs for future use.
6. Allow Users to Sign In
Implementing a sign-in system will allow users to save their designs, preferences, and checklists across sessions. 
7. Prices for Dorms
Our project will include a database of UCLA dorm rooms with associated pricing information. Users can compare dorm options based on their budget and see how each layout aligns with their design preferences. 


## Installing the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chewton2k/UCLADesign
   cd UCLADesign
   ```

2. **Install dependencies**:

   Root Directory:
   ```bash
   npm install
   ```

   For the frontend:

   ```bash
   cd frontend
   npm install
   ```

   For the backend:

   ```bash
   cd ../backend
   npm install
   ```

3. **.env** file:
   create an .env file in the root directory and copy over the following contents: 

   ```
   MONGO_URI=mongodb+srv://owenrfn:NW112ns@dormdesign.ud8dx.mongodb.net/genDorm?retryWrites=true&w=majority&appName=dormdesign
   PORT=5001
   ```


# Running the Project

Frontend: 
   ```bash
   npm run start:frontend 
   ```

Backend:
   ```bash
   npm run start:backend
   ```

Run the whole project:
   ```bash
   npm start
   ```

# Authors: 

UCLADesign was made as a project for CS 35L taught by Professor Paul Eggert at UCLA in Winter 2025. Made by: Charlton Shih, Tommy Yu, Alex De La Cueva Tamanaha, Owen Fan, Fiona Zhang.

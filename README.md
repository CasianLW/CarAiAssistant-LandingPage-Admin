### CarAIAssistant

![gif](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3JkYWc2d2VqMGFueDFpbjltY3J3cGJzaDh0eHpoOHF5aTE2dWJqNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/taVCVuunNzQjBKTrYn/giphy.gif)

Simple Landing Page with Contact Form

### Description

This project demonstrates a simple landing page built with Next.js featuring a contact form. The form submissions are handled through NodeMailer, which allows users to send emails directly from the webpage. This setup is ideal for small businesses or individual portfolios to maintain direct contact with their audience.

### Technologies Used

- **Next.js**: A React framework for building server-side rendering and static web applications.
- **NodeMailer**: A module for Node.js applications to allow easy email sending.
- **TailwindCss**: Fast Styling package.
- **easyqrcodejs**: Easy qr code handling.

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

- Node.js
- npm or yarn

#### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CasianLW/CarAiAssistant-LandingPage-Admin.git
   cd yourproject
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   - Copy the `.env.example` file to `.env` and fill variables

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Usage

The main functionality of this project revolves around the contact form. Users can fill out their information and message, then submit it. The server-side API receives this data and uses NodeMailer to send an email to a specified recipient.

### Modifying the Contact Form

To adjust the fields of the contact form:

1. Navigate to `components/ContactForm.component.tsx`
2. Modify the state variables to include or remove form fields as necessary.
3. Update the NodeMailer setup in `pages/api/contact-form/index.tsx` to handle the new form data.

### Deployment

To deploy this project on a live system, consider using Vercel, the creators of Next.js, which provides optimized hosting for Next.js applications. Alternatively, you can use other hosting providers like Netlify or even traditional cloud servers like AWS or DigitalOcean.

1. **Vercel Deployment**

   - Sign up/log in to Vercel (https://vercel.com).
   - Connect your GitHub repository and follow the steps to deploy.

2. **Netlify Deployment**
   - Sign up/log in to Netlify (https://netlify.com).
   - Connect your repository and set build commands as:
     ```plaintext
     Build command: npm run build or yarn build
     Publish directory: out
     ```
   - Deploy your site.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

This project is open-sourced under the MIT license.

### Contact

casian.fr

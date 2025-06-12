# ☁️ CloudFileManager

**CloudFileManager** is a modern, cloud-based file management web app that allows users to securely upload, organize, and manage their files. Built with **Next.js 14**, **Context API**, and **AWS S3**, it offers a fast and intuitive experience with real-time file and folder management.

---

## 🌐 Live Demo

[🔗 View Live Demo: https://your-cloudfilemanager.vercel.app](https://cloud-file-manager-omega.vercel.app/)

---

## ✨ Features

- Google Sign-In via NextAuth.js
- Create and manage nested folders
- Upload files to AWS S3 using UploadThing
- View storage usage by file type (Images, Videos, Docs, Others)
- Mark files as important with a star
- Trash and recover deleted files
- Global state management using React Context API
- Search files by name


---

## 🧰 Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Context API
- React Hook Form

### Backend & Services
- Firebase Firestore (Database)
- Firebase Auth
- NextAuth.js (Authentication)
- UploadThing (File Uploads)
- AWS S3 (Cloud Storage)

### Hosting
- Vercel

---

## 🖼️ Screenshots

## 🌐 Environment Variables

Create a `.env.local` file in the root directory of your project and add the following:

```env
# Google OAuth for authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# UploadThing configuration
UPLOADTHING_APP_ID=your_uploadthing_app_id
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_TOKEN=your_uploadthing_token

# NextAuth secret
NEXTAUTH_SECRET=your_nextauth_secret

Clone the Repository
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
Install Dependencies
npm install
# or
yarn install
Run the Development Server
npm run dev
# or
yarn dev

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the issues page.

---

## 📄 License

This project is licensed under the MIT License.

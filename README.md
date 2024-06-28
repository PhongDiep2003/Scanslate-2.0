# ScanSlate (Only for IOS)

A mobile app developed for the CMPE 133 group project. allows users to capture a picture of an object and label it using TensorFlow's MobileNet image classification, and then translate that label into one of the many languages that users selected when creating their account. The app includes a quiz mode feature-based flashcard meant to help users learn and reinforce their memory. Aside from that, the app also offers some basic flashcard management features such as removing and viewing flashcards.

## Installation (Only for Mac user)
- **To run our application successfully, users will need to have Node.js (npm) and Expo installed on their computer. The installation steps should be in the following order:**

  1. [Install Node.js](https://nodejs.org/en) (Make sure you follow the instructions to get Node.js installed properly)
  2. [Install Expo](https://docs.expo.dev/bare/installing-expo-modules/#automatic-installation)
  3. [Go to ScanSlate’s repository](https://github.com/Luceium/Scanslate-2.0/tree/main)
  4. Clone the repo to your laptop/computer, run:
      ```bash
        git clone <HTTPS>
      ```
  5. Open your preferred code editor (prefer Visual Studio Code) and go to the folder where you've cloned the ScanSlate repo
  6. At the top-level folder, run
     ```bash
        npx expo install
     ```
     to install all the applications' dependencies

  7. On your phone (IOS), go to AppStore and install “Expo Go”
  8. At the top-level folder, create a .env file and place 
     ```bash
        API_FIREBASE_KEY=AIzaSyBDeNWU7kd7WaN2dSZfIZcrMKXHHSeZbuE
        API_TRANSLATION_KEY=80b8dcb7bcmshd1d71ec98c1a4f8p15e688jsn4a5be83f4daf
     ```
     inside the file
  9. At the top-level folder, run
     ```bash
        npx expo start
     ```
  10. After running the command, you should be able to see the QR code in the terminal
  11. Scan the QR code with your phone's camera, then click on the link that shows in your camera view while scanning the QR code
  12. If all of the instructions are followed correctly, it should automatically send you to "Expo Go" and launch the application from there. The application can then be used and tested.
## Project Demo Video
  https://youtu.be/_nH4vMwoBMY
 

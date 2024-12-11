// import { useState } from 'react';

// export interface AlertMessageProps {
//   type: 'error' | 'success';
//   message: string;
// }

// const useAlert = (initialState: AlertMessageProps | null = null) => {
//   const [alertMessage, setAlertMessage] = useState<AlertMessageProps | null>(
//     initialState
//   );
//   const [isFadingOut, setIsFadingOut] = useState(false);
//   const [isShaking, setIsShaking] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const triggerAlert = (message: AlertMessageProps) => {
//     setAlertMessage(message);
//     if (message.type === 'error') setIsShaking(true);
//     if (message.type === 'success') setSuccess(true);

//     setTimeout(() => setAlertMessage(null), 3000);
//     if (message.type === 'error') setTimeout(() => setIsShaking(false), 1000);

//     const fadeOutTimer = setTimeout(() => setIsFadingOut(true), 3000);
//     const resetTimer = setTimeout(() => {
//       setIsFadingOut(false);
//       setSuccess(false);
//     }, 4000);

//     return () => {
//       clearTimeout(fadeOutTimer);
//       clearTimeout(resetTimer);
//     };
//   };

//   return {
//     alertMessage,
//     isFadingOut,
//     isShaking,
//     triggerAlert,
//     success,
//   };
// };

// export default useAlert;

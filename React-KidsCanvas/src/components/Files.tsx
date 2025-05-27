// // const Files=()=>{

// //     fetch(`http://localhost:5000/api/download/presigned-url?fileName=myFile.jpg`)
// //     .then(res => res.json())
// //     .then(data => {
// //         window.open(data.url, "_blank");
// //     });

// const Files = () => {
//     const downloadFile = async (fileName: any) => {
//         try {
//             const response = await fetch(`http://localhost:7001/api/upload/download-url?fileName=${fileName}`);
//             const data = await response.json();
//             if (data.url) {
//                 window.open(data.url, "_blank"); // פתיחת הקובץ להורדה בחלון חדש
//             } else {
//                 alert("שגיאה בהורדת הקובץ");
//             }
//         } catch (error) {
//             console.error("שגיאה בהורדה:", error);
//         }
//     };

//     return (
//       <></>
//     );
// };

// export default Files;
import React from 'react';

const Files = () => {

  const downloadFile = async (fileName: string) => {
    try {
      const response = await fetch(`http://localhost:7001/api/upload/download-url?fileName=${fileName}`);
      const data = await response.json();
      if (data.url) {
        window.open(data.url, "_blank"); // פתיחת הקובץ להורדה בחלון חדש
      } else {
        alert("שגיאה בהורדת הקובץ");
      }
    } catch (error) {
      console.error("שגיאה בהורדה:", error);
    }
  };

  return (
    <div>
    </div>
  );

}
export default Files;
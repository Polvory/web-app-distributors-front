import React, { useRef, useState } from "react";

function CameraCapture() {
  const videoRef = useRef(null); // Ссылка на элемент <video>
  const canvasRef = useRef(null); // Ссылка на элемент <canvas>
  const [photo, setPhoto] = useState(null); // Состояние для фото

  // Включаем камеру при нажатии
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Ошибка доступа к камере: ", err);
    }
  };

  // Делаем снимок и сохраняем его
  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Получаем данные изображения в формате Blob и создаем объект URL
    canvas.toBlob((blob) => {
      const file = new File([blob], "photo.png", { type: "image/png" });
      setPhoto(URL.createObjectURL(file)); // Отображаем фото
    });
  };

  return (
    <div>
      <button onClick={startCamera}>Включить камеру</button>
      <video
        ref={videoRef}
        style={{ display: photo ? "none" : "block" }}
        autoPlay
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {photo && (
        <div>
          <img
            src={photo}
            alt="Фото"
            style={{ width: "200px", height: "auto" }}
          />
          <input type="file" value={photo} style={{ display: "none" }} />
        </div>
      )}

      <button onClick={takePhoto}>Сделать снимок</button>
    </div>
  );
}

export default CameraCapture;

import { useEffect, useState } from "react";

import { getQuestionImage } from "../../api/question.api";

export default function QuestionImage({ imageName }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      const response = await getQuestionImage(imageName);
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImage(url);
    };
    if (imageName) {
      getImage();
    }
  }, [imageName]);

  return (
    <div className="w-full h-1/3 flex flex-col items-center justify-center">
      <div className="w-5/6 h-full flex flex-row bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        {image && <img src={image} alt="Question" className="w-full h-full" />}
      </div>
    </div>
  );
}

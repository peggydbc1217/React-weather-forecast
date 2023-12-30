import { useEffect, useState } from "react";

//Used to lazy load background images
const useLazyBackgroundImg = (url: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      setSourceLoaded(url);
    };
  }, [url]);

  return sourceLoaded;
};
export default useLazyBackgroundImg;

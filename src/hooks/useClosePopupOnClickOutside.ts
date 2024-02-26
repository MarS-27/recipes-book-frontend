import { useRef, useEffect, useState } from "react";

export const useClosePopupOnClickOutside = () => {
  const [isOpenPopup, toggleOpenPopup] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      toggleOpenPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return {
    isOpenPopup,
    toggleOpenPopup,
    ref,
  };
};

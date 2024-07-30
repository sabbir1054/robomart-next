// ScrollToTop.js
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

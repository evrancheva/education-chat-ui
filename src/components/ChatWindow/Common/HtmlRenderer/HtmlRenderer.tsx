import React from "react";
import styles from "./HtmlRenderer.module.css";

interface HTMLRendererProps {
  htmlContent: string;
  className: string;
}
// A component to render text not escaping the html tags
// Should be used only when it's sure that the htmlContent is safe to render
// Custom styling of html elements could be done in HtmlRenderer.module.css
const HTMLRenderer: React.FC<HTMLRendererProps> = ({
  htmlContent,
  className,
}) => {
  return (
    <div
      className={styles[className]}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default HTMLRenderer;

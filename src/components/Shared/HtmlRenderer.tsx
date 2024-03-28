import React from "react";
import styles from "./HtmlRenderer.module.css";

interface HTMLRendererProps {
  htmlContent: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ htmlContent }) => {
  return (
    <div
      className={styles.text}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default HTMLRenderer;

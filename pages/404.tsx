import css404 from "../styles/404.module.css";

export default function Page404() {
  let urlPath = "";
  if (typeof window !== "undefined") urlPath = window.location.pathname;
  return (
    <>
      <div className={css404["container"]}>
        <span className={css404["titleText"]}>404</span>
        <div className={css404["bodyError"]}>
          <span>{urlPath} - Page not found</span>
        </div>
      </div>
    </>
  )
}
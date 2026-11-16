import Breadcrumb from "./Breadcrumb.jsx";

/** Banner at the top of every inner page: breadcrumb, title, meta row. */
export default function PageHeader({ breadcrumb, eyebrow, title, description, meta, children }) {
  return (
    <section className="page-head">
      <div className="shell page-head__inner">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-head__title">{title}</h1>
        {description && <p className="lede">{description}</p>}
        {meta && <div className="page-head__meta">{meta}</div>}
        {children}
      </div>
    </section>
  );
}

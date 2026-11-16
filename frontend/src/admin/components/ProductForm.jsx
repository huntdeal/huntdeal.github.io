import { useMemo, useState } from "react";
import { Image as ImageIcon, Link2, Save, X } from "lucide-react";

import DealCard from "../../components/DealCard.jsx";
import Button from "../../components/ui/Button.jsx";
import Field from "../../components/ui/Field.jsx";
import { categories } from "../../data/categories.js";
import { PRODUCT_STATUSES } from "../../utils/constants.js";
import { discountPercent } from "../../utils/format.js";
import { placeholderGallery } from "../../utils/placeholder.js";

const EMPTY = {
  name: "",
  brand: "",
  category: "electronics",
  description: "",
  features: "",
  price: "",
  originalPrice: "",
  rating: "4.0",
  imageUrl: "",
  affiliateUrl: "",
  status: "draft",
  isFeatured: false,
  isTrending: false,
};

function validate(values) {
  const errors = {};
  const price = Number(values.price);
  const original = Number(values.originalPrice);
  const rating = Number(values.rating);

  if (!values.name.trim()) errors.name = "Product name is required.";
  else if (values.name.trim().length < 6) errors.name = "Use the full product name.";

  if (!values.description.trim()) errors.description = "Add a short description.";

  if (!values.price) errors.price = "Current price is required.";
  else if (!Number.isFinite(price) || price <= 0)
    errors.price = "Enter a price greater than zero.";

  if (!values.originalPrice) errors.originalPrice = "Original price is required.";
  else if (!Number.isFinite(original) || original <= 0)
    errors.originalPrice = "Enter a price greater than zero.";
  else if (original < price)
    errors.originalPrice = "Original price cannot be lower than the current price.";

  if (!Number.isFinite(rating) || rating < 0 || rating > 5)
    errors.rating = "Rating must be between 0 and 5.";

  if (values.affiliateUrl && !/^https?:\/\//i.test(values.affiliateUrl.trim()))
    errors.affiliateUrl = "Enter a full URL starting with https://";

  if (values.imageUrl && !/^https?:\/\//i.test(values.imageUrl.trim()))
    errors.imageUrl = "Enter a full image URL starting with https://";

  return errors;
}

/** Turns a stored product back into form values. */
export function productToForm(product) {
  if (!product) return EMPTY;
  return {
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description,
    features: (product.features ?? []).join("\n"),
    price: String(product.price),
    originalPrice: String(product.originalPrice),
    rating: String(product.rating),
    imageUrl: product.imageUrl ?? "",
    affiliateUrl: product.affiliateUrl ?? "",
    status: product.status,
    isFeatured: product.isFeatured,
    isTrending: product.isTrending,
  };
}

/**
 * Add / edit product form with a live card preview.
 * `canPublish` is false for Product Managers, who may draft but not publish.
 */
export default function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting = false,
  canPublish = true,
  mode = "create",
}) {
  const [values, setValues] = useState(initialValues ?? EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function setField(field, value) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );
    if (Object.keys(found).length) return;
    onSubmit(values);
  }

  const discount = discountPercent(values.price, values.originalPrice);

  const imageOptions = useMemo(
    () =>
      placeholderGallery(
        values.name || "new-product",
        values.name ? "" : "Preview",
        values.category,
      ),
    [values.name, values.category],
  );

  const previewProduct = {
    id: "preview",
    name: values.name || "Product name appears here",
    brand: values.brand || "Brand",
    category: values.category,
    categoryName:
      categories.find((item) => item.slug === values.category)?.name ?? "",
    price: Number(values.price) || 0,
    originalPrice: Number(values.originalPrice) || 0,
    discount,
    rating: Number(values.rating) || 0,
    reviewCount: 0,
    clicks: 0,
    imageUrl: values.imageUrl || null,
    images: imageOptions,
    affiliateUrl: values.affiliateUrl || "#",
  };

  return (
    <form className="admin-grid admin-grid--2-1" onSubmit={handleSubmit} noValidate>
      <div className="panel">
        {/* Basics -------------------------------------------------------- */}
        <section className="form-section">
          <h2 className="form-section__title">Product details</h2>

          <Field
            label="Product name"
            required
            value={values.name}
            error={touched.name ? errors.name : undefined}
            onChange={(event) => setField("name", event.target.value)}
            onBlur={() => {
              setTouched((t) => ({ ...t, name: true }));
              setErrors(validate(values));
            }}
            placeholder="Aurex H9 Wireless Noise Cancelling Headphones"
          />

          <div className="form-grid">
            <Field
              label="Brand"
              value={values.brand}
              onChange={(event) => setField("brand", event.target.value)}
              placeholder="Aurex"
            />

            <Field
              as="select"
              label="Category"
              required
              value={values.category}
              onChange={(event) => setField("category", event.target.value)}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Field>
          </div>

          <Field
            as="textarea"
            label="Product description"
            required
            value={values.description}
            error={touched.description ? errors.description : undefined}
            onChange={(event) => setField("description", event.target.value)}
            onBlur={() => {
              setTouched((t) => ({ ...t, description: true }));
              setErrors(validate(values));
            }}
            placeholder="One or two sentences describing what the product is and who it suits."
          />

          <Field
            as="textarea"
            label="Key features"
            hint="One feature per line."
            value={values.features}
            onChange={(event) => setField("features", event.target.value)}
            placeholder={"Hybrid ANC with three levels\n40-hour battery life"}
            style={{ minHeight: 110 }}
          />
        </section>

        {/* Pricing ------------------------------------------------------- */}
        <section className="form-section">
          <h2 className="form-section__title">Pricing &amp; rating</h2>

          <div className="form-grid">
            <Field
              label="Current price (₹)"
              type="number"
              min="0"
              required
              value={values.price}
              error={touched.price ? errors.price : undefined}
              onChange={(event) => setField("price", event.target.value)}
              onBlur={() => {
                setTouched((t) => ({ ...t, price: true }));
                setErrors(validate(values));
              }}
            />

            <Field
              label="Original price (₹)"
              type="number"
              min="0"
              required
              value={values.originalPrice}
              error={touched.originalPrice ? errors.originalPrice : undefined}
              onChange={(event) => setField("originalPrice", event.target.value)}
              onBlur={() => {
                setTouched((t) => ({ ...t, originalPrice: true }));
                setErrors(validate(values));
              }}
            />

            <Field
              as="custom"
              label="Discount"
              hint="Calculated from the two prices above."
            >
              <div className="input" style={{ background: "var(--surface-muted)" }}>
                {discount}% off
              </div>
            </Field>

            <Field
              label="Rating (0–5)"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={values.rating}
              error={touched.rating ? errors.rating : undefined}
              onChange={(event) => setField("rating", event.target.value)}
              onBlur={() => {
                setTouched((t) => ({ ...t, rating: true }));
                setErrors(validate(values));
              }}
            />
          </div>
        </section>

        {/* Media & links -------------------------------------------------- */}
        <section className="form-section">
          <h2 className="form-section__title">Image &amp; affiliate link</h2>

          <Field
            label="Product image URL"
            hint="Leave empty to use generated placeholder artwork."
            value={values.imageUrl}
            error={touched.imageUrl ? errors.imageUrl : undefined}
            onChange={(event) => setField("imageUrl", event.target.value)}
            placeholder="https://…"
          />

          <Field as="custom" label="Or pick placeholder artwork">
            <div className="image-picker">
              {imageOptions.map((image, index) => (
                // Generated artwork can share a tail, so index is the stable key.
                <button
                  key={`artwork-${index}`}
                  type="button"
                  className="image-picker__option"
                  aria-pressed={values.imageUrl === image}
                  onClick={() => setField("imageUrl", image)}
                >
                  <img src={image} alt={`Placeholder artwork option ${index + 1}`} />
                </button>
              ))}
              <button
                type="button"
                className="image-picker__option"
                aria-pressed={!values.imageUrl}
                onClick={() => setField("imageUrl", "")}
                title="Use the default generated artwork"
                style={{ display: "grid", placeItems: "center" }}
              >
                <ImageIcon size={18} aria-hidden="true" />
              </button>
            </div>
          </Field>

          <Field
            label="Amazon affiliate URL"
            hint="Leave empty to generate a tagged Amazon search link from the product name."
            value={values.affiliateUrl}
            error={touched.affiliateUrl ? errors.affiliateUrl : undefined}
            onChange={(event) => setField("affiliateUrl", event.target.value)}
            placeholder="https://www.amazon.in/dp/XXXXXXXXXX?tag=yourtag-21"
          />
        </section>

        {/* Publishing ----------------------------------------------------- */}
        <section className="form-section">
          <h2 className="form-section__title">Publishing</h2>

          <div className="form-grid">
            <Field
              as="select"
              label="Product status"
              value={values.status}
              onChange={(event) => setField("status", event.target.value)}
              hint={
                canPublish
                  ? undefined
                  : "Your role can save drafts; an admin publishes them."
              }
            >
              {PRODUCT_STATUSES.map((status) => (
                <option
                  key={status.value}
                  value={status.value}
                  disabled={!canPublish && status.value === "active"}
                >
                  {status.label}
                </option>
              ))}
            </Field>

            <Field as="custom" label="Placement">
              <div className="stack stack-3" style={{ paddingTop: 6 }}>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={values.isFeatured}
                    onChange={(event) => setField("isFeatured", event.target.checked)}
                  />
                  <span>Show in featured deals</span>
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={values.isTrending}
                    onChange={(event) => setField("isTrending", event.target.checked)}
                  />
                  <span>Mark as trending</span>
                </label>
              </div>
            </Field>
          </div>
        </section>

        <div className="form-actions">
          <Button variant="ghost" icon={X} onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={Save} loading={submitting}>
            {mode === "edit" ? "Save changes" : "Add product"}
          </Button>
        </div>
      </div>

      {/* Live preview ----------------------------------------------------- */}
      <div className="panel form-preview">
        <div className="panel__head">
          <div>
            <h2 className="panel-title">Card preview</h2>
            <p className="panel__sub">How this product appears in listings.</p>
          </div>
        </div>

        <DealCard product={previewProduct} />

        <p className="text-xs text-muted">
          <Link2 size={13} aria-hidden="true" style={{ verticalAlign: "-2px" }} />{" "}
          Changes are saved to the local mock catalogue only. They will move to
          the backend once the product API is connected.
        </p>
      </div>
    </form>
  );
}

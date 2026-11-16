import { useCallback, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  ExternalLink,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader.jsx";
import PermissionGate from "../components/PermissionGate.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import ConfirmationModal from "../../components/ui/ConfirmationModal.jsx";
import EmptyState from "../../components/states/EmptyState.jsx";
import { ListSkeleton } from "../../components/states/LoadingState.jsx";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";
import { categories } from "../../data/categories.js";
import {
  deleteProduct,
  listProducts,
  resetMockCatalogue,
  setProductStatus,
} from "../../services/productService.js";
import { PRODUCT_STATUSES } from "../../utils/constants.js";
import { formatCompact, formatPrice, timeAgo } from "../../utils/format.js";

const STATUS_TONES = { active: "success", paused: "amber", draft: "neutral" };

export default function AdminProducts() {
  const { openNav } = useOutletContext();
  const { can } = useAdminAuth();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 250);

  const query = useMemo(
    () => ({
      search: debouncedSearch,
      categories: category ? [category] : [],
      status: status || null,
      includeInactive: true,
      sort: "newest",
      page,
      pageSize: 10,
    }),
    [debouncedSearch, category, status, page],
  );

  const fetcher = useCallback(() => listProducts(query), [query]);
  const { data, loading, error, reload } = useAsync(fetcher, [JSON.stringify(query)]);

  const items = data?.items ?? [];

  async function onToggleStatus(product) {
    const next = product.status === "active" ? "paused" : "active";
    await setProductStatus(product.id, next);
    toast.success(
      next === "active" ? "Product is now live" : "Product paused — hidden from the site",
    );
    reload();
  }

  async function onDelete() {
    setBusy(true);
    try {
      await deleteProduct(pendingDelete.id);
      toast.success("Product deleted from the mock catalogue");
      setPendingDelete(null);
      reload();
    } catch (cause) {
      toast.error(cause.message);
    } finally {
      setBusy(false);
    }
  }

  async function onReset() {
    setBusy(true);
    try {
      await resetMockCatalogue();
      toast.success("Demo catalogue restored");
      setConfirmReset(false);
      reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle={`${data?.total ?? 0} products in the catalogue`}
        onMenuClick={openNav}
        actions={
          can("products.create") ? (
            <Button variant="primary" size="sm" icon={Plus} to="/admin/products/new">
              Add product
            </Button>
          ) : null
        }
      />

      <div className="admin__content">
        <PermissionGate permission="products.view">
          <section className="panel">
            <div className="admin-toolbar">
              <div className="admin-toolbar__grow">
                <div className="input-group">
                  <span className="input-group__icon">
                    <Search size={16} />
                  </span>
                  <input
                    className="input"
                    type="search"
                    placeholder="Search by name, brand or category"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    aria-label="Search products"
                  />
                </div>
              </div>

              <select
                className="select"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
                aria-label="Filter by category"
                style={{ width: "auto", minWidth: 170 }}
              >
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                className="select"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
                aria-label="Filter by status"
                style={{ width: "auto", minWidth: 150 }}
              >
                <option value="">All statuses</option>
                {PRODUCT_STATUSES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <Button
                variant="ghost"
                size="sm"
                icon={RotateCcw}
                onClick={() => setConfirmReset(true)}
                title="Restore the shipped demo catalogue"
              >
                Reset demo data
              </Button>
            </div>

            {loading && <ListSkeleton rows={6} />}

            {!loading && items.length === 0 && (
              <EmptyState
                title="No products match those filters"
                message="Change the search term or clear the category and status filters."
                action={{
                  label: "Clear filters",
                  onClick: () => {
                    setSearch("");
                    setCategory("");
                    setStatus("");
                    setPage(1);
                  },
                }}
              />
            )}

            {!loading && items.length > 0 && (
              <>
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Status</th>
                        <th className="table__num">Price</th>
                        <th className="table__num">Discount</th>
                        <th className="table__num">Clicks</th>
                        <th>Updated</th>
                        <th aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <span className="cell-product">
                              <img
                                src={product.imageUrl ?? product.images[0]}
                                alt=""
                                className="cell-product__img"
                              />
                              <span>
                                <span className="cell-product__name">
                                  {product.name}
                                </span>
                                <span className="cell-product__sub">
                                  {product.categoryName} · {product.brand}
                                </span>
                              </span>
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => onToggleStatus(product)}
                              disabled={!can("products.edit")}
                              title={
                                can("products.edit")
                                  ? "Toggle between active and paused"
                                  : "Your role cannot change status"
                              }
                              style={{ cursor: can("products.edit") ? "pointer" : "not-allowed" }}
                            >
                              <Badge tone={STATUS_TONES[product.status] ?? "neutral"}>
                                {product.status}
                              </Badge>
                            </button>
                          </td>
                          <td className="table__num">
                            {formatPrice(product.price)}
                            <div className="cell-product__sub">
                              was {formatPrice(product.originalPrice)}
                            </div>
                          </td>
                          <td className="table__num">{product.discount}%</td>
                          <td className="table__num">
                            {formatCompact(product.clicks)}
                          </td>
                          <td>
                            <span className="text-xs text-muted">
                              {timeAgo(product.updatedAt)}
                            </span>
                          </td>
                          <td>
                            <span className="table__actions">
                              <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="icon-btn"
                                aria-label={`Open ${product.name} on Amazon`}
                              >
                                <ExternalLink size={16} />
                              </a>

                              {can("products.edit") ? (
                                <Link
                                  to={`/admin/products/${product.id}/edit`}
                                  className="icon-btn"
                                  aria-label={`Edit ${product.name}`}
                                >
                                  <Pencil size={16} />
                                </Link>
                              ) : (
                                <span
                                  className="icon-btn"
                                  aria-disabled="true"
                                  title="Your role cannot edit products"
                                  style={{ opacity: 0.4 }}
                                >
                                  <Pencil size={16} />
                                </span>
                              )}

                              {can("products.delete") ? (
                                <button
                                  type="button"
                                  className="icon-btn"
                                  onClick={() => setPendingDelete(product)}
                                  aria-label={`Delete ${product.name}`}
                                >
                                  <Trash2 size={16} />
                                </button>
                              ) : (
                                <span
                                  className="icon-btn"
                                  aria-disabled="true"
                                  title="Only admins can delete products"
                                  style={{ opacity: 0.4 }}
                                >
                                  <Trash2 size={16} />
                                </span>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="row row--between row--wrap">
                  <span className="text-xs text-muted">
                    Page {data?.page ?? 1} of {data?.pageCount ?? 1}
                  </span>
                  <span className="row">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={(data?.page ?? 1) <= 1}
                      onClick={() => setPage((current) => current - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={(data?.page ?? 1) >= (data?.pageCount ?? 1)}
                      onClick={() => setPage((current) => current + 1)}
                    >
                      Next
                    </Button>
                  </span>
                </div>
              </>
            )}

            {error && (
              <p className="alert alert--error">{error.message}</p>
            )}
          </section>
        </PermissionGate>
      </div>

      <ConfirmationModal
        open={Boolean(pendingDelete)}
        title="Delete this product?"
        message={`"${pendingDelete?.name}" will be removed from the catalogue and will stop appearing on the public site. In this build it is removed from the local mock data only.`}
        confirmLabel="Delete product"
        busy={busy}
        onConfirm={onDelete}
        onClose={() => setPendingDelete(null)}
      />

      <ConfirmationModal
        open={confirmReset}
        title="Restore the demo catalogue?"
        message="This discards every product you added, edited or deleted in this browser and restores the shipped demo data."
        confirmLabel="Reset demo data"
        busy={busy}
        onConfirm={onReset}
        onClose={() => setConfirmReset(false)}
      />
    </>
  );
}

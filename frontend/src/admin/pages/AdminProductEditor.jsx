import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import AdminHeader from "../components/AdminHeader.jsx";
import PermissionGate from "../components/PermissionGate.jsx";
import ProductForm, { productToForm } from "../components/ProductForm.jsx";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/states/EmptyState.jsx";
import LoadingState from "../../components/states/LoadingState.jsx";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../services/productService.js";

/** Handles both /admin/products/new and /admin/products/:productId/edit. */
export default function AdminProductEditor({ mode = "create" }) {
  const { openNav } = useOutletContext();
  const { productId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { can } = useAdminAuth();

  const [submitting, setSubmitting] = useState(false);
  const isEdit = mode === "edit";

  const product = useAsync(() => getProduct(productId), [productId], {
    enabled: isEdit,
  });

  async function onSubmit(values) {
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateProduct(productId, values);
        toast.success("Product updated");
      } else {
        await createProduct(values);
        toast.success("Product added to the catalogue");
      }
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const permission = isEdit ? "products.edit" : "products.create";

  return (
    <>
      <AdminHeader
        title={isEdit ? "Edit product" : "Add product"}
        subtitle={
          isEdit
            ? "Changes apply to the mock catalogue immediately"
            : "New products are saved to the local mock catalogue"
        }
        onMenuClick={openNav}
        actions={
          <Button variant="ghost" size="sm" icon={ArrowLeft} to="/admin/products">
            Back to products
          </Button>
        }
      />

      <div className="admin__content">
        <PermissionGate permission={permission}>
          {isEdit && product.loading && <LoadingState label="Loading product…" />}

          {isEdit && product.error && (
            <EmptyState
              title="Product not found"
              message={`No product matches "${productId}". It may have been deleted.`}
              action={{ label: "Back to products", to: "/admin/products" }}
            />
          )}

          {(!isEdit || product.data) && (
            <ProductForm
              mode={mode}
              initialValues={isEdit ? productToForm(product.data) : undefined}
              submitting={submitting}
              canPublish={can("products.delete") || can("users.manage")}
              onSubmit={onSubmit}
              onCancel={() => navigate("/admin/products")}
            />
          )}
        </PermissionGate>
      </div>
    </>
  );
}

// public/scripts/productActions.js

async function deleteCategory(categoryId) {
  try {
    const response = await fetch(`/categories/${categoryId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
    console.log("Category deleted successfully");
  } catch (err) {
    console.error("Error deleting category:", err);
  }
}

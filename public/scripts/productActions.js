async function deleteCategory(categoryName) {
  try {
    const response = await fetch(`/categories/${categoryName}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      let errorMessage = "Failed to delete category";
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }
      }
      throw new Error(errorMessage);
    }
    console.log("Category deleted successfully");
    // Refresh the page after deletion
    window.location.reload();
  } catch (err) {
    console.error("Error deleting category:", err);
  }
}


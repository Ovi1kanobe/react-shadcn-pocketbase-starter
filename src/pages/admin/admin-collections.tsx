import PageContainer from "@/components/core/page-container";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { CollectionModel } from "pocketbase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AdminCollections() {
  const { fetchCollections } = useAdminAuth();
  const [collections, setCollections] = useState<CollectionModel[]>([])

  useEffect(() => {
    fetchCollections(
      (error) => {
        toast.error(`Failed to fetch collections: ${error.message}`);
      },
      (res) => {
        setCollections(res);
        console.log("Fetched collections:", res);
      },
      "system = false" // Example filter to exclude system collections
    );
  },[fetchCollections]);
  return (
    <PageContainer>
      {collections.map((collection) => (
        <div key={collection.id} className="p-4 border rounded mb-4">
          <h2 className="text-lg font-semibold">{collection.name}</h2>
          <p className="text-sm text-muted-foreground">{collection.description}</p>
          <p className="text-sm">ID: {collection.id}</p>
          <p className="text-sm">Type: {collection.type}</p>
          <p className="text-sm">System: {collection.system ? "Yes" : "No"}</p>
        </div>
      ))}
    </ PageContainer>
  );
}

export default AdminCollections;

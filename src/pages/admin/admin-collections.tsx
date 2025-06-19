import PageContainer from "@/components/core/page-container";
import { DataTable } from "@/components/tables/generic/generic-table";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useClient } from "@/hooks/useClient";
import type PocketBaseError from "@/lib/pberror";
import type { CollectionModel } from "pocketbase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RecordSelector } from "@/components/core/record-selector";

function AdminCollections() {
  const { pb } = useClient();
  const { fetchCollections } = useAdminAuth();
  const [collections, setCollections] = useState<CollectionModel[]>([]);
  const [currentCollection, setCurrentCollection] = useState<CollectionModel | null>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [perPage] = useState(10);
  const [page] = useState(1);

  useEffect(() => {
    fetchCollections(
      (error) => {
        toast.error(`Failed to fetch collections: ${error.message}`);
      },
      (res) => {
        setCollections(res);
        setCurrentCollection(res[0] || null);
        console.log("Fetched collections:", res);
      },
      "system = false" // Example filter to exclude system collections
    );
  }, [fetchCollections]);

  useEffect(() => {
    async function fetchRecords() {
      if (currentCollection) {
        try {
          const res = await pb.collection(currentCollection.name).getList(page, perPage);
          setRecords(res.items);
          console.log("Fetched records for collection:", currentCollection.name, res.items);
        } catch (error) {
          const err = error as PocketBaseError;
          toast.error(`Failed to fetch records: ${err.message}`);
        }
      }
    }
    fetchRecords();
  }, [currentCollection, page, perPage, pb]);
  return (
    <PageContainer>
      <RecordSelector
        data={collections}
        value={currentCollection}
        setValue={setCurrentCollection}
        label={(item) => item.name}
        placeholder="Select a collection"
        className="mb-4"
      />
      {/* <DataTable columns={columns} data={[]} /> */}
    </PageContainer>
  );
}

export default AdminCollections;

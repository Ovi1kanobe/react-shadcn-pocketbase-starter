import PageContainer from "@/components/core/page-container";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { CollectionModel } from "pocketbase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RecordSelector } from "@/components/core/record-selector";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AdminCollections() {
  const { fetchCollections } = useAdminAuth();
  const [collections, setCollections] = useState<CollectionModel[]>([]);
  const [currentCollection, setCurrentCollection] = useState<CollectionModel | null>(null);
  const [perPage, setPerPage] = useState(10);

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

  return (
    <PageContainer className="">
      <div className="flex flex-row items-center py-2 px-2 space-x-4">
        <div className="flex flex-col gap-2">
          <Label className="">Collection</Label>
          <RecordSelector
            data={collections}
            value={currentCollection}
            setValue={setCurrentCollection}
            label={(item) => item.name}
            placeholder="Select a collection"
            className=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="">Records Per Page</Label>
          <Input
            type="number"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            placeholder="Records per page"
            className="w-32"
          />
        </div>
      </div>
      <Separator />
      <div className="w-full pt-4"></div>
    </PageContainer>
  );
}

export default AdminCollections;

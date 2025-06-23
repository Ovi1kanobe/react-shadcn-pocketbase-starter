import ToggleCard from "@/components/core/toggle-card";
import { useClient } from "@/hooks/useClient";
import type PocketBaseError from "@/lib/pberror";
import type { CollectionModel } from "pocketbase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AdminSettingsPage() {
  const { pb } = useClient();

  const [usersCollection, setUsersCollection] = useState<CollectionModel | null>(null);

  const isUserRegistrationAllowed = usersCollection?.createRule === "";

  const onToggleUserRegistration = async (checked: boolean) => {
    if (!usersCollection) return;
    try {
      const res = await pb.collections.update(usersCollection.id, {
        createRule: checked ? "" : null,
      });
      setUsersCollection(res);
    } catch {
      toast.error("Failed to update user registration setting. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUsersCollection = async () => {
      try {
        const collection = await pb.collections.getFirstListItem(`name = "users"`);
        setUsersCollection(collection);
      } catch (error) {
        const err = error as PocketBaseError;
        if (err.isAbort) return; // Ignore aborted requests
        toast.error("Failed to fetch users collection. Please try again.");
      }
    };

    fetchUsersCollection();
  }, [pb]);

  if (!usersCollection) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Admin Settings</h1>
      <ToggleCard
        label="Allow User Registration"
        information="Toggle to allow or disallow user registration."
        checked={isUserRegistrationAllowed}
        onCheckedChange={onToggleUserRegistration}
      />
    </div>
  );
}

export default AdminSettingsPage;

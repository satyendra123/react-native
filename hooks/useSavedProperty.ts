import { useEffect, useState } from "react";

const savedPropertyIds = new Set<string>();

export function useSavedProperty(propertyId: string, onUnsave?: () => void) {
  const [isSaved, setIsSaved] = useState(savedPropertyIds.has(propertyId));

  useEffect(() => {
    setIsSaved(savedPropertyIds.has(propertyId));
  }, [propertyId]);

  const toggleSave = () => {
    if (savedPropertyIds.has(propertyId)) {
      savedPropertyIds.delete(propertyId);
      setIsSaved(false);
      onUnsave?.();
      return;
    }

    savedPropertyIds.add(propertyId);
    setIsSaved(true);
  };

  return {
    isSaved,
    saveLoading: false,
    toggleSave,
  };
}

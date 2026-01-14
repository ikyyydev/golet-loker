import Script from "next/script";
import { Thing, WithContext } from "schema-dts";

interface StructureddataProps<T extends Thing> {
  data: WithContext<T>;
}

export default async function StructuredData<T extends Thing>({
  data,
}: StructureddataProps<T>) {
  return (
    <Script
      key="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      id="structured-data"
    />
  );
}

import MasterLayout from "@/components/master-layout";

export default function NotFoundPage() {
  return (
    <MasterLayout>
      <div
        className="grow-1 container mx-auto my-12"
        style={{ minHeight: "50vh" }}
      >
        <h2 className="text-8xl font-bold">404</h2>
        <p className="m-4 text-xl">{`We couldn't find this page`}</p>
      </div>
    </MasterLayout>
  );
}

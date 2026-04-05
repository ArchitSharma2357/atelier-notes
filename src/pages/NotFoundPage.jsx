import EmptyState from "../components/EmptyState";

export default function NotFoundPage() {
  return (
    <div className="page-shell pb-8 pt-10">
      <EmptyState
        actionLabel="Back to home"
        actionTo="/"
        copy="The page you requested does not exist or may have moved."
        title="Page not found"
      />
    </div>
  );
}

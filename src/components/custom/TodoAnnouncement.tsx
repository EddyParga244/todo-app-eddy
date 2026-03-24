import { useTodo } from "@/hooks/useTodo";

export const TodoAnnouncement = () => {
  const { announcement } = useTodo();

  return (
    <p aria-live="polite" className="sr-only" data-testid="announcement">
      {announcement}
    </p>
  );
};

"use client";
type FullScreenModalProps = {};

export default function FullScreenModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 h-dvh w-dvw z-99 absolute px-20 py-40 align-middle bg-(--color-background-primary) text-(--color-text-primary)">
      {children}
    </div>
  );
}

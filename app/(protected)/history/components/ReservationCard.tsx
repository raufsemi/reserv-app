/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

type Props = {
  reservation: any;
  onCancel: (id: string) => void;
};

export function formatDatePretty(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
}

export function formatTime(time?: string): string {
  if (!time) return "-";
  const [h, m] = time.split(":");
  if (!h || !m) return time;
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalizedHour.toString().padStart(2, "0")}:${m} ${ampm}`;
}

function isPastBookingDate(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDate = new Date(date);
  bookingDate.setHours(0, 0, 0, 0);
  return bookingDate < today;
}

export function ReservationCard({ reservation, onCancel }: Props) {
  // const isCancelled = reservation.status === "cancelled";
  // const isPastDate = isPastBookingDate(reservation.booking_date);

  const isCancelled = reservation.status === "cancelled";
  const isPastDate = isPastBookingDate(reservation.booking_date);
  const isCompleted = !isCancelled && isPastDate;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex flex-col sm:flex-row">
        {/* DATE */}
        <div
          className={[
            "flex shrink-0 items-center gap-3 border-b px-4 py-3 sm:w-32 sm:flex-col sm:items-start sm:justify-center sm:border-b-0 sm:border-r sm:px-5",
            isCancelled
              ? "bg-red-50/50 text-neutral-400"
              : "bg-neutral-50/70 text-neutral-900",
          ].join(" ")}
        >
          <div className="text-xs font-medium text-neutral-400">Tarikh</div>

          <div
            className={[
              "text-sm font-semibold",
              isCancelled
                ? "text-neutral-400 line-through"
                : "text-neutral-900",
            ].join(" ")}
          >
            {formatDatePretty(reservation.booking_date)}
          </div>
        </div>

        {/* BOOKING INFO */}
        <div className="min-w-0 flex-1 p-4 sm:px-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div
                className={[
                  "truncate text-base font-semibold",
                  isCancelled
                    ? "text-neutral-400 line-through"
                    : "text-neutral-900",
                ].join(" ")}
              >
                {reservation.rooms?.name}
              </div>

              <div
                className={[
                  "mt-1 text-sm font-medium",
                  isCancelled ? "text-neutral-400" : "text-neutral-700",
                ].join(" ")}
              >
                {formatTime(reservation.room_time_slots?.start_time)} -{" "}
                {formatTime(reservation.room_time_slots?.end_time)}
              </div>
            </div>

            {/* STATUS */}
            <span
              className={[
                "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                isCancelled
                  ? "bg-red-100 text-red-600"
                  : isCompleted
                    ? "bg-neutral-100 text-neutral-600"
                    : "bg-green-100 text-green-700",
              ].join(" ")}
            >
              {isCancelled ? "Cancelled" : isCompleted ? "Completed" : "Active"}
            </span>
            {/* <span
              className={[
                "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                isCancelled
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700",
              ].join(" ")}
            >
              {isCancelled ? "Cancelled" : "Active"}
            </span> */}
          </div>

          {/* DETAILS */}
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-neutral-100 pt-4">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Nama
              </div>
              <div className="mt-0.5 truncate text-xs font-medium text-neutral-700">
                {reservation.full_name.toUpperCase()}
              </div>
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Tujuan
              </div>
              <div className="mt-0.5 truncate text-xs font-medium text-neutral-700">
                {reservation.project_type}
              </div>
            </div>
          </div>
        </div>

        {/* ACTION */}
        {!isCancelled && !isPastDate && (
          <div className="flex items-center border-t border-neutral-100 px-4 py-3 sm:border-l sm:border-t-0 sm:px-5">
            <button
              onClick={() => onCancel(reservation.id)}
              className="w-full rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
            >
              Batal Tempahan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

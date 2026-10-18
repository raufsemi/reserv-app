"use client";

import { bookerService } from "@/features/services/booker.service";
import { reservationService } from "@/features/services/reservation.service";
import { getUserProfile } from "@/lib/auth";
import { useEffect, useMemo, useState } from "react";
import { ReservationCard } from "./components/ReservationCard";
import { PublicFooter } from "@/features/shared/PublicFooter";

type Reservation = {
  id: string;
  booking_date: string;
  capacity: number;
  project_type: string;
  project_progress: string;
  status: string;
  rooms: {
    id: string;
    name: string;
    label: string;
  };
  room_time_slots: {
    start_time: string;
    end_time: string;
  };
};

export default function BookingHistoryPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUserProfile();
        if (!user) return;

        const booker = await bookerService.ensure(user.id);
        const data = await reservationService.getMyReservations(booker.id);

        setReservations(data ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function confirmCancel() {
    if (!cancelId) return;

    await reservationService.cancelReservation(cancelId);

    setReservations((prev) =>
      prev.map((r) => (r.id === cancelId ? { ...r, status: "cancelled" } : r)),
    );

    setCancelId(null);
  }

  // 🔥 NOTION-STYLE SORT
  const timeline = useMemo(() => {
    const active = reservations
      .filter((r) => r.status !== "cancelled")
      .sort(
        (a, b) =>
          new Date(b.booking_date).getTime() -
          new Date(a.booking_date).getTime(),
      )
      .slice(0, 5);

    const cancelled = reservations
      .filter((r) => r.status === "cancelled")
      .sort(
        (a, b) =>
          new Date(b.booking_date).getTime() -
          new Date(a.booking_date).getTime(),
      )
      .slice(0, 5);

    return { active, cancelled };
  }, [reservations]);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-purple-50/30 to-white flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 mb-5">
          {/* title */}
          <div className="font-semibold text-yellow-800">Notis penting</div>

          {/* message */}
          <div className="mt-1 text-sm text-yellow-700 leading-relaxed">
            Sila pastikan hadir tepat pada waktu tempahan. Jika terdapat
            sebarang isu atau laporan berkaitan sistem tempahan, sila hubungi
            pihak pentadbiran dengan segera.
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Sejarah Tempahan
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Senarai semua tempahan anda, termasuk yang aktif dan telah
            dibatalkan
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl border border-purple-100 bg-white p-4 text-sm text-gray-500 shadow-sm">
            Memuatkan rekod tempahan...
          </div>
        )}

        {/* EMPTY */}
        {!loading && reservations.length === 0 && (
          <div className="rounded-2xl border border-purple-100 bg-white p-6 text-sm text-gray-500 shadow-sm">
            Tiada sejarah tempahan lagi
          </div>
        )}

        {/* TIMELINE */}
        {!loading && reservations.length > 0 && (
          <div className="space-y-10">
            <div>
              <div className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Aktif
              </div>

              <div className="space-y-3 border-l border-purple-100 pl-4">
                {timeline.active.map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onCancel={setCancelId}
                  />
                ))}
              </div>
            </div>

            {/* CANCELLED */}
            <div>
              <div className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Dibatalkan
              </div>

              <div className="space-y-3 border-l border-purple-100 pl-4">
                {timeline.cancelled.map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onCancel={setCancelId}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CANCEL MODAL */}
        {cancelId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl p-6 border border-purple-100 shadow-xl">
              <h2 className="font-semibold text-lg text-gray-900">
                Batalkan tempahan?
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Tempahan ini akan dipindahkan ke bahagian sejarah dibatalkan.
              </p>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 border border-gray-200 rounded-xl py-2 text-sm hover:bg-gray-50"
                >
                  Kembali
                </button>

                <button
                  onClick={confirmCancel}
                  className="flex-1 bg-accent text-white rounded-xl py-2 text-sm hover:bg-purple-500"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        )}

        <PublicFooter />
      </div>
    </div>
  );
}

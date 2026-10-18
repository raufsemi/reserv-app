import Link from "next/link";
import { PublicFooter } from "@/features/shared/PublicFooter";
import {
  CalendarCheck,
  DoorOpen,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-purple-100 selection:text-purple-900">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-mono text-sm font-bold shadow-xs">
              PZ
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-900">
              {`Perpustakaan Za'ba`}
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-xs font-semibold text-zinc-600 hover:text-purple-700 transition-colors duration-150"
            >
              Log Masuk
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-purple-700 px-4 text-xs font-medium text-white shadow-xs transition-all duration-140 hover:bg-purple-800 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-purple-600 focus-visible:outline-offset-2"
            >
              Mula Tempah
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-linear-to-b from-purple-50/50 via-white to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                <span>{`Sistem Tempahan Perpustakaan Za'ba`}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.15]">
                Pengurusan ruang kajian <br />
                <span className="text-purple-700">
                  tanpa sebarang pertindihan.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
                Lihat jadual penggunaan bilik dan buat tempahan ruang di
                Perpustakaan {`Za'ba`} dengan mudah melalui satu platform.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-purple-700 px-6 text-sm font-medium text-white shadow-sm transition-all duration-140 hover:bg-purple-800 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-purple-600 focus-visible:outline-offset-2"
                >
                  <span>Daftar Akaun Pelajar</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/signin"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 shadow-2xs transition-all duration-140 hover:bg-zinc-50 hover:text-purple-700 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-purple-600"
                >
                  Log Masuk
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-medium text-zinc-700">
                    Sistem Beroperasi
                  </span>
                </div>

                <span className="hidden text-zinc-300 sm:inline">•</span>

                <span>Tempahan Dalam Talian</span>

                <span className="hidden text-zinc-300 sm:inline">•</span>

                <span>Akses Pelajar & Staf</span>
              </div>
            </div>

            {/* Right Interactive Mockup Container */}
            <div className="w-full lg:col-span-5">
              <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-xl shadow-purple-900/5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-100 pb-3">
                  <div className="flex shrink-0 items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                  </div>

                  <span className="text-right text-[10px] font-medium text-zinc-500 sm:text-[11px]">
                    Ketersediaan Bilik Hari Ini
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      room: "Bilik Diskusi 01",
                      status: "Tersedia",
                      time: "Sesi Petang",
                      code: "BD-01",
                    },
                    {
                      room: "Bilik Diskusi 02",
                      status: "Sedang Digunakan",
                      time: "Hingga 4:00 PM",
                      code: "BD-02",
                    },
                    {
                      room: "Bilik Kumpulan 01",
                      status: "Tersedia",
                      time: "Sesi Malam",
                      code: "BK-01",
                    },
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="flex items-center justify-between gap-2 rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 transition-colors hover:border-purple-200 hover:bg-purple-50/30 sm:gap-3 sm:p-3.5"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 font-mono text-[10px] font-bold text-purple-900 sm:text-xs">
                          {item.code}
                        </div>

                        <div className="min-w-0">
                          <div className="wrap-break-word text-xs font-semibold leading-5 text-zinc-900 sm:text-sm">
                            {item.room}
                          </div>
                          <div className="mt-0.5 text-[11px] text-zinc-500 sm:text-xs">
                            {item.time}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`max-w-30 shrink-0 rounded-md border px-2 py-1 text-center text-[10px] font-medium leading-4 sm:max-w-none sm:px-2.5 sm:text-[11px] ${
                          item.status === "Tersedia"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-zinc-200 bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Architecture Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-left">
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-purple-700">
            Fungsi Utama
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
            Semua urusan tempahan bilik di satu tempat.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Tempahan Bilik",
              desc: "Pilih bilik dan masa yang sesuai, kemudian isi maklumat yang diperlukan untuk membuat tempahan.",
              icon: CalendarCheck,
            },
            {
              title: "Semak Ketersediaan",
              desc: "Semak jadual bilik sebelum membuat tempahan supaya tidak bertindih dengan tempahan lain.",
              icon: DoorOpen,
            },
            {
              title: "Rekod Tempahan",
              desc: "Lihat senarai tempahan terdahulu dan semak status setiap tempahan dengan mudah.",
              icon: Clock,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-zinc-200/80 bg-white p-6 transition-all duration-150 hover:border-purple-300 hover:shadow-md hover:shadow-purple-900/5"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-700 transition-colors group-hover:bg-purple-700 group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>

              <h3 className="text-base font-bold text-zinc-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Action / Institutional Callout */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 rounded-2xl border border-purple-100 bg-purple-900 p-8 sm:p-10 text-white shadow-xl shadow-purple-900/10">
            <div className="max-w-xl text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-200 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>AKSES TERKAWAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Sedia untuk membuat tempahan?
              </h2>
              <p className="mt-2 text-sm text-purple-100">
                Log masuk menggunakan akaun rasmi untuk mula mengurus slot bilik
                kajian anda.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-purple-950 transition-all duration-140 hover:bg-purple-50 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-white"
              >
                Cipta Akaun
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

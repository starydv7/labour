"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Protected } from "@/components/auth/protected";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { type AppLanguage, useAppPreferences, useI18nText } from "@/lib/app-preferences";
import { useAuth } from "@/lib/auth";
import { loadWorkerProfile, saveWorkerProfile, type WorkerProfile } from "@/lib/worker-profile";
import { loadAppliedJobIds } from "@/lib/worker-applications";

export default function ProfilePage() {
  return (
    <Protected>
      <ProfileInner />
    </Protected>
  );
}

function ProfileInner() {
  const { user } = useAuth();
  const isWorker = user?.role === "worker";
  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [form, setForm] = useState({
    profileImageDataUrl: "",
    fullName: "",
    phone: "",
    city: "",
    trade: "",
    experienceYears: "",
    preferredWage: "",
    availability: "immediate" as WorkerProfile["availability"],
    skills: "",
    about: "",
  });
  const { prefs, setLanguage, setPref } = useAppPreferences();
  const t = useI18nText();

  useEffect(() => {
    if (!user?.email || !isWorker) return;
    const existing = loadWorkerProfile(user.email);
    if (!existing) return;
    setProfile(existing);
    setForm({
      profileImageDataUrl: existing.profileImageDataUrl ?? "",
      fullName: existing.fullName,
      phone: existing.phone,
      city: existing.city,
      trade: existing.trade,
      experienceYears: existing.experienceYears,
      preferredWage: existing.preferredWage,
      availability: existing.availability,
      skills: existing.skills,
      about: existing.about,
    });
  }, [isWorker, user?.email]);

  useEffect(() => {
    if (!cameraOpen) return;
    openCamera();
    return () => closeCamera();
  }, [cameraOpen]);

  const availabilityLabel = useMemo(() => {
    const v = profile?.availability ?? form.availability;
    if (v === "immediate") return "Immediate";
    if (v === "within_week") return "Within a week";
    return "Part-time";
  }, [form.availability, profile?.availability]);
  const appliedCount = useMemo(() => loadAppliedJobIds().length, [profile?.updatedAt]);

  const submitWorkerProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    const next = saveWorkerProfile(user.email, form);
    setProfile(next);
    setEditing(false);
  };

  const handlePhotoPick = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setImageError("Image is too large. Keep it under 4MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setForm((s) => ({ ...s, profileImageDataUrl: result }));
      setImageError(null);
    };
    reader.onerror = () => {
      setImageError("Could not read this image. Try another one.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-full bg-[#030712] text-zinc-100">
      <LandingNavbar />
      <div
        className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 sm:w-[90%] sm:px-0"
        style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
      >
        <main className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-slate-950 via-[#071426] to-slate-950 p-6 shadow-[0_20px_70px_rgba(16,185,129,0.15)] sm:p-8">

          {isWorker ? (
            <section>
              {editing ? (
                <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={submitWorkerProfile}>
                  <Field label="Profile photo" className="sm:col-span-2">
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-50">
                        {form.profileImageDataUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={form.profileImageDataUrl}
                            alt="Worker profile preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                                  <span className="text-xs font-medium text-zinc-400">{t.noPhoto}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex h-11 min-h-[44px] cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                          {t.chooseFromDevice}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePhotoPick(e.target.files?.[0])}
                          />
                        </label>
                        <button
                          type="button"
                          className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                          onClick={() => {
                            setCameraOpen(true);
                            setCameraError(null);
                          }}
                        >
                          {t.takePhoto}
                        </button>
                        {form.profileImageDataUrl ? (
                          <button
                            type="button"
                            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                            onClick={() => setForm((s) => ({ ...s, profileImageDataUrl: "" }))}
                          >
                            {t.removePhoto}
                          </button>
                        ) : null}
                      </div>
                    </div>
                    {imageError ? <p className="mt-2 text-xs text-red-600">{imageError}</p> : null}
                    {cameraError ? <p className="mt-2 text-xs text-red-600">{cameraError}</p> : null}
                  </Field>

                  <Field label="Full name" required>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.fullName}
                      onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                      required
                    />
                  </Field>
                  <Field label="Phone number" required>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.phone}
                      onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                      placeholder="+91 98xxxxxx"
                      required
                    />
                  </Field>
                  <Field label="City / area" required>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.city}
                      onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                      required
                    />
                  </Field>
                  <Field label="Primary trade" required>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.trade}
                      onChange={(e) => setForm((s) => ({ ...s, trade: e.target.value }))}
                      placeholder="Mason / Electrician / Driver"
                      required
                    />
                  </Field>
                  <Field label="Experience (years)" required>
                    <input
                      type="number"
                      min={0}
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.experienceYears}
                      onChange={(e) => setForm((s) => ({ ...s, experienceYears: e.target.value }))}
                      required
                    />
                  </Field>
                  <Field label="Preferred wage" required>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.preferredWage}
                      onChange={(e) => setForm((s) => ({ ...s, preferredWage: e.target.value }))}
                      placeholder="₹700/day or ₹18,000/month"
                      required
                    />
                  </Field>
                  <Field label="Availability" required>
                    <select
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.availability}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          availability: e.target.value as WorkerProfile["availability"],
                        }))
                      }
                    >
                      <option value="immediate">{t.immediate}</option>
                      <option value="within_week">{t.withinWeek}</option>
                      <option value="part_time">{t.partTime}</option>
                    </select>
                  </Field>
                  <Field label="Skills" className="sm:col-span-2">
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-emerald-500"
                      value={form.skills}
                      onChange={(e) => setForm((s) => ({ ...s, skills: e.target.value }))}
                      placeholder="Shuttering, POP, wiring, driving LMV..."
                    />
                  </Field>
                  <Field label="About you" className="sm:col-span-2">
                    <textarea
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                      value={form.about}
                      onChange={(e) => setForm((s) => ({ ...s, about: e.target.value }))}
                      placeholder="Short summary of your experience and preferred work."
                    />
                  </Field>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-500"
                    >
                      {t.saveProfile}
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                      onClick={() => {
                        if (profile) {
                          setForm({
                            profileImageDataUrl: profile.profileImageDataUrl ?? "",
                            fullName: profile.fullName,
                            phone: profile.phone,
                            city: profile.city,
                            trade: profile.trade,
                            experienceYears: profile.experienceYears,
                            preferredWage: profile.preferredWage,
                            availability: profile.availability,
                            skills: profile.skills,
                            about: profile.about,
                          });
                        }
                        setEditing(false);
                      }}
                    >
                      {t.cancel}
                    </button>
                  </div>
                </form>
              ) : profile ? (
                <WorkerProfileShowcase
                  profile={profile}
                  availabilityLabel={availabilityLabel}
                  appliedCount={appliedCount}
                  t={t}
                  settingsLabel={t.settings}
                  onOpenSettings={() => setSettingsOpen(true)}
                  onEdit={() => {
                    setEditing(true);
                  }}
                />
              ) : (
                <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
                  You haven&apos;t created your worker profile yet. Click <strong>{t.buildProfile}</strong>{" "}
                  to add your trade, city, experience, and availability.
                </div>
              )}
            </section>
          ) : null}

        </main>
      </div>
      <CameraModal
        open={cameraOpen}
        t={t}
        videoRef={videoRef}
        onClose={closeCamera}
        onCapture={captureCameraPhoto}
        busy={capturing}
      />
      <SettingsModal
        open={settingsOpen}
        t={t}
        prefs={prefs}
        onClose={() => setSettingsOpen(false)}
        onLanguage={(lang) => setLanguage(lang)}
        onPref={setPref}
      />
    </div>
  );

  async function openCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError("Unable to open camera. Allow camera permission and try again.");
    }
  }

  function closeCamera() {
    const stream = streamRef.current;
    if (stream) {
      for (const track of stream.getTracks()) track.stop();
    }
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOpen(false);
    setCapturing(false);
  }

  async function captureCameraPhoto() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setCapturing(true);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setForm((s) => ({ ...s, profileImageDataUrl: dataUrl }));
    setImageError(null);
    setCapturing(false);
    closeCamera();
  }
}

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="text-sm font-medium text-zinc-900">
        {label}
        {required ? <span className="ml-1 text-emerald-700">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function WorkerProfileShowcase({
  profile,
  availabilityLabel,
  appliedCount,
  t,
  settingsLabel,
  onOpenSettings,
  onEdit,
}: {
  profile: WorkerProfile;
  availabilityLabel: string;
  appliedCount: number;
  t: Record<string, string>;
  settingsLabel: string;
  onOpenSettings: () => void;
  onEdit: () => void;
}) {
  const initials =
    profile.fullName
      .split(" ")
      .map((p) => p.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "WK";
  const skills = profile.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="mt-6 space-y-4">
      <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-4 shadow-[0_0_25px_rgba(16,185,129,0.08)] sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="text-3xl font-bold text-zinc-100">{profile.fullName}</h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onOpenSettings}
              className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-full bg-zinc-700/30 px-4 text-sm font-semibold text-zinc-100 ring-1 ring-zinc-500/40 hover:bg-zinc-700/50"
              aria-label="Open settings"
            >
              <span className="mr-2">⚙</span>
              {settingsLabel}
            </button>
            <Link
              href="/applied-jobs"
              className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-full bg-cyan-500/15 px-5 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40 hover:bg-cyan-500/25"
            >
              Applied jobs ({appliedCount})
            </Link>
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-full bg-emerald-500/20 px-5 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-400/40 hover:bg-emerald-500/30"
            >
              {t.editProfile}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-cyan-400/70 bg-slate-950 text-3xl font-bold text-emerald-300">
              {profile.profileImageDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.profileImageDataUrl} alt={`${profile.fullName} profile`} className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div>
              <div className="text-sm text-cyan-200/80">{profile.phone}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-200">
                  {t.availableNow}
                </span>
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-200">
                  {profile.trade}
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-200">
                  {t.worker}
                </span>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-[11px] uppercase tracking-wider text-zinc-400">{t.preferredWage}</div>
            <div className="text-3xl font-bold text-emerald-300">{profile.preferredWage}</div>
            <div className="text-xs text-zinc-400">{t.perMonth}</div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title={t.experience} value={profile.experienceYears} sub="Years in the field" />
        <Card title={t.location} value={profile.city} sub="India" />
        <Card title={t.primaryTrade} value={profile.trade} sub="Worker category" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-5">
          <h4 className="text-xs uppercase tracking-wider text-zinc-400">{t.skillsExpertise}</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {(skills.length ? skills : ["No skills added"]).map((skill) => (
              <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-zinc-200 ring-1 ring-zinc-700">
                {skill}
              </span>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-5">
          <h4 className="text-xs uppercase tracking-wider text-zinc-400">{t.about}</h4>
          <p className="mt-3 text-sm leading-7 text-zinc-200">{profile.about || "No summary added yet."}</p>
        </section>
      </div>

      <section className="grid gap-3 rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-4 text-sm md:grid-cols-3">
        <InfoDark label={t.phone} value={profile.phone} />
        <InfoDark label={t.email} value="Saved in account" />
        <InfoDark label={t.availability} value={availabilityLabel} />
      </section>

      <p className="text-center text-xs text-zinc-400">
        {t.lastUpdated} {new Date(profile.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}

function Card({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-5">
      <h4 className="text-xs uppercase tracking-wider text-zinc-400">{title}</h4>
      <div className="mt-3 text-4xl font-bold text-emerald-300">{value}</div>
      <p className="mt-1 text-sm text-zinc-400">{sub}</p>
    </section>
  );
}

function CameraModal({
  open,
  t,
  videoRef,
  onClose,
  onCapture,
  busy,
}: {
  open: boolean;
  t: Record<string, string>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onCapture: () => void;
  busy: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/55 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl">
        <h3 className="text-base font-semibold text-zinc-900">{t.takePhoto}</h3>
        <video ref={videoRef} className="mt-3 h-64 w-full rounded-xl bg-black object-cover" autoPlay playsInline />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-500"
            onClick={onCapture}
            disabled={busy}
          >
            {busy ? t.capturing : t.capture}
          </button>
          <button
            type="button"
            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            onClick={onClose}
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({
  open,
  t,
  prefs,
  onClose,
  onLanguage,
  onPref,
}: {
  open: boolean;
  t: Record<string, string>;
  prefs: {
    language: AppLanguage;
    jobAlerts: boolean;
    compactCards: boolean;
    highContrast: boolean;
  };
  onClose: () => void;
  onLanguage: (lang: AppLanguage) => void;
  onPref: <K extends "jobAlerts" | "compactCards" | "highContrast">(
    key: K,
    value: boolean
  ) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[75] grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-slate-900 p-5 text-zinc-100 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{t.settingsTitle}</h3>
          <button
            type="button"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-800"
            onClick={onClose}
          >
            {t.close}
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">{t.language}</span>
            <select
              className="mt-2 h-11 w-full rounded-xl border border-zinc-700 bg-slate-950 px-3 text-sm text-zinc-100 outline-none focus:border-emerald-500"
              value={prefs.language}
              onChange={(e) => onLanguage(e.target.value as AppLanguage)}
            >
              <option value="en">{t.english}</option>
              <option value="hi">{t.hindi}</option>
              <option value="bn">{t.bengali}</option>
              <option value="ta">{t.tamil}</option>
              <option value="te">{t.telugu}</option>
              <option value="mr">{t.marathi}</option>
            </select>
            <p className="mt-1 text-xs text-zinc-400">
              {t.languageHint}
            </p>
          </label>

          <Toggle
            label={t.jobAlerts}
            desc={t.jobAlertsDesc}
            checked={prefs.jobAlerts}
            onChange={(v) => onPref("jobAlerts", v)}
          />
          <Toggle
            label={t.compactCards}
            desc={t.compactCardsDesc}
            checked={prefs.compactCards}
            onChange={(v) => onPref("compactCards", v)}
          />
          <Toggle
            label={t.highContrast}
            desc={t.highContrastDesc}
            checked={prefs.highContrast}
            onChange={(v) => onPref("highContrast", v)}
          />
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-zinc-700 bg-slate-950 px-4 py-3">
      <div>
        <div className="text-sm font-medium text-zinc-100">{label}</div>
        <div className="mt-0.5 text-xs text-zinc-400">{desc}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`inline-flex h-7 w-12 items-center rounded-full p-1 transition ${
          checked ? "bg-emerald-600" : "bg-zinc-700"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white transition ${checked ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}

function InfoDark({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-xl bg-slate-800/70 px-3 py-2 ring-1 ring-zinc-700 ${className}`}>
      <div className="text-[11px] uppercase tracking-wider text-zinc-400">{label}</div>
      <div className="font-medium text-zinc-100">{value}</div>
    </div>
  );
}

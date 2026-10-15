import React from "react";
import { GalleryMedia, Project } from "../types";
import { ArrowLeft } from "lucide-react";

// YouTube/Vimeo links can't play in a <video> tag — convert to embed URLs
function getVideoEmbedUrl(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/,
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return null;
}

function GalleryAsset({
  media,
  fallbackUrl,
  alt,
}: {
  media?: GalleryMedia;
  fallbackUrl?: string;
  alt: string;
}) {
  const url = media?.url || fallbackUrl;
  if (!url) return null;
  if (media?.type === "video") {
    const embed = getVideoEmbedUrl(url);
    if (embed) {
      return (
        <iframe
          src={embed}
          title={alt}
          className="w-full aspect-video border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <video
        src={url}
        className="w-full h-auto"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  return <img src={url} alt={alt} className="w-full h-auto" loading="lazy" />;
}

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  return (
    <div className="w-full px-4 sm:px-6 py-6 animate-fade-in">
      {/* Back button */}
      <div className="mb-6">
        <button
          id="project-back-button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-black hover:opacity-70 transition-opacity cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Works</span>
        </button>
      </div>

      {/* Hero Image directly matching Desktop - Project Page.png */}
      <div className="w-full flex justify-center">
        <img
          src={project.heroImage}
          alt={project.title}
          className="h-screen w-auto max-w-full border border-black/10 bg-black/5"
        />
      </div>

      {/* Meta Badge & Project Narrative Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 my-10 items-start">
        <div className="md:col-span-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-black text-white text-[11px] font-black uppercase tracking-wider px-3 py-1">
              {project.client || "[Untitled]"}
            </span>
            <span className="text-[11px] font-black uppercase">●</span>
            <span className="text-[11px] font-black uppercase">
              {project.title}
            </span>
          </div>
        </div>

        <div className="md:col-span-9">
          <p className="text-sm md:text-base font-bold text-black leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Full gallery: masonry via CSS columns, natural aspect ratios preserved */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 my-8">
        {project.detailMedia.map((media, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-6 border border-black/10 bg-black/5"
          >
            <GalleryAsset media={media} alt={`${project.title} — ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

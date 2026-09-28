import React from 'react';
import { Project } from '../types';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      
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
      <div className="w-full aspect-16/10 sm:aspect-16/9 overflow-hidden border border-black/10 bg-black/5">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Meta Badge & Project Narrative Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 my-10 items-start">
        <div className="md:col-span-3">
          <span className="inline-flex items-center gap-2 bg-black text-white text-[11px] font-black uppercase tracking-wider px-3 py-1">
            AWFC ● Champions League
          </span>
        </div>

        <div className="md:col-span-9">
          <p className="text-sm md:text-base font-bold text-black leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* 4 Detail Photos Grid directly matching Desktop - Project Page.png */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-8 items-start">
        
        {/* Left Image: Pile of Gold Bands on Fabric */}
        <div className="md:col-span-4 aspect-square overflow-hidden border border-black/10 bg-black/5">
          <img
            src={project.detailImages[3] || project.coverImage}
            alt="Gold championship bands on linen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle Stack: Presentation Box + Split Inscription Detail */}
        <div className="md:col-span-4 space-y-6">
          {/* Top: Leather Presentation Box held in hand */}
          <div className="aspect-square overflow-hidden border border-black/10 bg-black/5">
            <img
              src={project.detailImages[0] || project.coverImage}
              alt="Bespoke presentation box with foil lettering"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom: Split side engraving view */}
          <div className="grid grid-cols-2 gap-3 aspect-square">
            <div className="overflow-hidden border border-black/10 bg-black/5">
              <img
                src={project.detailImages[1] || project.coverImage}
                alt="Faceted star relief band"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden border border-black/10 bg-black/5">
              <img
                src={project.detailImages[2] || project.coverImage}
                alt="Interior hallmark detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Large Image: Scatter of Finished Rings */}
        <div className="md:col-span-4 aspect-square md:aspect-auto md:h-full overflow-hidden border border-black/10 bg-black/5 flex items-center">
          <img
            src={project.detailImages[2] || project.coverImage}
            alt="Trophy cluster of champion rings"
            className="w-full h-full object-cover min-h-[360px]"
          />
        </div>

      </div>

    </div>
  );
}

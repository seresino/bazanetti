import React, { useLayoutEffect, useRef, useState } from "react";
import { InterlockingRingsGraphic } from "../components/Icons";
import { CheckCircle2 } from "lucide-react";
import { useBrand } from "../context/BrandContext";

export function InfoMasthead() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    const container = heading?.parentElement;
    if (!heading || !container) return;

    // Scale font-size so the word's natural glyph run exactly fills the row
    const fit = () => {
      heading.style.fontSize = "100px";
      heading.style.fontSize = `${(100 * container.clientWidth) / heading.offsetWidth}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="w-full select-none text-center">
      <h1
        ref={headingRef}
        className="inline-block whitespace-nowrap font-black uppercase leading-none text-black"
      >
        BAZANETTI
      </h1>
    </div>
  );
}

export function InfoView() {
  const { brand } = useBrand();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    metal: "",
    ringSize: "",
    projectDescription: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const formFields: {
    id: string;
    label: string;
    key: keyof typeof formData;
    required?: boolean;
    multiline?: boolean;
    type?: string;
  }[] = [
    {
      id: "input-full-name",
      label: "Full Name",
      key: "fullName",
      required: true,
    },
    { id: "input-email", label: "Email", key: "email", type: "email" },
    { id: "input-metal", label: "Metal", key: "metal" },
    { id: "input-ring-size", label: "Ring Size", key: "ringSize" },
    {
      id: "input-project-description",
      label: "Project Description",
      key: "projectDescription",
      required: true,
      multiline: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.projectDescription.trim())
      return;
    setStatus("submitting");
    try {
      const res = await fetch(import.meta.env.VITE_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Form submit failed: ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-6 space-y-16 animate-fade-in">
      {/* Brand Bio & EST.2021 Statement: 2-row, 3-column grid matching Desktop - Info.png */}
      <div className="grid sm:grid-cols-[1fr_2fr_1fr] items-center gap-y-20 py-8">
        {/* Row 1, Col 1: intentionally empty */}
        <div className="hidden sm:block" />

        {/* Row 1, Col 2: brand bio */}
        <div className="text-center">
          <p className="text-xs md:text-sm font-haas font-bold leading-relaxed text-black/90 whitespace-pre-line">
            {brand.bioText ||
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat."}
          </p>
        </div>

        {/* Row 1, Col 3: interlocking rings */}
        <div className="hidden sm:flex items-end justify-center">
          {brand.icons.rings ? (
            <img
              src={brand.icons.rings}
              alt="Interlocking Rings"
              className="w-28 h-20 object-contain hover:scale-105 transition-transform"
            />
          ) : (
            <InterlockingRingsGraphic className="w-28 h-20 text-black hover:scale-105 transition-transform" />
          )}
        </div>

        {/* Row 2, Col 1: jewellery & objects */}
        <div className="hidden sm:block text-center">
          <p className="text-[10px] font-haas font-normal uppercase text-black">
            JEWELLERY
            <br />
            &amp;
            <br />
            OBJECTS
          </p>
        </div>

        {/* Row 2, Col 2: EST.2021 */}
        <div className="text-center">
          <h2 className="text-7xl sm:text-[10vw] md:text-[11vw] leading-none font-black tracking-tight text-black select-none">
            EST.2021
          </h2>
        </div>

        {/* Row 2, Col 3: realised in london */}
        <div className="hidden sm:block text-center">
          <p className="text-[10px] font-haas font-normal uppercase text-black">
            REALISED
            <br />
            IN
            <br />
            LONDON
          </p>
        </div>
      </div>

      {/* Full-viewport-width dotted divider: absolutely positioned against the
          relative flex row in App, so it stretches past the side tickers */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 border-t border-dashed border-black"
      />

      {/* ORDER FORM Section directly matching Desktop - Info.png */}
      <section
        id="bespoke-order-form"
        className="max-w-xl mx-auto pt-10 space-y-10"
      >
        <div className="text-center space-y-4">
          <h3 className="text-4xl md:text-5xl font-black text-black tracking-wider uppercase">
            ORDER FORM
          </h3>
        </div>

        {status === "success" ? (
          <div className="border border-black bg-white p-8 text-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-black mx-auto" />
            <h4 className="text-xl font-black uppercase text-black">
              Inquiry Received
            </h4>
            <p className="text-xs text-black/85 leading-relaxed">
              Thank you,{" "}
              <strong className="text-black">{formData.fullName}</strong>. Your
              order form has been submitted.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({
                  fullName: "",
                  email: "",
                  metal: "",
                  ringSize: "",
                  projectDescription: "",
                });
              }}
              className="mt-4 inline-block text-xs font-black uppercase tracking-widest underline cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2 text-center">
                <label
                  htmlFor={field.id}
                  className="inline-block bg-black text-white font-haas text-sm md:text-sm uppercase px-1"
                >
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    id={field.id}
                    rows={1}
                    required={field.required}
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="block w-4/5 mx-auto text-center py-2 border-b border-dashed border-black text-sm md:text-base font-haas font-normal focus:outline-hidden"
                  />
                ) : (
                  <input
                    id={field.id}
                    type={field.type ?? "text"}
                    required={field.required}
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="block w-4/5 mx-auto text-center py-2 border-b border-dashed border-black text-sm md:text-base font-haas font-normal focus:outline-hidden"
                  />
                )}
              </div>
            ))}

            {status === "error" && (
              <p className="text-center text-xs font-haas uppercase tracking-widest text-red-700">
                Submission failed — please try again
              </p>
            )}

            {/* Submit Button matching Desktop - Info.png */}
            <div className="pt-6 flex justify-center">
              <button
                id="submit-order-form-button"
                type="submit"
                disabled={status === "submitting"}
                className="cursor-pointer hover:opacity-80 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-wait"
                aria-label="Submit order inquiry"
              >
                <img
                  src="/emblems/submit.svg"
                  alt={status === "submitting" ? "Submitting…" : "Submit"}
                  className="h-12 w-auto"
                />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
